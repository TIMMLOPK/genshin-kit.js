interface Cache<V> {
  get(key: string): V | undefined;
  set(key: string, value: V): this;
  has(key: string): boolean;
  delete(key: string): boolean;
}

interface CacheOptions {
  maxAge?: number;
}

interface cacheStore<V> {
  [key: string]: {
    value: V;
    timestamp: number;
  };
}

/**
 * @description Cache of API responses.
 */
export class ClientCache<V> implements Cache<V> {
  private cache: cacheStore<V>;

  private sweepInterval?: NodeJS.Timer;

  private maxAge: number;

  constructor(options?: CacheOptions) {
    this.cache = {};
    this.maxAge = options?.maxAge || 60;

    this.sweepInterval = setInterval(() => {
      this.sweep();
    }, 1000 * this.maxAge).unref();
  }

  public get size(): number {
    return Object.keys(this.cache).length;
  }

  private sweep() {
    if (this.size === 0 && this.sweepInterval) {
      clearInterval(this.sweepInterval);
      this.sweepInterval = undefined;
    }

    for (const key in this.cache) {
      const cache = this.cache[key];
      if (cache && Date.now() - cache.timestamp > this.maxAge * 1000) {
        delete this.cache[key];
      }
    }
  }

  public get(key: string): V {
    if (this.has(key)) {
      const C = this.cache[key];
      return C?.value as V;
    }
    return {} as V;
  }

  public set(key: string, value: V): this {
    this.cache[key] = {
      value,
      timestamp: Date.now(),
    };

    return this;
  }

  public has(key: string): boolean {
    if (this.cache[key]) return true;
    return false;
  }

  public delete(key: string): boolean {
    return delete this.cache[key];
  }
}
