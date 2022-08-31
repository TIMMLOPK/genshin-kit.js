import { request, setLanguage } from "../utils/request";
import type { DayReward } from "../interface/rewardsAPI";
import type { APIResponse } from "../interface/ResponseAPI";

export class DailyRewards {
    /**
       * 
       * @description Get the daily rewards details
       * @param {string} language The language to set
       * @param {string} cookie The cookie to set
       * @param {string | number} day get the day's rewards
       * 
       */

    public async getDayReward(language: string, cookie: string, day?: string | number): Promise<DayReward> {
        const instance = request("dailyrewards");
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

        const todayDate = new Date().toLocaleDateString("en-US", {
            timeZone: "Asia/Hong_Kong",
        });

        let queryDay = Number(day);

        if (typeof day === "string") {
            queryDay = parseInt(day, 10);
        }

        if (!queryDay) {
            queryDay = new Date(todayDate).getDate();
        }

        if (res.data?.retcode === 0) {
            const { data } = res;
            return data.data.awards[queryDay - 1];
        }

        throw new Error(res.data.retcode);
    }

    /**
     * 
     * @description Claim the daily rewards
     * @param {string} language The language to set
     * @param {string} cookie The cookie to set
     */

    public async claimDailyReward(language: string, cookie: string): Promise<APIResponse> {
        const instance = request("dailyrewards");
        const res = await instance.post("/sign", {
            "act_id": "e202102251931481",
        },
            {
                headers: {
                    "Cookie": cookie,
                    "Content-Type": "application/json",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
                },
                params: {
                    "lang": language,
                },
            });

        if (res.data?.retcode === -100) {
            return {
                status: "Invalid cookie",
            }
        }

        if (res.data?.retcode === -5003) {
            return {
                status: "Already claimed",
            }
        }

        if (res.data?.data.code === "ok" && res.data?.data.retcode === 0) {
            console
            return {
                status: "success",
            }
        }

        throw new Error(res.data.retcode);
    }

}
