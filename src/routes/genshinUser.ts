import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { Full, APIResponse } from "../interface";
import { APIError } from "../utils/error";
import type { Language } from "../constants/lang";

export class GenshinUser {
    /**
       * @param {string} uid The uid to set
       * @param {Language} language The language to set
       * @param {string} cookie The cookie to set
       */

    public async get(uid: string, language: Language, cookie: string): Promise<Full | APIResponse> {
        const instance = new request({
            withDS: true,
        });
        instance.setLanguage(language);
        const res = await instance.get("index",
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

        if (res.retcode === 0) return res.data;

        throw new APIError(res.message, res.retcode);

    }
}


