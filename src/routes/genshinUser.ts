import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { GenshinUserData } from "../interface";
import type { Language } from "../constants/lang";
import { BaseRoute } from "./base";

export class GenshinUser extends BaseRoute {
  /**
   * @param {string} uid The uid to set
   * @param {Language} language The language to set
   * @param {string} cookie The cookie to set
   */

  public async fetch(
    uid: string,
    language: Language,
    cookie: string
  ): Promise<GenshinUserData> {
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
