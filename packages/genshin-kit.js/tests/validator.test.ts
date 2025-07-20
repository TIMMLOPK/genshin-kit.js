import { GameRecordCard, SpiralAbyss, Charcters, GenshinUser, RoleCombat, TCG, TravelerDiary, DailyRewards } from "../dist";
import { ZodError } from "zod";
import dotenv from "dotenv";

dotenv.config();

test("Basic validator", async () => {
    const user = new GameRecordCard();
    const options = {
        cookie: 123456 as any,
    }
    await expect(user.fetch(123456 as any, options)).rejects.toThrow(ZodError);
});

test("SpiralAbyss Validator", async () => {
    const spiralAbyss = new SpiralAbyss();
    const options = {
        cookie: undefined,
        previous: "dummy" as any,
    }
    await expect(spiralAbyss.fetch(123456 as any, options)).rejects.toThrow(ZodError);
});

test("CharctersList Validator", async () => {
    const characters = new Charcters();
    const options = {
        cookie: undefined,
        weapon_type: [1] as any,
        elements: ["dummy"] as any,
        sort_type: "1" as any,
    }
    await expect(characters.fetch(123456 as any, options)).rejects.toThrow(ZodError);
});

test("CharacterDetails Validator", async () => {
    const characters = new Charcters();
    const options = {
        cookie: undefined,
    }
    await expect(characters.fetchAvatarDetail(123456 as any, "123456" as any, options)).rejects.toThrow(ZodError);
});

test("UserInfo Validator", async () => {
    const user = new GenshinUser();
    const options = {
        avatar_list_type: "1" as any,
    }
    await expect(user.fetch(123456 as any, options)).rejects.toThrow(ZodError);
});

test("RoleCombat Validator", async () => {
    const roleCombat = new RoleCombat();
    const options = {
        need_detail: "true" as any,
    }
    await expect(roleCombat.fetch(123456 as any, options)).rejects.toThrow(ZodError);
});

test("CardList Validator", async () => {
    const tcg = new TCG();
    const options = {
        cookie: undefined,
        need_avatar: "true" as any,
        need_action: "true" as any,
        need_stats: "true" as any,
        offset: "1" as any,
        limit: "1" as any,
    }
    await expect(tcg.cardList.fetch(123456 as any, options)).rejects.toThrow(ZodError);
});

test("GetMonth Validator", async () => {
    const travelerDiary = new TravelerDiary();
    const options = {
        cookie: undefined,
        month: "1" as any
    }
    await expect(travelerDiary.fetchMonth(123456 as any, options)).rejects.toThrow(ZodError);
});

test("ClaimHistory Validator", async () => {
    const dailyRewards = new DailyRewards();
    const options = {
        cookie: undefined,
        page: "1" as any,
    }
    await expect(dailyRewards.checkInHistory.fetch(options)).rejects.toThrow(ZodError);
});