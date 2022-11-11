import { request } from "../utils/request";
import type { RecordCardData } from "../interface";
import { BaseRoute, fetchOptions } from "./base";
import { Genshin_Hoyolab_API_URL } from "../constants/constants";
import { removeFromArrayObject } from "../utils/alias";
import type { ClientCache } from "../client/clientCache";

export class GameRecordCard extends BaseRoute {
  public declare cache: ClientCache<RecordCardData> | null;

  /**
   * @param {string} uid Hoyolab UID
   */
  public async fetch(
    uid: string,
    options?: fetchOptions
  ): Promise<RecordCardData> {
    if (this.cache?.has(uid)) return this.cache.get(uid) as RecordCardData;

    if (!options || !this.defaultOptions)
      throw new Error("No options provided");

    const { language, cookie } = options;

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
