import { Activities, Charcters, Client, CookieFormatter, GenshinUser, Language, RealTimeNotes, SpiralAbyss, TravelerDiary } from '../../../dist';
import dotenv from "dotenv";

dotenv.config();

const ltuid = process.env.LTUID || "";
const ltoken = process.env.LTOKEN || "";
let GUID = "";
const client = new Client();
const options = { cookie: CookieFormatter(ltoken, ltuid), language: Language.EnglishUS };

test("Get GUID", async () => {
    client.login(ltuid, ltoken);
    if (client.isLogin()) {
        const user = await client.gameRecordCard.fetch(ltuid);
        GUID = user.list[0]?.game_role_id ?? "";
        expect(GUID).not.toBe(undefined);
    }
});

test("SpiralAbyss", async () => {
    const abyss = new SpiralAbyss();
    const result = await abyss.fetch(GUID, options);
    expect(result.end_time).not.toBe(undefined);
});

test("Activity", async () => {
    const activity = new Activities();
    const result = await activity.fetch(GUID, options);
    expect(result.summer_v2.anchor_number).not.toBe(10);
});

test("GenshinCharacters", async () => {
    const characters = new Charcters();
    const result = await characters.fetch(GUID, options);
    expect(result[0]).not.toBe(0);

});

test("GenshinUser", async () => {
    const user = new GenshinUser();
    const result = await user.fetch(GUID, options);
    expect(result.role.nickname).not.toBe(undefined);
});

test("Real-Time Notes", async () => {
    const notes = new RealTimeNotes();
    const result = await notes.fetch(GUID, options);
    expect(result.max_resin).toBe(160);
});

test("Travel Diary", async () => {
    const diary = new TravelerDiary();
    const result = await diary.fetch(GUID, options);
    expect(result.uid).toBe(parseInt(GUID));
});

test("Redeem Code", async () => {
    if (!client.isLogin()) return;
    const result = await client.redeemCode.redeem("GENSHINGIFT", { ...options, uid: GUID, cookie_token: ltoken });
    expect(result.msg).not.toBe(undefined);
});

test("TCG", async () => {
    if (!client.isLogin()) return;
    const result = await client.tcg.basicInfo.fetch(GUID);
    expect(result.avatar_card_num_total).toBeGreaterThan(0);

    const listResult = await client.tcg.cardList.fetch(GUID);
    if (listResult.card_list[0]?.card_type === "CardTypeAssist") {
        expect(listResult.card_list[0]?.action_cost[0]?.cost_type).not.toBeUndefined();
    }
});
