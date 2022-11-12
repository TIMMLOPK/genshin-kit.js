import { ClientCache } from "../client/clientCache";
import type { ClientCookieManager } from "../client/clientCookieManager";
import { Language } from "../constants/lang";
import type { SpiralAbyssFetchOptions } from "./genshinAbyss";

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

  public readonly defaultOptions?: fetchOptions;

  private cookieManager?: ClientCookieManager;

  constructor(options?: Options<fetchOptions>) {
    this.cache = options?.cache
      ? new ClientCache({ maxAge: options.cacheOptions?.maxAge })
      : null;
    this.defaultOptions = options?.defaultOptions;
    this.cookieManager = options?.cookieManager;
  }

  public getFetchOptions(options?: fetchOptions | SpiralAbyssFetchOptions) {
    const cookie =
      options?.cookie ||
      this.cookieManager?.get().cookie ||
      this.defaultOptions?.cookie;

    const language =
      options?.language || this.defaultOptions?.language || Language.EnglishUS;

    if (options && "previous" in options) {
      return {
        cookie,
        language,
        previous: options.previous,
      };
    }

    return {
      cookie,
      language,
    };
  }
}
