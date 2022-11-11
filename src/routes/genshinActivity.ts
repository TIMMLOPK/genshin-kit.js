import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { ActivitiesData } from "../interface";
import { BaseRoute, fetchOptions } from "./base";
import type { ClientCache } from "../client/clientCache";

export class Activities extends BaseRoute {
  public declare cache: ClientCache<ActivitiesData> | null;

  /**
   * @param {string} uid The uid to set
   */
  public async fetch(
    uid: string,
    options: fetchOptions
  ): Promise<ActivitiesData> {
    if (this.cache?.has(uid)) return this.cache.get(uid) as ActivitiesData;

    if (!options || !this.defaultOptions)
      throw new Error("No options provided");

    const { language, cookie } = options;

    const instance = new request({
      withDS: true,
      debug: this.debug,
    });

    instance.setLanguage(language);

    const res = await instance.get(
      "activities",
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
