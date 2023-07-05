import { CookieFormatter, DailyRewards, Language } from "../dist";
import dotenv from "dotenv";

dotenv.config();

const ltuid = process.env.LTUID || "";
const ltoken = process.env.LTOKEN || "";
const options = { cookie: CookieFormatter(ltoken, ltuid), language: Language.EnglishUS };

describe("Daily Rewards", () => {
    const reward = new DailyRewards();

    test("Daily reward", async () => {
        const result = await reward.checkIn(options);
        expect(result).not.toBe(undefined);
    });

    test("Daily reward info", async () => {
        const result = await reward.rewardInfo.fetch(options);
        expect(typeof result.total_sign_day).toBe("number");
    });

    test("Daily reward resign Info", async () => {
        const result = await reward.resignInfo.fetch(options);
        expect(typeof result.signed).toBe("boolean");
    });

    test("Daily reward checkIn history", async () => {
        const result = await reward.checkInHistory.fetch(options);
        expect(result.total).not.toBe(undefined);
    });

    test("Daily reward extra reward", async () => {
        const result = await reward.extraRewardInfo.fetch(options);
        expect(result.start_timestamp).not.toBe(undefined);
    });

    test("Daily reward day reward", async () => {
        const result = await reward.rewardInfo.fetchDay(1, options);
        expect(result.count).not.toBe(undefined);
    });

    test("Daily reward day reward aliased", async () => {
        const result = await reward.rewardInfo.fetchDay(1, options) as any;
        expect(result.cnt).toBe(undefined);
    });

});