import { ClientCache } from "../client/clientCache";
import type { ClientCookieManager } from "../client/clientCookieManager";
import type { Language } from "../constants/lang";

export interface Options<T> {
  cacheOptions?: {
    maxAge?: number;
    maxSize?: number;
  };
  defaultOptions?: fetchOptions & T;
  cookieManager?: ClientCookieManager;
}

export interface fetchOptions {
  cookie?: string;
  language?: Language;
}

export class BaseRoute<cacheType> {
  public readonly cache: ClientCache<cacheType>;

  public readonly cookieManager?: ClientCookieManager;

  constructor(options?: Options<fetchOptions>) {
    this.cache = new ClientCache({ maxSize: options?.cacheOptions?.maxSize });
    this.cookieManager = options?.cookieManager;
  }
}
