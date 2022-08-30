import { request, setLanguage } from "../utils/request";
import generate_dynamic_secret from "../utils/generate_ds";
import type { Full } from "../interface/genshinUserAPI";

export class GenshinUser {
    /**
       * 
       * @param {string} language The language to set
       * @param {string} cookie The cookie to set
       * @param {string} uid The uid to set
       * 
       */

    public async requestAPI(language: string, cookie: string, uid: string): Promise<Full> {
        const instance = request();
        setLanguage(language);
        const res = await instance.get("/index", {
            headers: {
                "x-rpc-client_type": "4",
                "x-rpc-app_version": "1.5.0",
                "DS": generate_dynamic_secret(),
                "Cookie": cookie,
            },
            params: {
                "server": "os_asia",
                "role_id": uid,
            },
        });

        if (res.data?.retcode === 0) return res.data.data;

        throw new Error(res.data.retcode);

    }
}


