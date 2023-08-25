import { ClientCache } from "../client/clientCache";
import type { ClientCookieManager } from "../client/clientCookieManager";
import type { Language } from "../constants/lang";

export interface FetchOptions {
  /**
   * @description The cookies to set.
   * Examples: `ltoken=123456789; ltuid=123456789;` or `ltoken_v2=123456789; ltuid_v2=123456789;`
   * @default undefined
   */
  cookie?: string | Record<string, string>;
  language?: Language;
}

export interface Options<T = unknown> {
  defaultOptions?: FetchOptions & T;
  cacheOptions?: {
    maxSize?: number;
  };
  cookieManager?: ClientCookieManager;
}

export class BaseRoute<CacheType> {
  public readonly cache: ClientCache<CacheType>;

  public readonly cookieManager?: ClientCookieManager;

  constructor(options?: Options) {
    this.cache = new ClientCache({ maxSize: options?.cacheOptions?.maxSize });
    this.cookieManager = options?.cookieManager;
  }
}
