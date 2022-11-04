import { request } from "../utils/request";
import type {
  ClaimHistoryData,
  DailyRewardsData,
  DayRewardData,
  ExtraRewardData,
  ResignData,
  RewardInfoData,
} from "../interface";
import type { Language } from "../constants/lang";
import { Genshin_Hoyolab_REWARD_URL } from "../constants/constants";
import { alias } from "../utils/alias";

export class DailyRewards {
  /**
   * @description Get the daily rewards details
   * @param {string} cookie The cookie to set
   * @param {Language} language The language to set
   * @param {number} day get the day's rewards
   */

  public async getDayReward(
    day: number,
    language: Language,
    cookie: string
  ): Promise<DayRewardData> {
    const instance = new request({
      route: Genshin_Hoyolab_REWARD_URL,
    });

    instance.setLanguage(language);
    const res = await instance.get(
      "home",
      {
        Cookie: cookie,
      },
      {
        lang: language,
        act_id: "e202102251931481",
      }
    );

    const { data } = res;

    return alias(data.awards[day - 1], { cnt: "count" });
  }

  /**
   *
   * @description Claim the daily rewards
   * @param {Language} language The language to set
   * @param {string} cookie The cookie to set
   */

  public async claim(
    language: Language,
    cookie: string
  ): Promise<DailyRewardsData> {
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
      }
    );

    if (res.retcode === -5003) {
      return {
        status: "Already claimed",
        code: -5003,
        rewards: null,
      };
    }

    if (res.data.code === "ok" && res.retcode === 0) {
      const info = await this.fetchRewardInfo(language, cookie);
      const today = info.today.split("-")[2];
      const reward = await this.getDayReward(
        parseInt(today || "1"),
        language,
        cookie
      );
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
   * @param {string} cookie The cookie to set
   * @param {Language} language The language to set
   */
  async fetchRewardInfo(
    language: Language,
    cookie: string
  ): Promise<RewardInfoData> {
    const instance = new request({
      route: Genshin_Hoyolab_REWARD_URL,
    });

    instance.setLanguage(language);
    const res = await instance.get(
      "info",
      {
        Cookie: cookie,
      },
      {
        lang: language,
        act_id: "e202102251931481",
      }
    );

    const { data } = res;

    return data;
  }

  /**
   * @description Get the extra rewards info
   * @param {string} cookie The cookie to set
   */
  async fetchExtraRewardInfo(cookie: string): Promise<ExtraRewardData> {
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
      }
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
   * @param {string} cookie The cookie to set
   * @param {Language} language The language to set
   */
  async fetchResignInfo(
    language: Language,
    cookie: string
  ): Promise<ResignData> {
    const instance = new request({
      route: Genshin_Hoyolab_REWARD_URL,
    });

    instance.setLanguage(language);
    const res = await instance.get(
      "resign_info",
      {
        Cookie: cookie,
      },
      {
        lang: language,
        act_id: "e202102251931481",
      }
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
   * @description get claim history
   * @param {string} cookie The cookie to set
   * @param {Language} language The language to set
   * @param {number | undefined} page The page to set
   */
  async fetchClaimHistory(
    language: Language,
    cookie: string,
    page?: number
  ): Promise<ClaimHistoryData> {
    const instance = new request({
      route: Genshin_Hoyolab_REWARD_URL,
    });

    instance.setLanguage(language);
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
      }
    );

    const { data } = res;

    for (const award of data.list) {
      alias(award, { cnt: "count" });
    }

    return data;
  }
}
