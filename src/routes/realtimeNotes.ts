import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { RealTimeNoteData } from "../interface";
import type { Language } from "../constants/lang";
import { BaseRoute } from "./base";
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
    language: Language,
    cookie: string
  ): Promise<RealTimeNoteData> {
    if (this.cache?.has(uid)) return this.cache.get(uid) as RealTimeNoteData;
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
