import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { AbyssBattleData } from "../interface";
import type { Language } from "../constants/lang";
import { BaseRoute } from "./base";
import type { ClientCache } from "../client/clientCache";

export class SpiralAbyss extends BaseRoute {
  public declare cache: ClientCache<AbyssBattleData> | null;
  /**
   * @param {string} uid Genshin Impact game uid
   * @param {Language} language The response language
   * @param {string} cookie The cookie to use for the request
   */

  public async fetch(
    uid: string,
    language: Language,
    cookie: string,
    previous?: boolean
  ): Promise<AbyssBattleData> {
    if (this.cache?.has(uid)) return this.cache.get(uid) as AbyssBattleData;
    const instance = new request({
      withDS: true,
      debug: this.debug,
    });

    instance.setLanguage(language);

    const res = await instance.get(
      "spiralAbyss",
      {
        "x-rpc-client_type": "4",
        "x-rpc-app_version": "1.5.0",
        Cookie: cookie,
      },
      {
        server: checkServerRegion(uid),
        role_id: uid,
        schedule_type: `${previous ? "2" : "1"}`,
      }
    );

    const { data } = res;

    if (this.cache) {
      this.cache.set(uid, data);
    }

    return data;
  }
}
