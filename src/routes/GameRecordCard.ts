import { optionType, request, setLanguage } from "../utils/request";
import type { RecordCard } from "../interface";
import { APIError } from "../utils/error";

export class GameRecordCard {
    /**
       * 
       * @param {string} language The language to set
       * @param {string} cookie The cookie to set
       * @param {string} uid Hoyolab uid
       * 
       */

    public async get(uid: string, language: string, cookie: string): Promise<RecordCard> {
        const instance = request({
            type: optionType.hoyolab,
        });
        setLanguage(language);
        const res = await instance.get("/getGameRecordCard", {
            headers: {
                "Cookie": cookie,
            },
            params: {
                "uid": uid,
            },
        });
        if (res.data?.retcode === 0) {
            const { data } = res.data;
            return {
                list: data,
                currecnt: data.list[0],
            }
        }

        throw new APIError(res.data.message, res.data.retcode);
    }
}


