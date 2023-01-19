import { Language } from "../constants/lang";
import type { ClientCookieManager } from "../client/clientCookieManager";
import type { fetchOptions } from "../routes/base";
import type { fetchClaimHistoryOption } from "../routes/dailyReward";
import type { SpiralAbyssFetchOptions } from "../routes/genshinAbyss";
import type { CardListOptions } from "../routes/genshinTCG";
import type { getMonthDiaryOptions } from "../routes/travelerDiary";

export function mergeOptions(
  options?: fetchOptions | SpiralAbyssFetchOptions | fetchClaimHistoryOption | CardListOptions | getMonthDiaryOptions,
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

  if (
    options &&
    ("need_avatar" in options ||
      "need_action" in options ||
      "need_stats" in options ||
      "offset" in options ||
      "limit" in options)
  ) {
    const { need_avatar, need_action, need_stats, offset, limit } = options;
    return {
      cookie,
      language,
      need_avatar,
      need_action,
      need_stats,
      offset,
      limit,
    };
  }

  if (options && "month" in options) {
    return {
      cookie,
      language,
      month: options.month,
    };
  }

  return {
    cookie,
    language,
  };
}
