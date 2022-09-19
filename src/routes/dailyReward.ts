import { optionType, request, setLanguage } from "../utils/request";
import type { APIResponse, DayReward } from "../interface"
import { APIError } from "../utils/error";

export class DailyRewards {
    /**
       * 
       * @description Get the daily rewards details
       * @param {string} cookie The cookie to set
       * @param {string} language The language to set
       * @param {number} day get the day's rewards
       * 
       */

    public async getDayReward(day: number, language: string, cookie: string): Promise<DayReward> {
        const instance = request({
            type: optionType.dailyrewards,
        });
        setLanguage(language);
        const res = await instance.get("/home", {
            headers: {
                "Cookie": cookie,
            },
            params: {
                "lang": language,
                "act_id": "e202102251931481",
            },
        });

        if (res.data?.retcode === 0) {
            const { data } = res;
            return data.data.awards[day - 1];
        }

        throw new APIError(res.data.message, res.data.retcode);
    }

    /**
     * 
     * @description Claim the daily rewards
     * @param {string} language The language to set
     * @param {string} cookie The cookie to set
     */

    public async claim(language: string, cookie: string): Promise<APIResponse> {
        const instance = request({
            type: optionType.dailyrewards,
            withUA: true,
        });
        const res = await instance.post("/sign", {
            "act_id": "e202102251931481",
        },
            {
                headers: {
                    "Cookie": cookie,
                    "Content-Type": "application/json",
                },
                params: {
                    "lang": language,
                },
            });

        if (res.data?.retcode === -100) {
            return {
                status: "Invalid cookie",
                code: -100,
            }
        }

        if (res.data?.retcode === -5003) {
            return {
                status: "Already claimed",
                code: -5003,
            }
        }

        if (res.data?.data.code === "ok" && res.data?.retcode === 0) {
            return {
                status: "success",
                code: 0,
            }
        }

        throw new APIError(res.data.message, res.data.retcode);
    }

}
