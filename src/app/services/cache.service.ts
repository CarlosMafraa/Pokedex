import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly CACHE_PREFIX = 'pokedex_cache_';
  private readonly CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
  private readonly MAX_CACHE_ITEMS = 50; // Limite máximo de itens no cache
  private readonly CACHE_METADATA_KEY = 'pokedex_cache_metadata';

  public set<T>(key: string, data: T): void {
    try {
      const cacheData = {
        data: data,
        timestamp: Date.now(),
        lastAccessed: Date.now()
      };

      const serializedData = JSON.stringify(cacheData);
      const fullKey = this.CACHE_PREFIX + key;

      try {
        localStorage.setItem(fullKey, serializedData);
        this.updateMetadata(key);
      } catch (quotaError) {
        // Se exceder a quota, tenta liberar espaço
        console.warn('Quota excedida, limpando cache antigo...');
        this.clearOldestItems();

        // Tenta novamente após limpar
        try {
          localStorage.setItem(fullKey, serializedData);
          this.updateMetadata(key);
        } catch (retryError) {
          // Se ainda falhar, limpa todo o cache e tenta uma última vez
          console.warn('Limpando todo o cache...');
          this.clearAll();
          localStorage.setItem(fullKey, serializedData);
          this.updateMetadata(key);
        }
      }
    } catch (error) {
      console.error('Erro ao salvar no cache:', error);
    }
  }

  private updateMetadata(key: string): void {
    try {
      const metadata = this.getMetadata();
      metadata[key] = Date.now();

      // Limita o número de itens
      const keys = Object.keys(metadata);
      if (keys.length > this.MAX_CACHE_ITEMS) {
        // Remove os itens mais antigos
        const sortedKeys = keys.sort((a, b) => metadata[a] - metadata[b]);
        const keysToRemove = sortedKeys.slice(0, keys.length - this.MAX_CACHE_ITEMS);

        keysToRemove.forEach(k => {
          this.remove(k);
          delete metadata[k];
        });
      }

      localStorage.setItem(this.CACHE_METADATA_KEY, JSON.stringify(metadata));
    } catch (error) {
      console.error('Erro ao atualizar metadata:', error);
    }
  }

  private getMetadata(): Record<string, number> {
    try {
      const metadata = localStorage.getItem(this.CACHE_METADATA_KEY);
      return metadata ? JSON.parse(metadata) : {};
    } catch {
      return {};
    }
  }

  private clearOldestItems(count: number = 10): void {
    try {
      const metadata = this.getMetadata();
      const sortedKeys = Object.keys(metadata).sort((a, b) => metadata[a] - metadata[b]);
      const keysToRemove = sortedKeys.slice(0, count);

      keysToRemove.forEach(key => {
        this.remove(key);
        delete metadata[key];
      });

      localStorage.setItem(this.CACHE_METADATA_KEY, JSON.stringify(metadata));
    } catch (error) {
      console.error('Erro ao limpar itens antigos:', error);
    }
  }

  public get<T>(key: string): T | null {
    try {
      const cached = localStorage.getItem(this.CACHE_PREFIX + key);
      if (!cached) {
        return null;
      }

      const cacheData = JSON.parse(cached);
      const now = Date.now();

      if (now - cacheData.timestamp > this.CACHE_EXPIRY) {
        this.remove(key);
        return null;
      }

      // Atualiza o último acesso para o algoritmo LRU
      this.updateMetadata(key);

      return cacheData.data as T;
    } catch (error) {
      console.error('Erro ao recuperar do cache:', error);
      return null;
    }
  }

  public remove(key: string): void {
    try {
      localStorage.removeItem(this.CACHE_PREFIX + key);

      // Remove também dos metadados
      const metadata = this.getMetadata();
      delete metadata[key];
      localStorage.setItem(this.CACHE_METADATA_KEY, JSON.stringify(metadata));
    } catch (error) {
      console.error('Erro ao remover do cache:', error);
    }
  }

  public clearAll(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });

      // Limpa também os metadados
      localStorage.removeItem(this.CACHE_METADATA_KEY);
    } catch (error) {
      console.error('Erro ao limpar cache:', error);
    }
  }

  public has(key: string): boolean {
    return this.get(key) !== null;
  }
}
