import { BaseRoute, fetchOptions, Options } from "./base";
import { mergeOptions, request, basicValidator, checkServerRegion } from "../utils";
import type { RealTimeNoteData } from "../interface";

export class RealTimeNotes extends BaseRoute<RealTimeNoteData> {
  private readonly defaultOptions?: fetchOptions;

  constructor(options?: Options<fetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @param {string} uid Genshin Impact UID
   */
  public async fetch(uid: string, options: fetchOptions): Promise<RealTimeNoteData> {
    if (this.cache?.has(uid)) return this.cache.get(uid);

    const optionsToUse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!basicValidator(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie } = optionsToUse;

    const instance = new request({
      withDS: true,
      withExtraHeaders: true,
      language,
    });

    const res = await instance.get(
      "dailyNote",
      {
        Cookie: cookie,
      },
      {
        server: checkServerRegion(uid),
        role_id: uid,
      },
    );

    const { data } = res;

    if (this.cache) {
      this.cache.set(uid, data);
    }
    return data;
  }
}
