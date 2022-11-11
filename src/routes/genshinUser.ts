import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { GenshinUserData } from "../interface";
import { BaseRoute, fetchOptions } from "./base";
import type { ClientCache } from "../client/clientCache";

export class GenshinUser extends BaseRoute {
  public declare cache: ClientCache<GenshinUserData> | null;

  /**
   * @param {string} uid The uid to set
   */
  public async fetch(
    uid: string,
    options?: fetchOptions
  ): Promise<GenshinUserData> {
    if (this.cache?.has(uid)) return this.cache.get(uid) as GenshinUserData;

    if (!options || !this.defaultOptions)
      throw new Error("No options provided");

    const { language, cookie } = options;

    const instance = new request({
      withDS: true,
      debug: this.debug,
    });

    instance.setLanguage(language);

    const res = await instance.get(
      "index",
      {
        "x-rpc-client_type": "4",
        "x-rpc-app_version": "1.5.0",
        Cookie: cookie,
      },
      {
        server: checkServerRegion(uid),
        role_id: uid,
      }
    );

    const { data } = res;

    if (this.cache) {
      this.cache.set(uid, data);
    }
    return data;
  }
}
