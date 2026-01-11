import { Injectable } from '@angular/core';

interface CacheData<T> {
  key: string;
  data: T;
  timestamp: number;
  lastAccessed: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly DB_NAME = 'pokedex_cache_db';
  private readonly STORE_NAME = 'cache_store';
  private readonly DB_VERSION = 1;
  private readonly CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
  private readonly MAX_CACHE_ITEMS = 200; // Aumentado para 200 pois IndexedDB suporta muito mais
  private db: IDBDatabase | null = null;

  constructor() {
    this.initDB();
  }

  private async initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => {
        console.error('Erro ao abrir IndexedDB:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          const objectStore = db.createObjectStore(this.STORE_NAME, { keyPath: 'key' });
          objectStore.createIndex('timestamp', 'timestamp', { unique: false });
          objectStore.createIndex('lastAccessed', 'lastAccessed', { unique: false });
        }
      };
    });
  }

  private async ensureDB(): Promise<IDBDatabase> {
    if (!this.db) {
      await this.initDB();
    }
    if (!this.db) {
      throw new Error('Database não inicializado');
    }
    return this.db;
  }

  public async set<T>(key: string, data: T): Promise<void> {
    try {
      const db = await this.ensureDB();
      const transaction = db.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);

      const cacheData: CacheData<T> = {
        key,
        data,
        timestamp: Date.now(),
        lastAccessed: Date.now()
      };

      await new Promise<void>((resolve, reject) => {
        const request = store.put(cacheData);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      // Limpa itens antigos se exceder o limite
      await this.cleanupIfNeeded();
    } catch (error) {
      console.error('Erro ao salvar no cache:', error);
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    try {
      const db = await this.ensureDB();
      const transaction = db.transaction([this.STORE_NAME], 'readonly');
      const store = transaction.objectStore(this.STORE_NAME);

      const cacheData = await new Promise<CacheData<T> | undefined>((resolve, reject) => {
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });

      if (!cacheData) {
        return null;
      }

      const now = Date.now();
      if (now - cacheData.timestamp > this.CACHE_EXPIRY) {
        await this.remove(key);
        return null;
      }

      // Atualiza o último acesso
      await this.updateLastAccessed(key);

      return cacheData.data;
    } catch (error) {
      console.error('Erro ao recuperar do cache:', error);
      return null;
    }
  }

  private async updateLastAccessed(key: string): Promise<void> {
    try {
      const db = await this.ensureDB();
      const transaction = db.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);

      const cacheData = await new Promise<CacheData<any> | undefined>((resolve, reject) => {
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });

      if (cacheData) {
        cacheData.lastAccessed = Date.now();
        store.put(cacheData);
      }
    } catch (error) {
      console.error('Erro ao atualizar último acesso:', error);
    }
  }

  private async cleanupIfNeeded(): Promise<void> {
    try {
      const db = await this.ensureDB();
      const transaction = db.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);

      const count = await new Promise<number>((resolve, reject) => {
        const request = store.count();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });

      if (count > this.MAX_CACHE_ITEMS) {
        // Remove os itens menos acessados
        const itemsToRemove = count - this.MAX_CACHE_ITEMS;
        const index = store.index('lastAccessed');

        const items: string[] = [];
        await new Promise<void>((resolve, reject) => {
          const request = index.openCursor();
          request.onsuccess = (event) => {
            const cursor = (event.target as IDBRequest).result;
            if (cursor && items.length < itemsToRemove) {
              items.push(cursor.value.key);
              cursor.continue();
            } else {
              resolve();
            }
          };
          request.onerror = () => reject(request.error);
        });

        for (const key of items) {
          store.delete(key);
        }
      }
    } catch (error) {
      console.error('Erro ao limpar cache:', error);
    }
  }

  public async remove(key: string): Promise<void> {
    try {
      const db = await this.ensureDB();
      const transaction = db.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);

      await new Promise<void>((resolve, reject) => {
        const request = store.delete(key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Erro ao remover do cache:', error);
    }
  }

  public async clearAll(): Promise<void> {
    try {
      const db = await this.ensureDB();
      const transaction = db.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);

      await new Promise<void>((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Erro ao limpar cache:', error);
    }
  }

  public async has(key: string): Promise<boolean> {
    const data = await this.get(key);
    return data !== null;
  }
}
