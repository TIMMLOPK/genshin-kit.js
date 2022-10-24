import { ClientCache } from "../client/clientCache";

interface Options {
  cache?: boolean;
}

export class BaseRoute {
  public readonly cache: ClientCache | null;

  constructor(options: Options) {
    this.cache = options.cache ? new ClientCache() : null;
  }
}
