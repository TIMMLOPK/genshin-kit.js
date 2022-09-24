import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import { APIError } from "../utils/error";
import { ClientCache } from "../client/clientCache";
import type { ActivitiesData } from "../interface";
import type { Language } from "../constants/lang";

export class Activities {

    readonly cache: ClientCache;

    constructor() {
        this.cache = new ClientCache();
    }
    /**
       * @param {string} uid The uid to set
       * @param {Language} language The language to set
       * @param {string} cookie The cookie to set
       */

    public async get(uid: string, language: Language, cookie: string): Promise<ActivitiesData> {
        const instance = new request({
            withDS: true,
        });
        instance.setLanguage(language);
        const res = await instance.get("activities",
            {
                "x-rpc-client_type": "4",
                "x-rpc-app_version": "1.5.0",
                "Cookie": cookie,
            },
            {
                "server": checkServerRegion(uid),
                "role_id": uid,
            },
        );

        if (res.retcode === 0) {
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

            this.cache.set(`${uid}-activities`, returnData);

            return returnData;
        }

        throw new APIError(res.message, res.retcode);

    }
}


