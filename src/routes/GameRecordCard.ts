import { request, setLanguage } from "../utils/request";
import type { RecordCard } from "../interface";

export class GameRecordCard {
    /**
       * 
       * @param {string} language The language to set
       * @param {string} cookie The cookie to set
       * @param {string} uid Hoyolab uid
       * 
       */

    public async get(language: string, cookie: string, uid: string): Promise<RecordCard> {
        const instance = request("hoyolab");
        setLanguage(language);
        const res = await instance.get("/getGameRecordCard", {
            headers: {
                "Cookie": cookie,
            },
            params: {
                "uid": uid,
            },
        });
        if (res.data?.retcode !== 0) return res.data.data;

        throw new Error(res.data.retcode);

    }
}


