import { request, setLanguage } from "../utils/request";
import generate_dynamic_secret from "../utils/generate_ds";
import { checkServerRegion } from "../utils/getServer";
import type { Characters, APIResponse } from "../interface";

export class Charcters {
    /**
       * 
       * @param {string} language The language to set
       * @param {string} cookie The cookie to set
       * @param {string} uid The uid to set
       * 
       */

    public async get(language: string, cookie: string, uid: string): Promise<Characters | APIResponse> {
        const instance = request();
        setLanguage(language);
        const res = await instance.post('/character', {
            "role_id": uid,
            "server": checkServerRegion(uid),
        },
            {
                headers: {
                    "x-rpc-client_type": "4",
                    "x-rpc-app_version": "1.5.0",
                    "DS": generate_dynamic_secret(),
                    "Cookie": cookie,
                },
            });

        if (res.data?.retcode === 0) return res.data.data.avatars;

        if (res.data.retcode === 10101) {
            return {
                status: "Cannot get data for more than 30 accounts per cookie per day",
                code: 10101,
            }
        }

        throw new Error(res.data.retcode);

    }
}


