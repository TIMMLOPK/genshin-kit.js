import { Activities, Charcters, Client, CookieFormatter, GenshinUser, Language, RealTimeNotes, SpiralAbyss, TravelerDiary } from '../dist/index';

const ltuid = "";
const ltoken = "";
let GUID = "";

test("Get GUID", async () => {
    const client = new Client();
    client.login(ltuid, ltoken);
    if (client.isLogin()) {
        const user = await client.gameRecordCard.fetch(ltuid);
        GUID = user.list[0]?.game_role_id ?? "";
        expect(GUID).not.toBe(undefined);
    }
});

test("SpiralAbyss", async () => {
    const abyss = new SpiralAbyss();
    const result = await abyss.fetch(GUID, { cookie: CookieFormatter(ltoken, ltuid), language: Language.EnglishUS });
    expect(result.end_time).not.toBe(undefined);
});

test("Activity", async () => {
    const activity = new Activities();
    const result = await activity.fetch(GUID, { cookie: CookieFormatter(ltoken, ltuid), language: Language.EnglishUS });
    expect(result.summer_v2.anchor_number).not.toBe(10);
});

test("GenshinCharacters", async () => {
    const characters = new Charcters();
    const result = await characters.fetch(GUID, { cookie: CookieFormatter(ltoken, ltuid), language: Language.EnglishUS });
    expect(result.length).not.toBe(0);

});

test("GenshinUser", async () => {
    const user = new GenshinUser();
    const result = await user.fetch(GUID, { cookie: CookieFormatter(ltoken, ltuid), language: Language.EnglishUS });
    expect(result.role.nickname).not.toBe(undefined);
});

test("Real-Time Notes", async () => {
    const notes = new RealTimeNotes();
    const result = await notes.fetch(GUID, { cookie: CookieFormatter(ltoken, ltuid), language: Language.EnglishUS });
    expect(result.max_resin).toBe(160);
});

test("Travel Diary", async () => {
    const diary = new TravelerDiary();
    const result = await diary.fetch(GUID, { cookie: CookieFormatter(ltoken, ltuid), language: Language.EnglishUS });
    expect(result.uid).toBe(parseInt(GUID));
});

test("Redeem Code", async () => {
    const client = new Client();
    client.login(ltuid, ltoken);
    if (client.isLogin()) {
        const result = await client.redeemCode.redeem("GENSHINGIFT", { cookie: CookieFormatter(ltoken, ltuid), language: Language.EnglishUS, uid: GUID, cookie_token: "" });
        expect(result.msg).not.toBe(undefined);
    }
});

test("TCG", async () => {
    const client = new Client();
    client.login(ltuid, ltoken);
    if (!client.isLogin()) return
    const result = await client.tcg.basicInfo.fetch(GUID);
    expect(result.avatar_card_num_total).toBeGreaterThan(0);
    const listResult = await client.tcg.cardList.fetch(GUID);
    if (listResult.card_list[0]?.card_type === "CardTypeAssist") {
        expect(listResult.card_list[0]?.action_cost[0]?.cost_type).not.toBeUndefined();
    }
});
