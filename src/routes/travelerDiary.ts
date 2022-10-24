import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { DiaryData } from "../interface";
import type { Language } from "../constants/lang";
import { BaseRoute } from "./base";
import { Genshin_Hoyolab_DIARY_URL } from "../constants/constants";

export class TravelerDiary extends BaseRoute {
  constructor(clientCache?: any) {
    super(clientCache);
  }
  /**
   * @param {string} uid The uid to set
   * @param {Language} language The language to set
   * @param {string} cookie The cookie to set
   */

  public async fetch(
    uid: string,
    language: Language,
    cookie: string
  ): Promise<DiaryData> {
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
    month: number,
    language: Language,
    cookie: string
  ): Promise<DiaryData> {
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
