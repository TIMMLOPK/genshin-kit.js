import { CookieFormatter, DailyRewards, Language } from "../dist";


const ltuid = "";
const ltoken = "";

describe("Daily Rewards", () => {
    const reward = new DailyRewards();

    test("Daily reward", async () => {
        const result = await reward.checkIn({ cookie: CookieFormatter(ltoken, ltuid), language: Language.EnglishUS });
        expect(result.code).not.toBe(undefined);
    });

    test("Daily reward info", async () => {
        const result = await reward.fetchRewardInfo({ cookie: CookieFormatter(ltoken, ltuid), language: Language.EnglishUS });
        expect(result.is_sign).toBeTruthy();
    });

    test("Daily reward resign Info", async () => {
        const result = await reward.fetchExtraRewardInfo({ cookie: CookieFormatter(ltoken, ltuid), language: Language.EnglishUS });
        expect(result.login).toBeTruthy();
    });

    test("Daily reward checkIn history", async () => {
        const result = await reward.fetchCheckInHistory({ cookie: CookieFormatter(ltoken, ltuid), language: Language.EnglishUS });
        expect(result.total).not.toBe(undefined);
    });

    test("Daily reward extra reward", async () => {
        const result = await reward.fetchExtraRewardInfo({ cookie: CookieFormatter(ltoken, ltuid), language: Language.EnglishUS });
        expect(result.start_timestamp).not.toBe(undefined);
    });

    test("Daily reward day reward", async () => {
        const result = await reward.fetchDayReward(1, { cookie: CookieFormatter(ltoken, ltuid), language: Language.EnglishUS });
        expect(result.count).not.toBe(undefined);
    });

});