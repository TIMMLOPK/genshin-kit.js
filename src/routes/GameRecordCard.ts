import { urlOption, request } from "../utils/request";
import type { RecordCard } from "../interface";
import { APIError } from "../utils/error";
import type { Language } from "../constants/lang";
import { BaseRoute } from "./base";

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
      type: urlOption.hoyolab,
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

    if (res.retcode === 0) {
      const { data } = res;
      if (this.clientCache) {
        this.clientCache.set(`${uid}-recordCard`, data);
      }
      return {
        list: data,
        currecnt: data.list[0],
      };
    }

    throw new APIError(res.message, res.retcode);
  }
}
