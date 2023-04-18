import { BaseRoute, FetchOptions, Options } from "./base";
import { mergeOptions, RequestManager, spiralAbyssValidator, checkServerRegion } from "../utils";
import type { AbyssBattleData } from "../interface";

export type SpiralAbyssFetchOptions = FetchOptions & {
  previous?: boolean;
};

export class SpiralAbyss extends BaseRoute<AbyssBattleData> {
  public readonly defaultOptions?: SpiralAbyssFetchOptions;

  constructor(options?: Options<SpiralAbyssFetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @param {string} uid Genshin Impact UID
   */
  public async fetch(uid: string, options?: SpiralAbyssFetchOptions): Promise<AbyssBattleData> {
    if (this.cache.has(uid)) return this.cache.get(uid);

    const optionsToUse = mergeOptions(
      {
        options,
        cookieManager: this.cookieManager,
        defaultOptions: this.defaultOptions,
      },
      "SpiralAbyssFetchOptions",
    );

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

    this.cache.set(uid, data);

    return data;
  }
}
