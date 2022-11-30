import { request } from "../utils/request";
import type {
  ClaimHistoryData,
  DailyRewardsData,
  DayRewardData,
  ExtraRewardData,
  ResignData,
  RewardInfoData,
} from "../interface";
import { Genshin_Hoyolab_REWARD_URL } from "../constants/constants";
import { alias } from "../utils/alias";
import { BaseRoute, fetchOptions, Options } from "./base";
import { claimHistoryValidator, getDayRewardValidator, basicValidator } from "../utils/validator";
import mergeOptions from "../utils/mergeOptions";

export type fetchClaimHistoryOption = fetchOptions & { page?: number };

export class DailyRewards extends BaseRoute {
  private readonly defaultOptions?: fetchOptions;

  constructor(options?: Options<fetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @description Get the daily rewards details
   * @param {number} day The day to get
   */
  public async fetchDayReward(day: number, options?: fetchOptions): Promise<DayRewardData> {
    const optionTouse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!getDayRewardValidator(day, optionTouse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { cookie, language } = optionTouse;

    const instance = new request({
      route: Genshin_Hoyolab_REWARD_URL,
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

    return resData;
  }

  /**
   * @description CheckIn to claim Daily Rewards
   */
  public async checkIn(options?: fetchOptions): Promise<DailyRewardsData> {
    const optionTouse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!basicValidator("", optionTouse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { cookie, language } = optionTouse;

    const instance = new request({
      route: Genshin_Hoyolab_REWARD_URL,
      withUA: true,
    });

    const res = await instance.post(
      "sign",
      {
        Cookie: cookie,
        "Content-Type": "application/json",
      },
      {
        act_id: "e202102251931481",
      },
      {
        lang: language,
      },
    );

    if (res.retcode === -5003) {
      return {
        status: "Already claimed",
        code: -5003,
        rewards: null,
      };
    }

    if (res.data.code === "ok" && res.retcode === 0) {
      const info = await this.fetchRewardInfo(options);
      const today = info.today.split("-")[2];
      const reward = await this.fetchDayReward(parseInt(today || "1"), {
        cookie,
        language,
      });
      return {
        status: "success",
        code: 0,
        rewards: reward,
      };
    }

    return {
      status: "error",
      code: res.retcode,
      rewards: null,
    };
  }

  /**
   * @description Get the daily rewards info
   */
  async fetchRewardInfo(options?: fetchOptions): Promise<RewardInfoData> {
    const optionTouse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!basicValidator("", optionTouse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { cookie, language } = optionTouse;

    const instance = new request({
      route: Genshin_Hoyolab_REWARD_URL,
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

    return data;
  }

  /**
   * @description Get the extra rewards info
   */
  async fetchExtraRewardInfo(options?: fetchOptions): Promise<ExtraRewardData> {
    const optionTouse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!basicValidator("", optionTouse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { cookie } = optionTouse;

    const instance = new request({
      route: Genshin_Hoyolab_REWARD_URL,
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

    alias(data, { total_cnt: "total_count" });

    for (const award of data.awards) {
      alias(award, { cnt: "count" });
    }

    return data;
  }

  /**
   * @description get resign info
   */
  async fetchResignInfo(options?: fetchOptions): Promise<ResignData> {
    const optionTouse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!basicValidator("", optionTouse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { cookie, language } = optionTouse;
    const instance = new request({
      route: Genshin_Hoyolab_REWARD_URL,
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

    return data;
  }

  /**
   * @description get check in history
   */
  async fetchCheckInHistory(options?: fetchClaimHistoryOption): Promise<ClaimHistoryData> {
    const optionTouse = mergeOptions(options, this.cookieManager, this.defaultOptions) as fetchClaimHistoryOption;

    if (!claimHistoryValidator(optionTouse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { cookie, language, page } = optionTouse;

    const instance = new request({
      route: Genshin_Hoyolab_REWARD_URL,
    });

    const res = await instance.get(
      "award",
      {
        Cookie: cookie,
      },
      {
        lang: language,
        act_id: "e202102251931481",
        current_page: page?.toString() || "1",
        page_size: "10",
      },
    );

    const { data } = res;

    for (const award of data.list) {
      alias(award, { cnt: "count" });
    }

    return data;
  }
}
