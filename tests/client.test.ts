import { Client } from "../dist";

const ltuid = "";
const ltoken = "";


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
        const client = new Client({ cache: true });
        client.login(ltuid, ltoken);
        if (client.isLogin()) {
            const user = await client.gameRecordCard.fetch(ltuid);
            const expected = user.list[0]?.game_id;
            expect(expected).toBe(2);
            expect(client.gameRecordCard.cache?.get(ltuid)).not.toBe(undefined);
            expect(client.gameRecordCard.cache?.get(ltuid).list[0]?.game_id).toBe(expected);
        }
    });
});