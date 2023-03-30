import type { ClientOptions } from "../client/client";
import { ClientCache } from "../client/clientCache";
import type { ClientCookieManager } from "../client/clientCookieManager";
import type { Language } from "../constants/lang";

export type Options<T> = Omit<ClientOptions, "debug" | "language"> & {
  defaultOptions?: fetchOptions & T;
};

export interface fetchOptions {
  cookie?: string;
  language?: Language;
}

export class BaseRoute<CacheType> {
  public readonly cache: ClientCache<CacheType>;

  public readonly cookieManager?: ClientCookieManager;

  constructor(options?: Options<fetchOptions>) {
    this.cache = new ClientCache({ maxSize: options?.cacheOptions?.maxSize });
    this.cookieManager = options?.cookieManager;
  }
}
