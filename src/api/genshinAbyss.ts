import { request, setLanguage } from "../utils/request";
import generate_dynamic_secret from "../utils/generate_ds";
import type { AbyssBattle } from "../interface/genshinAbyssAPI";
import { checkServerRegion } from "../utils/getServer";

export class SpiralAbyss {
    /**
       * 
       * @param {string} language The response language
       * @param {string} cookie The cookie to use for the request
       * @param {string | number} uid Genshin Impact game uid
       * 
       */

    public async requestAPI(language: string, cookie: string, uid: string | number, previous?: boolean): Promise<AbyssBattle> {
        const instance = request();
        setLanguage(language);
        const region = checkServerRegion(uid);
        if (region === "unknown") throw new Error("unknown server region");
        const res = await instance.get("/spiralAbyss", {
            headers: {
                "x-rpc-client_type": "4",
                "x-rpc-app_version": "1.5.0",
                "DS": generate_dynamic_secret(),
                "Cookie": cookie,
            },
            params: {
                "server": region,
                "role_id": uid,
                "schedule_type": `${previous ? "2" : "1"}`,
            },
        });

        if (res.data?.retcode === 0) return res.data.data;

        throw new Error(res.data.retcode);

    }
}


