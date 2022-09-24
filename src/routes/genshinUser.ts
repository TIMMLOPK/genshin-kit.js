import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { GenshinUserData } from "../interface";
import { APIError } from "../utils/error";
import type { Language } from "../constants/lang";
import { ClientCache } from "../client/clientCache";

export class GenshinUser {

    readonly cache: ClientCache;

    constructor() {
        this.cache = new ClientCache();
    }
    /**
       * @param {string} uid The uid to set
       * @param {Language} language The language to set
       * @param {string} cookie The cookie to set
       */

    public async get(uid: string, language: Language, cookie: string): Promise<GenshinUserData> {
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

        if (res.retcode === 0) {
            const { data } = res;
            this.cache.set(`${uid}-genshinUser`, data);
            return data
        }
        throw new APIError(res.message, res.retcode);

    }
}


