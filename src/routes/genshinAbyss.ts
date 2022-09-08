import { request, setLanguage } from "../utils/request";
import generate_dynamic_secret from "../utils/generate_ds";
import { checkServerRegion } from "../utils/getServer";
import { ClientCache } from "../client/clientCache";
import type { AbyssBattle, APIResponse } from "../interface";
import { APIError } from "../utils/error";

export class SpiralAbyss {

    readonly cache: ClientCache = new ClientCache();

    /**
       * @param {string} language The response language
       * @param {string} cookie The cookie to use for the request
       * @param {string} uid Genshin Impact game uid
       */

    public async get(uid: string, language: string, cookie: string, previous?: boolean): Promise<AbyssBattle | APIResponse> {
        const instance = request();

        setLanguage(language);

        const res = await instance.get("/spiralAbyss", {
            headers: {
                "x-rpc-client_type": "4",
                "x-rpc-app_version": "1.5.0",
                "DS": generate_dynamic_secret(),
                "Cookie": cookie,
            },
            params: {
                "server": checkServerRegion(uid),
                "role_id": uid,
                "schedule_type": `${previous ? "2" : "1"}`,
            },
        });

        if (res.data?.retcode === 0) {
            const { data } = res;
            this.cache.set(uid, data.data);
            return data.data;
        }

        if (res.data.retcode === 10101) {
            return {
                status: "Cannot get data for more than 30 accounts per cookie per day",
                code: 10101,
            }
        }

        throw new APIError(res.data.message, res.data.retcode);
    }
}


