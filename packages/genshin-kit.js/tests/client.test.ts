import { Client, ClientCookieManager } from "../dist";
import dotenv from "dotenv";

dotenv.config();

const ltuid = process.env.LTUID || "";
const ltoken = process.env.LTOKEN || "";

describe("Client", () => {
    test("Login", async () => {
        const client = new Client();
        client.login(ltuid, ltoken);
        expect(client.isLogin()).toBe(true);
    });

    test('Route', async () => {
        const client = new Client();
        client.login(ltuid, ltoken);
        if (client.isLogin()) {
            const user = await client.gameRecordCard.fetch(ltuid);
            expect(user.list[0]?.game_id).toBe(2);
        }
    });

    test("Client cache", async () => {
        const client = new Client();
        client.login(ltuid, ltoken);
        if (client.isLogin()) {
            const user = await client.gameRecordCard.fetch(ltuid);
            const expected = user.list[0]?.game_id;
            expect(expected).toBe(2);
            expect(client.gameRecordCard.cache.get(ltuid)).not.toBe(undefined);
            expect(client.gameRecordCard.cache.get(ltuid)?.list[0]?.game_id).toBe(expected);
        }
    });

    test("Client cookieManager", async () => {
        const cookieManager = new ClientCookieManager();
        expect(() => cookieManager.get()).toThrowError();

        cookieManager.setCookie(undefined!, undefined!);
        expect(() => cookieManager.get()).toThrowError();

        cookieManager.delete(1);
        expect(cookieManager.size === 0).toBe(true);

        cookieManager.setCookie(ltuid, ltoken);
        expect(cookieManager.get().ltoken).toBe(ltoken);

        cookieManager.clear();
        expect(cookieManager.size === 0).toBe(true);

        cookieManager.setCookie(ltuid, ltoken);
        expect(cookieManager.getAll().length).toBe(1);

    });
});