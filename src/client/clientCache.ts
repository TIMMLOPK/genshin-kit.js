export class ClientCache {
  /**
   * @description Cache the API response
   */
  private cache: { [key: string]: any } = {};

  public get(key: string): any {
    const C = this.cache[key];
    this.delete(key);
    return C;
  }

  public set(key: string, value: any): void {
    if (this.has(key)) {
      this.delete(key);
    }
    this.cache[key] = value;
  }

  public has(key: string): boolean {
    return this.cache[key] !== undefined;
  }

  public delete(key: string): void {
    delete this.cache[key];
  }
}
