import type { ClientOptions } from "../client/client";
import { ClientCache } from "../client/clientCache";
import type { ClientCookieManager } from "../client/clientCookieManager";
import type { Language } from "../constants/lang";

export interface FetchOptions {
  cookie?: string;
  language?: Language;
}

export type Options<T> = Omit<ClientOptions, "debug" | "language"> & {
  defaultOptions?: FetchOptions & T;
};

export class BaseRoute<CacheType> {
  public readonly cache: ClientCache<CacheType>;

  public readonly cookieManager?: ClientCookieManager;

  constructor(options?: Options<FetchOptions>) {
    this.cache = new ClientCache({ maxSize: options?.cacheOptions?.maxSize });
    this.cookieManager = options?.cookieManager;
  }
}
