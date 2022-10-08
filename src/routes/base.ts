import { ClientCache } from "../client/clientCache";

export class BaseRoute {
  protected clientCache: ClientCache | null;
  constructor(clientCache?: ClientCache | null) {
    this.clientCache = clientCache ?? new ClientCache();
  }

  public getCache(uid: string, type: string): any {
    if (this.clientCache) {
      return this.clientCache.get(`${uid}-${type}`);
    }
    return null;
  }
}
