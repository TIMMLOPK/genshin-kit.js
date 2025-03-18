import { Language } from "../constants/lang";
import type { ClientCookieManager } from "../client/clientCookieManager";
import type { FetchOptions } from "../routes/base";
import type {
  FetchClaimHistoryOption,
  SpiralAbyssFetchOptions,
  CardListOptions,
  MonthDiaryOptions,
  RoleCombatOptions,
  CharctersListFetchOptions,
  UserFetchOptions,
} from "../routes";
import { CookieObjToString } from "./cookie";

interface mergeUtilOptions {
  options?:
    | FetchOptions
    | UserFetchOptions
    | CharctersListFetchOptions
    | SpiralAbyssFetchOptions
    | FetchClaimHistoryOption
    | CardListOptions
    | MonthDiaryOptions
    | RoleCombatOptions<true | false>;
  cookieManager?: ClientCookieManager;
  defaultOptions?: FetchOptions;
}

export enum OptionType {
  FetchOptions = "FetchOptions",
  SpiralAbyssFetchOptions = "SpiralAbyssFetchOptions",
  FetchClaimHistoryOption = "FetchClaimHistoryOption",
  CardListOptions = "CardListOptions",
  MonthDiaryOptions = "MonthDiaryOptions",
  RoleCombatOptions = "RoleCombatOptions",
  CharctersListFetchOptions = "CharctersListFetchOptions",
  UserInfoFetchOptions = "UserInfoFetchOptions",
}

export function mergeOptions(input: mergeUtilOptions, type: OptionType = OptionType.FetchOptions) {
  const options = input.options;
  const cookieManager = input.cookieManager;
  const defaultOptions = input.defaultOptions;

  const cookie =
    CookieObjToString(options?.cookie) ?? cookieManager?.get().cookie ?? CookieObjToString(defaultOptions?.cookie);

  const language = options?.language ?? defaultOptions?.language ?? Language.EnglishUS;

  switch (type) {
    case OptionType.SpiralAbyssFetchOptions: {
      const options = input.options as SpiralAbyssFetchOptions | undefined;

      return {
        cookie,
        language,
        previous: options?.previous,
      };
    }
    case OptionType.UserInfoFetchOptions: {
      const options = input.options as UserFetchOptions | undefined;

      return {
        cookie,
        language,
        avatar_list_type: options?.avatar_list_type,
      };
    }
    case OptionType.CharctersListFetchOptions: {
      const options = input.options as CharctersListFetchOptions | undefined;

      return {
        cookie,
        language,
        sort_type: options?.sort_type,
        elements: options?.elements,
        weapon_type: options?.weapon_type,
      };
    }
    case OptionType.FetchClaimHistoryOption: {
      const options = input.options as FetchClaimHistoryOption | undefined;

      return {
        cookie,
        language,
        page: options?.page,
      };
    }
    case OptionType.CardListOptions: {
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
    case OptionType.MonthDiaryOptions: {
      const options = input.options as MonthDiaryOptions | undefined;
      const { month } = options ?? {};

      return {
        cookie,
        language,
        month,
      };
    }
    case OptionType.RoleCombatOptions: {
      const options = input.options as RoleCombatOptions<true | false> | undefined;

      return {
        cookie,
        language,
        need_detail: options?.need_detail,
      };
    }
    default: {
      return {
        cookie,
        language,
      };
    }
  }
}
