import { ClientCache } from "../client/clientCache";

interface Options {
  cache?: boolean;
}

export class BaseRoute {
  public readonly cache: ClientCache | null;

  constructor(options: Options) {
    if (options.cache) {
      this.cache = new ClientCache();
    } else {
      this.cache = null;
    }
  }
}
