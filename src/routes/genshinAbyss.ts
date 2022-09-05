import { request, setLanguage } from "../utils/request";
import generate_dynamic_secret from "../utils/generate_ds";
import { checkServerRegion } from "../utils/getServer";
import { ClientCache } from "../client/clientCache";
import type { AbyssBattle } from "../interface";

export class SpiralAbyss {

    cache: ClientCache = new ClientCache();

    /**
       * @param {string} language The response language
       * @param {string} cookie The cookie to use for the request
       * @param {string} uid Genshin Impact game uid
       */

    public async get(language: string, cookie: string, uid: string, previous?: boolean): Promise<AbyssBattle> {
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

        throw new Error(res.data.retcode);
    }
}


