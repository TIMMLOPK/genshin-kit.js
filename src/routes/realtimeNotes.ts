import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { RealTimeNoteData } from "../interface";
import { BaseRoute, fetchOptions } from "./base";
import type { ClientCache } from "../client/clientCache";
import { validate } from "../utils/validate";

export class RealTimeNotes extends BaseRoute {
  public declare cache: ClientCache<RealTimeNoteData> | null;

  /**
   * @param {string} uid Genshin Impact game uid.
   */
  public async fetch(
    uid: string,
    options: fetchOptions
  ): Promise<RealTimeNoteData> {
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
