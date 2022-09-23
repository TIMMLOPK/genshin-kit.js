import { urlOption, request } from "../utils/request";
import type { APIResponse, DayReward } from "../interface"
import { APIError } from "../utils/error";
import type { Language } from "../constants/lang";

export class DailyRewards {
    /**
       * @description Get the daily rewards details
       * @param {string} cookie The cookie to set
       * @param {Language} language The language to set
       * @param {number} day get the day's rewards
       */

    public async getDayReward(day: number, language: Language, cookie: string): Promise<DayReward> {
        const instance = new request({
            type: urlOption.dailyrewards,
        });

        instance.setLanguage(language);
        const res = await instance.get("home",
            {
                "Cookie": cookie,
            },
            {
                "lang": language,
                "act_id": "e202102251931481",
            },
        );

        if (res.retcode === 0) {
            const { data } = res;
            return data.awards[day - 1];
        }

        throw new APIError(res.message, res.retcode);
    }

    /**
     * 
     * @description Claim the daily rewards
     * @param {Language} language The language to set
     * @param {string} cookie The cookie to set
     */

    public async claim(language: Language, cookie: string): Promise<APIResponse> {
        const instance = new request({
            type: urlOption.dailyrewards,
            withUA: true,
        });
        const res = await instance.post("sign",
            {
                "Cookie": cookie,
                "Content-Type": "application/json",
            },
            {
                "act_id": "e202102251931481",
            },
            {
                "lang": language,
            },
        );

        if (res.retcode === -5003) {
            return {
                status: "Already claimed",
                code: -5003,
            }
        }

        if (res.data.code === "ok" && res.retcode === 0) {
            return {
                status: "success",
                code: 0,
            }
        }

        throw new APIError(res.message, res.retcode);
    }

}
