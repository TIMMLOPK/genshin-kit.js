import { Language } from "../constants/lang";
import type { ClientCookieManager } from "../client/clientCookieManager";
import type { fetchOptions } from "../routes/base";
import type { fetchClaimHistoryOption } from "../routes/dailyReward";
import type { SpiralAbyssFetchOptions } from "../routes/genshinAbyss";

export function mergeOptions(
  options?: fetchOptions | SpiralAbyssFetchOptions | fetchClaimHistoryOption,
  cookieManager?: ClientCookieManager,
  defaultOptions?: fetchOptions,
) {
  const cookie = options?.cookie || cookieManager?.get().cookie || defaultOptions?.cookie;

  const language = options?.language || defaultOptions?.language || Language.EnglishUS;

  if (options && "previous" in options) {
    return {
      cookie,
      language,
      previous: options.previous,
    };
  }

  if (options && "page" in options) {
    return {
      cookie,
      language,
      page: options.page,
    };
  }

  return {
    cookie,
    language,
  };
}
