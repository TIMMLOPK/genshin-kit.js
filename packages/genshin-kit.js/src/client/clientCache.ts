/**
 * @description Cache of API responses.
 */
export type SweepFilterOptions<V> = (value: { value: V; timestamp: number; size: number }, key: string) => boolean;

export class ClientCache<V> extends Map<string, V> {
  private lifeMap: Map<string, number>;
  private maxSize?: number;

  constructor(cacheOptions: { maxSize?: number }) {
    super();
    this.maxSize = cacheOptions.maxSize;
    this.lifeMap = new Map();
  }

  public sweep(fn: SweepFilterOptions<V>): void {
    if (this.size === 0) return;
    for (const [key, value] of this) {
      const input = { value, timestamp: this.lifeMap.get(key) as number, size: this.size };
      if (fn(input, key)) {
        this.delete(key);
        this.lifeMap.delete(key);
      }
    }
  }

  public override set(key: string, value: V): this {
    if (this.maxSize !== undefined && this.size >= this.maxSize) {
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

    return undefined as unknown as V;
  }
}
