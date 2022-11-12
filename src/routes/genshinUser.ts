import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { GenshinUserData } from "../interface";
import { BaseRoute, fetchOptions } from "./base";
import type { ClientCache } from "../client/clientCache";
import { validate } from "../utils/validate";

export class GenshinUser extends BaseRoute {
  public declare cache: ClientCache<GenshinUserData> | null;

  /**
   * @param {string} uid Genshin Impact game uid.
   */
  public async fetch(
    uid: string,
    options?: fetchOptions
  ): Promise<GenshinUserData> {
    if (this.cache?.has(uid)) return this.cache.get(uid);

    const optionsToUse = this.getFetchOptions(options);

    if (!validate(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie } = optionsToUse;

    const instance = new request({
      withDS: true,
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
