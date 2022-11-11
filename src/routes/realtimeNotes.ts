import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { RealTimeNoteData } from "../interface";
import { BaseRoute, fetchOptions } from "./base";
import type { ClientCache } from "../client/clientCache";

export class RealTimeNotes extends BaseRoute {
  public declare cache: ClientCache<RealTimeNoteData> | null;
  /**
   * @param {string} uid The uid to set
   * @param {Language} language The language to set
   * @param {string} cookie The cookie to set
   */

  public async fetch(
    uid: string,
    options: fetchOptions
  ): Promise<RealTimeNoteData> {
    if (this.cache?.has(uid)) return this.cache.get(uid) as RealTimeNoteData;

    if (!options || !this.defaultOptions)
      throw new Error("No options provided");

    const { language, cookie } = options;

    const instance = new request({
      withDS: true,
      debug: this.debug,
    });

    instance.setLanguage(language);

    const res = await instance.get(
      "dailyNote",
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
