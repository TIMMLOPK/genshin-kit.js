import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { AbyssBattleData } from "../interface";
import { BaseRoute, fetchOptions, Options } from "./base";
import type { ClientCache } from "../client/clientCache";
import { spiralAbyssValidator } from "../utils/validate";

export type SpiralAbyssFetchOptions = fetchOptions & {
  previous?: boolean;
};

export class SpiralAbyss extends BaseRoute {
  public declare cache: ClientCache<AbyssBattleData> | null;

  public declare defaultOptions: SpiralAbyssFetchOptions;

  constructor(options: Options<SpiralAbyssFetchOptions>) {
    super(options);
  }

  /**
   * @param {string} uid Genshin Impact game uid
   */
  public async fetch(
    uid: string,
    options?: SpiralAbyssFetchOptions
  ): Promise<AbyssBattleData> {
    if (this.cache?.has(uid)) return this.cache.get(uid);

    const optionsToUse = this.getFetchOptions(
      options
    ) as SpiralAbyssFetchOptions;

    if (!spiralAbyssValidator(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie, previous } = optionsToUse;

    const instance = new request({
      withDS: true,
    });

    instance.setLanguage(language);

    const res = await instance.get(
      "spiralAbyss",
      {
        "x-rpc-client_type": "4",
        "x-rpc-app_version": "1.5.0",
        Cookie: cookie,
      },
      {
        server: checkServerRegion(uid),
        role_id: uid,
        schedule_type: `${previous ? "2" : "1"}`,
      }
    );

    const { data } = res;

    if (this.cache) {
      this.cache.set(uid, data);
    }

    return data;
  }
}
