import { request, urlOption } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { Diary } from "../interface";
import { APIError } from "../utils/error";
import type { Language } from "../constants/lang";
import { ClientCache } from "../client/clientCache";

export class TravelerDiary {

    readonly cache: ClientCache;

    constructor() {
        this.cache = new ClientCache();
    }
    /**
       * @param {string} uid The uid to set
       * @param {Language} language The language to set
       * @param {string} cookie The cookie to set
       */

    public async get(uid: string, language: Language, cookie: string): Promise<Diary> {
        const instance = new request({
            withDS: true,
            type: urlOption.diary
        });
        const res = await instance.get("month_info",
            {
                "Cookie": cookie,
            },
            {
                "server": checkServerRegion(uid),
                "uid": uid,
                "lang": language,
            },
        );

        if (res.retcode === 0) {
            const { data } = res;
            this.cache.set(`${uid}-diary`, data);
            return data
        }

        throw new APIError(res.message, res.retcode);
    }

    public async getMonth(uid: string, month: number, language: Language, cookie: string): Promise<Diary> {
        const instance = new request({
            withDS: true,
            type: urlOption.diary
        });
        const res = await instance.get("month_info",
            {
                "Cookie": cookie,
            },
            {
                "server": checkServerRegion(uid),
                "uid": uid,
                "lang": language,
                "month": month,
            },
        );

        if (res.retcode === 0) {
            const { data } = res;
            this.cache.set(`${uid}-${month}-diary`, data);
            return data
        }

        throw new APIError(res.message, res.retcode);
    }
}


