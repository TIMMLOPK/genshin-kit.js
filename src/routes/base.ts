import { ClientCache } from "../client/clientCache";
import type { ClientCookieManager } from "../client/clientCookieManager";
import type { Language } from "../constants/lang";

export interface Options<T> {
  cache?: boolean;
  cacheOptions?: {
    maxAge?: number;
  };
  defaultOptions?: fetchOptions & T;
  cookieManager?: ClientCookieManager;
}

export interface fetchOptions {
  cookie: string;
  language: Language;
}

export class BaseRoute {
  public readonly cache: ClientCache<unknown> | null;

  public readonly cookieManager?: ClientCookieManager;

  constructor(options?: Options<fetchOptions>) {
    this.cache = options?.cache ? new ClientCache({ maxAge: options.cacheOptions?.maxAge }) : null;
    this.cookieManager = options?.cookieManager;
  }
}
