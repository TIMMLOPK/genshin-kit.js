import { ClientCache } from "../client/clientCache";
import { Language } from "../constants/lang";

export interface Options {
  cache?: boolean;
  debug?: boolean;
  cacheOptions?: {
    maxAge?: number;
  };
  defaultOptions?: fetchOptions;
}

export interface fetchOptions {
  cookie: string;
  language: Language;
}

export class BaseRoute {
  public readonly cache: ClientCache<unknown> | null;

  public debug: boolean;

  public defaultOptions: fetchOptions;

  constructor(options?: Options) {
    this.debug = options?.debug || false;
    this.cache = options?.cache
      ? new ClientCache({ maxAge: options.cacheOptions?.maxAge })
      : null;
    this.defaultOptions = options?.defaultOptions || {
      cookie: "",
      language: Language.EnglishUS,
    };
  }
}
