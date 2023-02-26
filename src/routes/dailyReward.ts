import { API_URL } from "../constants/constants";
import { BaseRoute, fetchOptions, Options } from "./base";
import { mergeOptions, RequestManager, basicValidator, alias, claimHistoryValidator } from "../utils";
import type {
  DailyRewardSignInHistoryData,
  DayRewardData,
  DailyRewardSignInData,
  DailyRewardInfoData,
  DailyRewardExtraRewardData,
  DailyRewardResignData,
} from "../interface";
import type { ClientCookieManager } from "../client/clientCookieManager";

export type fetchClaimHistoryOption = fetchOptions & { page?: number };

export class DayReward extends BaseRoute<DayRewardData> {
  private readonly defaultOptions?: fetchOptions;

  constructor(options?: Options<fetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @description Get the daily rewards details
   * @param {number} day Day of the rewards
   */
  public async fetch(day: number, options?: fetchOptions): Promise<DayRewardData> {
    if (this.cache.has(day.toString())) return this.cache.get(day.toString());
    const optionTouse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!basicValidator(day, optionTouse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { cookie, language } = optionTouse;

    const instance = new RequestManager({
      route: API_URL.Genshin_Hoyolab_Reward,
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

    const resData = alias(data.awards[day - 1], { cnt: "count" });

    this.cache.set(day.toString(), resData);

    return resData;
  }
}

class RewardInfo extends BaseRoute<DailyRewardInfoData> {
  private readonly defaultOptions?: fetchOptions;

  constructor(options?: Options<fetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @description Get the daily rewards info
   */
  public async fetch(options?: fetchOptions): Promise<DailyRewardInfoData> {
    if (this.cache.has(options?.cookie || "")) return this.cache.get(options?.cookie || "");
    const optionTouse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!basicValidator("", optionTouse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { cookie, language } = optionTouse;

    const instance = new RequestManager({
      route: API_URL.Genshin_Hoyolab_Reward,
    });

    const res = await instance.get(
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
}

class ExtraRewardInfo extends BaseRoute<DailyRewardExtraRewardData> {
  private readonly defaultOptions?: fetchOptions;

  constructor(options?: Options<fetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @description Get the extra rewards info
   */
  async fetch(options?: fetchOptions): Promise<DailyRewardExtraRewardData> {
    if (this.cache.has(options?.cookie || "")) return this.cache.get(options?.cookie || "");
    const optionTouse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!basicValidator("", optionTouse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { cookie } = optionTouse;

    const instance = new RequestManager({
      route: API_URL.Genshin_Hoyolab_Reward,
    });

    const res = await instance.get(
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

    alias(data, { total_cnt: "total_count", cnt: "count", mc: "month_card" });

    this.cache.set(cookie, data);

    return data;
  }
}

class ResignInfo extends BaseRoute<DailyRewardResignData> {
  private readonly defaultOptions?: fetchOptions;

  constructor(options?: Options<fetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @description get resign info
   */
  async fetch(options?: fetchOptions): Promise<DailyRewardResignData> {
    if (this.cache.has(options?.cookie || "")) return this.cache.get(options?.cookie || "");
    const optionTouse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!basicValidator("", optionTouse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { cookie, language } = optionTouse;
    const instance = new RequestManager({
      route: API_URL.Genshin_Hoyolab_Reward,
    });

    const res = await instance.get(
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

export class CheckInHistory extends BaseRoute<DailyRewardSignInHistoryData> {
  private readonly defaultOptions?: fetchOptions;

  constructor(options?: Options<fetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @description get check in history
   */
  async fetch(options?: fetchClaimHistoryOption): Promise<DailyRewardSignInHistoryData> {
    if (this.cache.has(options?.cookie || "")) return this.cache.get(options?.cookie || "");
    const optionTouse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!claimHistoryValidator(optionTouse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { cookie, language, page } = optionTouse;

    const instance = new RequestManager({
      route: API_URL.Genshin_Hoyolab_Reward,
    });

    const res = await instance.get(
      "award",
      {
        Cookie: cookie,
      },
      {
        lang: language,
        act_id: "e202102251931481",
        current_page: page || 1,
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
  private readonly defaultOptions?: fetchOptions;

  public readonly cookieManager?: ClientCookieManager;

  public dayReward: DayReward;

  public rewardInfo: RewardInfo;

  public extraRewardInfo: ExtraRewardInfo;

  public resignInfo: ResignInfo;

  public checkInHistory: CheckInHistory;

  constructor(options?: Options<fetchOptions>) {
    this.defaultOptions = options?.defaultOptions;
    this.cookieManager = options?.cookieManager;

    this.dayReward = new DayReward(options);
    this.rewardInfo = new RewardInfo(options);
    this.extraRewardInfo = new ExtraRewardInfo(options);
    this.resignInfo = new ResignInfo(options);
    this.checkInHistory = new CheckInHistory(options);
  }

  /**
   * @description Get the daily rewards details
   * @deprecated use `DailyRewards.dayReward.fetch()` instead
   */
  public async fetchDayReward(): Promise<DayRewardData> {
    throw new Error("Deprecated, use `DailyRewards.dayReward.fetch()` instead");
  }

  /**
   * @description CheckIn to claim Daily Rewards
   */
  public async checkIn(options?: fetchOptions): Promise<DailyRewardSignInData> {
    const optionTouse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!basicValidator("", optionTouse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { cookie, language } = optionTouse;

    const instance = new RequestManager({
      route: API_URL.Genshin_Hoyolab_Reward,
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

    const { data } = res;

    if (res.retcode === -5003) {
      return {
        status: "Already claimed",
        code: -5003,
      };
    }

    if (data.code === "ok" && res.retcode === 0) {
      const info = await this.rewardInfo.fetch(options);
      const today = info.today.split("-")[2];
      const reward = await this.dayReward.fetch(parseInt(today || "1"), {
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

  /**
   * @description Get the daily rewards info
   * @deprecated use `DailyRewards.rewardInfo.fetch()` instead
   */
  async fetchRewardInfo(): Promise<DailyRewardInfoData> {
    throw new Error("Deprecated, use `DailyRewards.rewardInfo.fetch()` instead");
  }

  /**
   * @description Get the extra rewards info
   * @deprecated use `DailyRewards.extraReward.fetch()` instead
   */
  async fetchExtraRewardInfo(): Promise<DailyRewardExtraRewardData> {
    throw new Error("Deprecated, use `DailyRewards.extraReward.fetch()` instead");
  }

  /**
   * @description get resign info
   * @deprecated use `DailyRewards.resignInfo.fetch()` instead
   */
  async fetchResignInfo(): Promise<DailyRewardResignData> {
    throw new Error("Deprecated, use `DailyRewards.resignInfo.fetch()` instead");
  }

  /**
   * @description get check in history
   * @deprecated use `DailyRewards.checkInHistory.fetch()` instead
   */
  async fetchCheckInHistory(): Promise<DailyRewardSignInHistoryData> {
    throw new Error("Deprecated, use `DailyRewards.checkInHistory.fetch()` instead");
  }
}
