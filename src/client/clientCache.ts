interface Cache<V> {
  get(key: string): V | undefined;
  set(key: string, value: V): void;
  has(key: string): boolean;
  delete(key: string): void;
}

interface CacheOptions {
  maxAge?: number;
}

/**
 * @description Cache the API response
 */
export class ClientCache<V> implements Cache<V> {
  private cache: { [key: string]: { value: V; timestamp: number } } = {};

  private sweepInterval?: NodeJS.Timeout;

  private maxAge: number;

  constructor(options?: CacheOptions) {
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

  public set(key: string, value: V): void {
    this.cache[key] = {
      value,
      timestamp: Date.now(),
    };
  }

  public has(key: string): boolean {
    if (typeof this.cache[key] === "undefined") return false;
    return true;
  }

  public delete(key: string): void {
    delete this.cache[key];
  }
}
