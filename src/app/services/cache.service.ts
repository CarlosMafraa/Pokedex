import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly CACHE_PREFIX = 'pokedex_cache_';
  private readonly CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

  public set<T>(key: string, data: T): void {
    try {
      const cacheData = {
        data: data,
        timestamp: Date.now()
      };
      localStorage.setItem(this.CACHE_PREFIX + key, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Erro ao salvar no cache:', error);
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

      return cacheData.data as T;
    } catch (error) {
      console.error('Erro ao recuperar do cache:', error);
      return null;
    }
  }

  public remove(key: string): void {
    try {
      localStorage.removeItem(this.CACHE_PREFIX + key);
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
    } catch (error) {
      console.error('Erro ao limpar cache:', error);
    }
  }

  public has(key: string): boolean {
    return this.get(key) !== null;
  }
}
