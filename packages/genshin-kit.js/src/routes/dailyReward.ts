import { API_URL } from "../constants/constants";
import { BaseRoute, FetchOptions, Options } from "./base";
import {
  mergeOptions,
  RequestManager,
  basicValidator,
  alias,
  claimHistoryValidator,
  OptionType,
  CookieObjToString,
} from "../utils";
import type {
  DailyRewardSignInHistoryData,
  DayReward,
  DailyRewardSignInData,
  DailyRewardInfoData,
  DailyRewardExtraRewardData,
  DailyRewardResignData,
  MonthRewardData,
} from "../interface";
import type { ClientCookieManager } from "../client/clientCookieManager";

export type FetchClaimHistoryOption = FetchOptions & { page?: number };
export type CheckInFetchOptions = FetchOptions & {
  geetestCallback?: (challenge: string, gt: string) => Promise<{ validate: string; seccode: string }>;
};

class RewardInfo extends BaseRoute<DailyRewardInfoData> {
  private readonly defaultOptions?: FetchOptions;

  constructor(options?: Options) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @description Get the daily rewards info
   */
  public async fetch(options?: FetchOptions) {
    if (this.cache.has(CookieObjToString(options?.cookie) || ""))
      return this.cache.get(CookieObjToString(options?.cookie) || "");

    const optionsToUse = mergeOptions({
      options,
      cookieManager: this.cookieManager,
      defaultOptions: this.defaultOptions,
    });

    if (!basicValidator("", optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { cookie, language } = optionsToUse;

    const instance = new RequestManager({
      route: API_URL.Genshin_HoYolab_Reward,
    });

    const res = await instance.get<DailyRewardInfoData>(
      "info",
      {
        Cookie: cookie,
      },
      {
        lang: language,
        act_id: "e202102251931481",
      },
    );

    const { data } = res;

    this.cache.set(cookie, data);

    return data;
  }

  /**
   * @description Get the daily rewards details for a specific day
   * @param {number} day The day to fetch
   */
  public async fetchDay(day: number, options?: FetchOptions): Promise<DayReward> {
    const optionsToUse = mergeOptions({
      options,
      cookieManager: this.cookieManager,
      defaultOptions: this.defaultOptions,
    });

    if (!basicValidator(day, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const data = await this.fetchMonth(options);

    const dayData = data.awards[day - 1];

    if (!dayData) {
      throw new Error("Day not found");
    }

    return dayData;
  }

  /**
   * @description Get the daily rewards details
   */
  public async fetchMonth(options?: FetchOptions): Promise<MonthRewardData> {
    const optionsToUse = mergeOptions({
      options,
      cookieManager: this.cookieManager,
      defaultOptions: this.defaultOptions,
    });

    if (!basicValidator("", optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { cookie, language } = optionsToUse;

    const instance = new RequestManager({
      route: API_URL.Genshin_HoYolab_Reward,
    });

    const res = await instance.get(
      "home",
      {
        Cookie: cookie,
      },
      {
        lang: language,
        act_id: "e202102251931481",
      },
    );

    const { data } = res;

    alias(data.awards, { cnt: "count" });

    return data;
  }
}

class ExtraRewardInfo extends BaseRoute<DailyRewardExtraRewardData> {
  private readonly defaultOptions?: FetchOptions;

  constructor(options?: Options) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @description Get the extra rewards info
   */
  async fetch(options?: FetchOptions) {
    if (this.cache.has(CookieObjToString(options?.cookie) || ""))
      return this.cache.get(CookieObjToString(options?.cookie) || "");

    const optionsToUse = mergeOptions({
      options,
      cookieManager: this.cookieManager,
      defaultOptions: this.defaultOptions,
    });

    if (!basicValidator("", optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { cookie } = optionsToUse;

    const instance = new RequestManager({
      route: API_URL.Genshin_HoYolab_Reward,
    });

    const res = await instance.get<DailyRewardExtraRewardData>(
      "extra_award",
      {
        Cookie: cookie,
      },
      {
        act_id: "e202102251931481",
        region: "",
        uid: "",
      },
    );

    const { data } = res;

    alias(data, { total_cnt: "total_count", mc: "month_card" });

    this.cache.set(cookie, data);

    return data;
  }
}

class ResignInfo extends BaseRoute<DailyRewardResignData> {
  private readonly defaultOptions?: FetchOptions;

  constructor(options?: Options) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @description get resign info
   */
  async fetch(options?: FetchOptions) {
    if (this.cache.has(CookieObjToString(options?.cookie) || ""))
      return this.cache.get(CookieObjToString(options?.cookie) || "");

    const optionsToUse = mergeOptions({
      options,
      cookieManager: this.cookieManager,
      defaultOptions: this.defaultOptions,
    });

    if (!basicValidator("", optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { cookie, language } = optionsToUse;
    const instance = new RequestManager({
      route: API_URL.Genshin_HoYolab_Reward,
    });

    const res = await instance.get<DailyRewardResignData>(
      "resign_info",
      {
        Cookie: cookie,
      },
      {
        lang: language,
        act_id: "e202102251931481",
      },
    );

    const { data } = res;

    alias(data, {
      resign_cnt_daily: "resign_count_daily",
      resign_cnt_monthly: "resign_count_monthly",
      sign_cnt_missed: "sign_count_missed",
      quality_cnt: "quality_count",
      sign_cnt: "sign_count",
      month_quality_cnt: "month_quality_count",
    });

    this.cache.set(cookie, data);

    return data;
  }
}

class CheckInHistory extends BaseRoute<DailyRewardSignInHistoryData> {
  private readonly defaultOptions?: FetchOptions;

  constructor(options?: Options) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @description get check in history
   */
  async fetch(options?: FetchClaimHistoryOption): Promise<DailyRewardSignInHistoryData> {
    if (this.cache.has(CookieObjToString(options?.cookie) || ""))
      return this.cache.get(CookieObjToString(options?.cookie) || "");

    const optionsToUse = mergeOptions(
      {
        options,
        cookieManager: this.cookieManager,
        defaultOptions: this.defaultOptions,
      },
      OptionType.FetchClaimHistoryOption,
    );

    if (!claimHistoryValidator(optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { cookie, language, page } = optionsToUse;

    const instance = new RequestManager({
      route: API_URL.Genshin_HoYolab_Reward,
    });

    const res = await instance.get(
      "award",
      {
        Cookie: cookie,
      },
      {
        lang: language,
        act_id: "e202102251931481",
        current_page: page ?? 1,
        page_size: 10,
      },
    );

    const { data } = res;

    alias(data, { cnt: "count" });

    this.cache.set(cookie, data);

    return data;
  }
}

export class DailyRewards {
  private readonly defaultOptions?: FetchOptions;

  public readonly cookieManager?: ClientCookieManager;

  public rewardInfo: RewardInfo;

  public extraRewardInfo: ExtraRewardInfo;

  public resignInfo: ResignInfo;

  public checkInHistory: CheckInHistory;

  constructor(options?: Options) {
    this.defaultOptions = options?.defaultOptions;
    this.cookieManager = options?.cookieManager;

    this.rewardInfo = new RewardInfo(options);
    this.extraRewardInfo = new ExtraRewardInfo(options);
    this.resignInfo = new ResignInfo(options);
    this.checkInHistory = new CheckInHistory(options);
  }

  /**
   * @description CheckIn to claim Daily Rewards
   */
  public async checkIn(options?: CheckInFetchOptions): Promise<DailyRewardSignInData> {
    const optionsToUse = mergeOptions({
      options,
      cookieManager: this.cookieManager,
      defaultOptions: this.defaultOptions,
    });

    if (!basicValidator("", optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { cookie, language } = optionsToUse;

    const instance = new RequestManager({
      route: API_URL.Genshin_HoYolab_Reward,
      withUA: true,
    });

    const res = await instance.post(
      "sign",
      {
        Cookie: cookie,
      },
      {
        act_id: "e202102251931481",
      },
      {
        lang: language,
      },
    );

    let { data } = res;

    if (res.retcode === 0 && data.gt_result.is_risk && options?.geetestCallback) {
      const geetest = await options.geetestCallback(data.gt_result.challenge, data.gt_result.gt);

      const res2 = await instance.post(
        "sign",
        {
          Cookie: cookie,
        },
        {
          act_id: "e202102251931481",
          "x-rpc-challenge": data.gt_result.challenge,
          "x-rpc-seccode": geetest.seccode,
          "x-rpc-validate": geetest.validate,
        },
        {
          lang: language,
        },
      );

      data = res2.data;

      if (res2.retcode === 0 && data.gt_result.is_risk) {
        return {
          status: "geetest triggered",
          code: res2.retcode,
        };
      }
    }

    if (res.retcode === 0 && data.gt_result.is_risk && !options?.geetestCallback) {
      return {
        status: "geetest triggered",
        code: res.retcode,
      };
    }

    if (res.retcode === -5003) {
      return {
        status: "Already claimed",
        code: -5003,
      };
    }

    if (data.code === "ok" && res.retcode === 0) {
      const info = await this.rewardInfo.fetch(options);

      const today = info.today.split("-")[2];
      const reward = await this.rewardInfo.fetchDay(parseInt(today || "1"), {
        cookie,
        language,
      });
      return {
        status: "success",
        code: res.retcode,
        rewards: reward,
      };
    }

    return {
      status: "error",
      code: res.retcode,
    };
  }
}
