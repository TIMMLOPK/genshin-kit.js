import { ClientCache } from "../client/clientCache";

interface Options {
  cache?: boolean;
  debug?: boolean;
  cacheOptions?: {
    maxAge?: number;
  };
}

export class BaseRoute {
  public readonly cache: ClientCache<unknown> | null;
  
  public debug: boolean;

  constructor(options?: Options) {
    this.debug = options?.debug || false;
    this.cache = options?.cache
      ? new ClientCache({ maxAge: options.cacheOptions?.maxAge })
      : null;
  }
}
