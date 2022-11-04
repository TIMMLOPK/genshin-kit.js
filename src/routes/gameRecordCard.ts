import { request } from "../utils/request";
import type { RecordCardData } from "../interface";
import type { Language } from "../constants/lang";
import { BaseRoute } from "./base";
import { Genshin_Hoyolab_API_URL } from "../constants/constants";
import { removeFromArrayObject } from "../utils/alias";
import type { ClientCache } from "../client/clientCache";

export class GameRecordCard extends BaseRoute {
  public declare cache: ClientCache<RecordCardData> | null;

  /**
   * @param {string} uid Hoyolab uid
   * @param {Language} language The language to set
   * @param {string} cookie The cookie to set
   */
  public async fetch(
    uid: string,
    language: Language,
    cookie: string
  ): Promise<RecordCardData> {
    if (this.cache?.has(uid)) return this.cache.get(uid) as RecordCardData;
    const instance = new request({
      route: Genshin_Hoyolab_API_URL,
      debug: this.debug,
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

    removeFromArrayObject(data.list, ["h5_data_switches", "data_switches"]);

    return {
      list: data.list,
      currecnt: data.list[0],
    };
  }
}
