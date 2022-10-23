import { request } from "../utils/request";
import type { RecordCard } from "../interface";
import type { Language } from "../constants/lang";
import { BaseRoute } from "./base";
import { Genshin_Hoyolab_API_URL } from "../constants/constants";

export class GameRecordCard extends BaseRoute {
  constructor(clientCache?: any) {
    super(clientCache);
  }

  /**
   * @param {string} uid Hoyolab uid
   * @param {Language} language The language to set
   * @param {string} cookie The cookie to set
   */
  public async fetch(
    uid: string,
    language: Language,
    cookie: string
  ): Promise<RecordCard> {
    const instance = new request({
      route: Genshin_Hoyolab_API_URL,
    });

    instance.setLanguage(language);

    const res = await instance.get(
      "getGameRecordCard",
      {
        Cookie: cookie,
      },
      {
        uid: uid,
      }
    );

    const { data } = res;
    if (this.cache) {
      this.cache.set(uid, data);
    }
    return {
      list: data,
      currecnt: data.list[0],
    };
  }
}
