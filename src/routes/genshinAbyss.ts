import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { AbyssBattleData } from "../interface";
import { BaseRoute, fetchOptions } from "./base";
import type { ClientCache } from "../client/clientCache";
import { validate } from "../utils/validate";

type SpiralAbyssFetchOptions = fetchOptions & {
  previous?: boolean;
};

export class SpiralAbyss extends BaseRoute {
  public declare cache: ClientCache<AbyssBattleData> | null;

  public declare defaultOptions: SpiralAbyssFetchOptions;

  /**
   * @param {string} uid Genshin Impact game uid
   */
  public async fetch(
    uid: string,
    options?: SpiralAbyssFetchOptions
  ): Promise<AbyssBattleData> {
    if (this.cache?.has(uid)) return this.cache.get(uid) as AbyssBattleData;

    validate<string, SpiralAbyssFetchOptions>(
      uid,
      options || this.defaultOptions
    );

    const { language, cookie, previous } = options || this.defaultOptions;

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
