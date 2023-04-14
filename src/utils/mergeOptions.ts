import { Language } from "../constants/lang";
import type { ClientCookieManager } from "../client/clientCookieManager";
import type { FetchOptions } from "../routes/base";
import type { FetchClaimHistoryOption, SpiralAbyssFetchOptions, CardListOptions, MonthDiaryOptions } from "../routes";

interface mergeUtilOptions {
  options?: FetchOptions | SpiralAbyssFetchOptions | FetchClaimHistoryOption | CardListOptions | MonthDiaryOptions;
  cookieManager?: ClientCookieManager;
  defaultOptions?: FetchOptions;
}

type mergeOptionsType = "FetchOptions" | "SpiralAbyssFetchOptions" | "FetchClaimHistoryOption" | "CardListOptions" | "MonthDiaryOptions";

export function mergeOptions(input: mergeUtilOptions, type: mergeOptionsType = "FetchOptions") {
  const options = input.options;
  const cookieManager = input.cookieManager;
  const defaultOptions = input.defaultOptions;

  const cookie = options?.cookie ?? cookieManager?.get().cookie ?? defaultOptions?.cookie;

  const language = options?.language ?? defaultOptions?.language ?? Language.EnglishUS;

  if (type === "SpiralAbyssFetchOptions") {
    const options = input.options as SpiralAbyssFetchOptions | undefined;
    return {
      cookie,
      language,
      previous: options?.previous,
    };
  }

  if (type === "FetchClaimHistoryOption") {
    const options = input.options as FetchClaimHistoryOption | undefined;
    return {
      cookie,
      language,
      page: options?.page,
    };
  }

  if (type === "CardListOptions") {
    const options = input.options as CardListOptions | undefined;
    const { need_avatar, need_action, need_stats, offset, limit } = options ?? {};
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

  if (type === "MonthDiaryOptions") {
    const options = input.options as MonthDiaryOptions | undefined;
    return {
      cookie,
      language,
      month: options?.month,
    };
  }

  return {
    cookie,
    language,
  };
}
