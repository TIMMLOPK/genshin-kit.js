import { ClientCache } from "../client/clientCache";
import type { ClientCookieManager } from "../client/clientCookieManager";
import type { Language } from "../constants/lang";

export interface Options {
  cache?: boolean;
  debug?: boolean;
  cacheOptions?: {
    maxAge?: number;
  };
  defaultOptions?: fetchOptions;
  cookieManager?: ClientCookieManager;
}

export interface fetchOptions {
  cookie: string;
  language: Language;
}

export class BaseRoute {
  public readonly cache: ClientCache<unknown> | null;

  public debug: boolean;

  public defaultOptions?: fetchOptions;

  public cookieManager?: ClientCookieManager;

  constructor(options?: Options) {
    this.debug = options?.debug || false;
    this.cache = options?.cache
      ? new ClientCache({ maxAge: options.cacheOptions?.maxAge })
      : null;
    this.defaultOptions = options?.defaultOptions;
  }

  public getCookie(): string | undefined {
    if (!this.defaultOptions?.cookie && !this.cookieManager) {
      throw new Error("Please login first.");
    }

    if (this.cookieManager) {
      return this.cookieManager.get().cookie;
    }

    return this.defaultOptions?.cookie;
  }
}
