/**
 * @description Cache of API responses.
 */
export class ClientCache<V> extends Map<string, V> {
  private lifeMap: Map<string, number> = new Map();
  private _maxSize?: number;

  constructor(cacheOptions: { maxSize?: number }) {
    super();
    this._maxSize = cacheOptions.maxSize;
  }

  public sweep(fn: (value: { value: V; timestamp: number }, key: string) => unknown): void {
    if (this.size === 0) return;
    Object.entries(this).forEach(([key, value]) => {
      const input = { value, timestamp: this.lifeMap.get(key) as number, size: this.size };
      if (fn(input, key)) {
        this.delete(key);
        this.lifeMap.delete(key);
      }
    });
  }

  public override set(key: string, value: V): this {
    if (this._maxSize !== undefined && this.size >= this._maxSize) {
      return this;
    }

    this.lifeMap.set(key, Date.now());
    super.set(key, value);

    return this;
  }

  public override get(key: string): V {
    if (this.has(key)) {
      return super.get(key) as V;
    }

    return {} as V;
  }
}
