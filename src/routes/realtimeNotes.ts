import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { RealTimeNote } from "../interface";
import { APIError } from "../utils/error";
import type { Language } from "../constants/lang";
import { BaseRoute } from "./base";

export class RealTimeNotes extends BaseRoute {
  constructor(clientCache?: any) {
    super(clientCache);
  }
  /**
   * @param {string} uid The uid to set
   * @param {Language} language The language to set
   * @param {string} cookie The cookie to set
   */

  public async fetch(
    uid: string,
    language: Language,
    cookie: string
  ): Promise<RealTimeNote> {
    const instance = new request({
      withDS: true,
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

    if (res.retcode === 0) {
      const { data } = res;

      if (this.clientCache) {
        this.clientCache.set(`${uid}-realtimeNotes`, data);
      }
      return data;
    }

    throw new APIError(res.message, res.retcode);
  }
}
