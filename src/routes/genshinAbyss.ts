import { BaseRoute, fetchOptions, Options } from "./base";
import { mergeOptions, RequestManager, spiralAbyssValidator, checkServerRegion } from "../utils";
import type { AbyssBattleData } from "../interface";

export type SpiralAbyssFetchOptions = fetchOptions & {
  previous?: boolean;
};

export class SpiralAbyss extends BaseRoute<AbyssBattleData> {
  public declare defaultOptions: SpiralAbyssFetchOptions;

  constructor(options?: Options<SpiralAbyssFetchOptions>) {
    super(options);
  }

  /**
   * @param {string} uid Genshin Impact UID
   */
  public async fetch(uid: string, options?: SpiralAbyssFetchOptions): Promise<AbyssBattleData> {
    if (this.cache?.has(uid)) return this.cache.get(uid);

    const optionsToUse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!spiralAbyssValidator(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie, previous } = optionsToUse;

    const instance = new RequestManager({
      withDS: true,
      withExtraHeaders: true,
      language,
    });

    const res = await instance.get(
      "spiralAbyss",
      {
        Cookie: cookie,
      },
      {
        server: checkServerRegion(uid),
        role_id: uid,
        schedule_type: previous ? "2" : "1",
      },
    );

    const { data } = res;

    if (this.cache) {
      this.cache.set(uid, data);
    }

    return data;
  }
}
