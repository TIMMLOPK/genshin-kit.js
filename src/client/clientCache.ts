interface cacheStore<V> {
  [key: string]: {
    value: V;
    timestamp: number;
  };
}

/**
 * @description Cache of API responses.
 */
export class ClientCache<V> extends Map<string, V> {
  private cache: cacheStore<V>;

  constructor() {
    super();
    this.cache = {};
  }

  public sweep(fn: (value: { value: V; timestamp: number }, key: string) => unknown): void {
    if (this.size === 0) return;
    Object.entries(this.cache).forEach(([key, value]) => {
      if (fn(value, key)) {
        this.delete(key);
      }
    });
  }

  public override set(key: string, value: V): this {
    this.cache[key] = {
      value,
      timestamp: Date.now(),
    };

    return this;
  }

  public override get(key: string): V {
    if (this.has(key)) {
      const C = this.cache[key];
      return C?.value as V;
    }
    return {} as V;
  }
}
