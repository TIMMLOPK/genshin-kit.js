import { Language } from "../constants/lang";
import type { ClientCookieManager } from "../client/clientCookieManager";
import type { FetchOptions } from "../routes/base";
import type { FetchClaimHistoryOption, SpiralAbyssFetchOptions, CardListOptions, MonthDiaryOptions } from "../routes";

interface mergeUtilOptions {
  options?: FetchOptions | SpiralAbyssFetchOptions | FetchClaimHistoryOption | CardListOptions | MonthDiaryOptions;
  cookieManager?: ClientCookieManager;
  defaultOptions?: FetchOptions;
}

type mergeOptionsType =
  | "fetchOptions"
  | "SpiralAbyssFetchOptions"
  | "fetchClaimHistoryOption"
  | "CardListOptions"
  | "MonthDiaryOptions";

function isSpiralAbyssFetchOptions(
  _options: mergeUtilOptions["options"],
  type: mergeOptionsType,
): _options is SpiralAbyssFetchOptions {
  return type === "SpiralAbyssFetchOptions";
}

function isClaimHistoryOptions(
  _options: mergeUtilOptions["options"],
  type: mergeOptionsType,
): _options is FetchClaimHistoryOption {
  return type === "fetchClaimHistoryOption";
}

function isCardListOptions(_options: mergeUtilOptions["options"], type: mergeOptionsType): _options is CardListOptions {
  return type === "CardListOptions";
}

function isMonthDiaryOptions(
  _options: mergeUtilOptions["options"],
  type: mergeOptionsType,
): _options is MonthDiaryOptions {
  return type === "MonthDiaryOptions";
}

export function mergeOptions(input: mergeUtilOptions, type: mergeOptionsType = "fetchOptions") {
  const options = input.options;
  const cookieManager = input.cookieManager;
  const defaultOptions = input.defaultOptions;

  const cookie = options?.cookie || cookieManager?.get().cookie || defaultOptions?.cookie;

  const language = options?.language || defaultOptions?.language || Language.EnglishUS;

  if (isSpiralAbyssFetchOptions(options, type)) {
    return {
      cookie,
      language,
      previous: options.previous,
    };
  }

  if (isClaimHistoryOptions(options, type)) {
    return {
      cookie,
      language,
      month: options.page,
    };
  }

  if (isCardListOptions(options, type)) {
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

  if (isMonthDiaryOptions(options, type)) {
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
