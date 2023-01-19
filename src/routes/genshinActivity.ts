import { BaseRoute, fetchOptions, Options } from "./base";
import { mergeOptions, request, basicValidator, checkServerRegion } from "../utils";
import type { ActivitiesData } from "../interface";

export class Activities extends BaseRoute<ActivitiesData> {
  private readonly defaultOptions?: fetchOptions;

  constructor(options?: Options<fetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @param {string} uid Genshin Impact UID
   */
  public async fetch(uid: string, options?: fetchOptions): Promise<ActivitiesData> {
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
      "activities",
      {
        Cookie: cookie,
      },
      {
        server: checkServerRegion(uid),
        role_id: uid,
      },
    );

    const { data } = res;

    const returnData = {
      sumo: data.activities[0].sumo.records,
      rogue: data.activities[1].rogue.records,
      channeller_slab_copy: data.activities[2].channeller_slab_copy,
      potion: data.activities[3].potion.records,
      sumo_second: data.activities[4].sumo_second.records,
      crystal: data.activities[5].crystal.records,
      perilous: data.activities[6].perilous.records,
      summer_v2: data.activities[7].summer_v2,
      spray: data.activities[8].spray,
    };

    if (this.cache) {
      this.cache.set(uid, returnData);
    }

    return returnData;
  }
}
