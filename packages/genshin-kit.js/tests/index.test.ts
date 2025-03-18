import { Activities, Charcters, Client, CookieFormatter, GameRecordCard, GenshinUser, Language, RealTimeNotes, SpiralAbyss, TravelerDiary } from '../dist';
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

test("Game Record Card removed unused keys", async () => {
    const user = new GameRecordCard();
    const result = await user.fetch(GUID, options) as any;
    expect(result.list[0]?.h5_data_switches).toBe(undefined);
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
    const charactersList = await characters.fetch(GUID, options);
    expect(charactersList[0]?.id).not.toBe(undefined);

    const avatarInfo = await characters.fetchAvatarInfo(charactersList[0]?.id as numberww, options);

    expect(avatarInfo.id === charactersList[0]?.id).toBe(true);
    expect(avatarInfo.name).not.toBe(undefined);

    const avatarDetails = await characters.fetchAvatarDetail(GUID, avatarInfo.id, options);
    expect(avatarDetails.list[0]?.base.id === avatarInfo.id).toBe(true);
    expect(avatarDetails.list[0]?.base.id).not.toBe(undefined);

});

test("GenshinUser", async () => {
    const user = new GenshinUser();
    const result = await user.fetch(GUID, options);
    expect(result.role.nickname).not.toBe(undefined);
});

test("Real-Time Notes", async () => {
    const notes = new RealTimeNotes();
    const result = await notes.fetch(GUID, options);
    expect(result.max_resin).toBe(200);
});

test("Travel Diary", async () => {
    const diary = new TravelerDiary();
    const result = await diary.fetch(GUID, options);
    expect(result.uid).toBe(parseInt(GUID));
});

test("Redeem Code", async () => {
    if (!client.isLogin()) return;
    expect(async () => await client.redeemCode.redeem("GENSHINGIFT", { ...options, uid: GUID, cookie: ltoken })).rejects.toThrow();
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

test("Role Combat", async () => {
    if (!client.isLogin()) return;

    const result = await client.roleCombat.fetch(GUID, { ...options });
    expect(result.data[result.data.length - 1]?.detail).toBeNull();

    const detailResult = await client.roleCombat.fetch(GUID, { ...options, need_detail: true });
    
    if (detailResult.data[0]?.has_detail_data) {
        expect(detailResult.data[0]?.detail).not.toBeNull();
    } else {
        expect(detailResult.data[0]?.detail).toBeNull();
    }
});
