import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { DiaryData } from "../interface";
import { BaseRoute, fetchOptions } from "./base";
import { Genshin_Hoyolab_DIARY_URL } from "../constants/constants";
import type { ClientCache } from "../client/clientCache";
import { validate } from "../utils/validate";

type getMonthDiaryOptions = fetchOptions & {
  month: number;
};
export class TravelerDiary extends BaseRoute {
  public declare cache: ClientCache<DiaryData> | null;

  /**
   * @param {string} uid The uid to set
   */
  public async fetch(uid: string, options: fetchOptions): Promise<DiaryData> {
    if (this.cache?.has(uid)) return this.cache.get(uid) as DiaryData;

    validate<string, fetchOptions>(uid, options || this.defaultOptions);

    const { language, cookie } = options || this.defaultOptions;

    const instance = new request({
      route: Genshin_Hoyolab_DIARY_URL,
      debug: this.debug,
    });
    const res = await instance.get(
      "month_info",
      {
        Cookie: cookie,
      },
      {
        region: checkServerRegion(uid),
        uid: uid,
        lang: language,
      }
    );

    const { data } = res;

    if (this.cache) {
      this.cache.set(uid, data);
    }
    return data;
  }

  public async getMonth(
    uid: string,
    options: getMonthDiaryOptions
  ): Promise<DiaryData> {
    if (!options) throw new Error("No options provided");
    validate<string, getMonthDiaryOptions>(uid, options);

    const { language, cookie, month } = options;

    const instance = new request({
      route: Genshin_Hoyolab_DIARY_URL,
    });
    const res = await instance.get(
      "month_info",
      {
        Cookie: cookie,
      },
      {
        region: checkServerRegion(uid),
        uid: uid,
        lang: language,
        month: month,
      }
    );

    const { data } = res;
    if (this.cache) {
      this.cache.set(`${uid}-${month}`, data);
    }
    return data;
  }
}
