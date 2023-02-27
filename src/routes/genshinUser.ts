import { BaseRoute, fetchOptions, Options } from "./base";
import { mergeOptions, RequestManager, basicValidator, checkServerRegion } from "../utils";
import type { GenshinUserData } from "../interface";

export class GenshinUser extends BaseRoute<GenshinUserData> {
  private readonly defaultOptions?: fetchOptions;

  constructor(options?: Options<fetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @param {string} uid Genshin Impact UID
   */
  public async fetch(uid: string, options?: fetchOptions): Promise<GenshinUserData> {
    if (this.cache.has(uid)) return this.cache.get(uid);

    const optionsToUse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!basicValidator(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie } = optionsToUse;

    const instance = new RequestManager({
      withDS: true,
      withExtraHeaders: true,
      language,
    });

    const res = await instance.get(
      "index",
      {
        Cookie: cookie,
      },
      {
        server: checkServerRegion(uid),
        role_id: uid,
      },
    );

    const { data } = res;

    this.cache.set(uid, data);

    return data;
  }
}
