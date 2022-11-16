import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { RealTimeNoteData } from "../interface";
import { BaseRoute, fetchOptions } from "./base";
import type { ClientCache } from "../client/clientCache";
import { basicValidator } from "../utils/validator";

export class RealTimeNotes extends BaseRoute {
  public declare cache: ClientCache<RealTimeNoteData> | null;

  /**
   * @param {string} uid Genshin Impact UID
   */
  public async fetch(
    uid: string,
    options: fetchOptions
  ): Promise<RealTimeNoteData> {
    if (this.cache?.has(uid)) return this.cache.get(uid);

    const optionsToUse = this.getFetchOptions(options);

    if (!basicValidator(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie } = optionsToUse;

    const instance = new request({
      withDS: true,
      withExtraHeaders: true,
    });

    instance.setLanguage(language);

    const res = await instance.get(
      "dailyNote",
      {
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
