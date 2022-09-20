import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import { ClientCache } from "../client/clientCache";
import type { AbyssBattle, APIResponse } from "../interface";
import { APIError } from "../utils/error";
import type { Language } from "../constants/lang";

export class SpiralAbyss {

    readonly cache: ClientCache = new ClientCache();

    /**
       * @param {string} uid Genshin Impact game uid
       * @param {Language} language The response language
       * @param {string} cookie The cookie to use for the request
       */

    public async get(uid: string, language: Language, cookie: string, previous?: boolean): Promise<AbyssBattle | APIResponse> {
        const instance = new request({
            withDS: true
        });

        instance.setLanguage(language);

        const res = await instance.get("spiralAbyss",
            {
                "x-rpc-client_type": "4",
                "x-rpc-app_version": "1.5.0",
                "Cookie": cookie,
            },
            {
                "server": checkServerRegion(uid),
                "role_id": uid,
                "schedule_type": `${previous ? "2" : "1"}`,
            },
        );

        if (res.retcode === 0) {
            const { data } = res;
            this.cache.set(uid, data);
            return data;
        }

        throw new APIError(res.message, res.retcode);
    }
}


