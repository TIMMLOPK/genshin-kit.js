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

export type fetchClaimHistoryOption = fetchOptions & { page?: number };

export class DailyRewards extends BaseRoute {
  private readonly defaultOptions?: fetchOptions;

  constructor(options?: Options<fetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @description Get the daily rewards details
   * @param {number} day Day of the rewards
   */
  public async fetchDayReward(day: number, options?: fetchOptions): Promise<DayRewardData> {
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

    return resData;
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

    if (res.retcode === -5003) {
      return {
        status: "Already claimed",
        code: -5003,
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
   */
  async fetchRewardInfo(options?: fetchOptions): Promise<DailyRewardInfoData> {
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

    return data;
  }

  /**
   * @description Get the extra rewards info
   */
  async fetchExtraRewardInfo(options?: fetchOptions): Promise<DailyRewardExtraRewardData> {
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

    return data;
  }

  /**
   * @description get resign info
   */
  async fetchResignInfo(options?: fetchOptions): Promise<DailyRewardResignData> {
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

    return data;
  }

  /**
   * @description get check in history
   */
  async fetchCheckInHistory(options?: fetchClaimHistoryOption): Promise<DailyRewardSignInHistoryData> {
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

    return data;
  }
}
