import { GameRecordCard, SpiralAbyss, GenshinUser, RealTimeNotes, Charcters } from "../index";
import { CookieFormatter } from "../utils/cookieFormatter";
import { ClientCookieManager } from "./clientCookieManager";
import type { Language } from "../constants/lang";
import type { RecordCard, AbyssBattle, GenshinUserData, RealTimeNote, CharacterData } from "../interface";


export class Client {
    private options: {
        language: Language | Language.EnglishUS;
        cookieManager?: ClientCookieManager;
    }
    private cookieManager: ClientCookieManager = new ClientCookieManager();

    /**
     * @param {ClientCookieManager} cookieManager - The cookie manager to use.
     * @param {Object} options - The options to use.
     */
    constructor(options: {
        language: Language | Language.EnglishUS;
        cookieManager?: ClientCookieManager;
    }) {
        this.options = options;
        this.cookieManager = options.cookieManager || new ClientCookieManager();
    }


    /**
     * @description Login for the client.
     * @param {object} options - The options to use.
     */
    public login(options: {
        ltuid: string;
        ltoken: string;
    }) {
        this.cookieManager.set(options.ltoken, options.ltuid);
    }

    /**
     * @param {string} uid - Genshin Impact game uid.
     */

    public async getAbyssBattle(uid: string, previous?: boolean): Promise<AbyssBattle> {
        if (!this.cookieManager.get().ltoken) throw new Error("You need to login first.");
        const cookie = this.cookieManager.get();
        const ltoken = cookie.ltoken;
        const ltuid = cookie.ltuid;
        const { language } = this.options;
        const { cookie: cookieString } = CookieFormatter(ltoken, ltuid);
        const res = new SpiralAbyss().get(uid, language, cookieString, previous);
        return res;
    }

    /**
     * @param {string} uid - HoYolab uid.
     */

    public async getGameRecordCard(uid: string): Promise<RecordCard> {
        if (!this.cookieManager.get().ltoken) throw new Error("You need to login first.");
        const cookie = this.cookieManager.get();
        const ltoken = cookie.ltoken;
        const ltuid = cookie.ltuid;
        const { language } = this.options;
        const { cookie: cookieString } = CookieFormatter(ltoken, ltuid);
        const res = new GameRecordCard().get(uid, language, cookieString);
        return res;
    }

    /**
     * @param {string} uid - Genshin Impact game uid.
     */
    public async getGenshinUser(uid: string): Promise<GenshinUserData> {
        if (!this.cookieManager.get().ltoken) throw new Error("You need to login first.");
        const cookie = this.cookieManager.get();
        const ltoken = cookie.ltoken;
        const ltuid = cookie.ltuid;
        const { language } = this.options;
        const { cookie: cookieString } = CookieFormatter(ltoken, ltuid);
        const res = new GenshinUser().get(uid, language, cookieString);
        return res;
    }

    /**
     * @param {string} uid - Genshin Impact game uid.
     */
    public async getRealTimeNotes(uid: string): Promise<RealTimeNote> {
        if (!this.cookieManager.get().ltoken) throw new Error("You need to login first.");
        const cookie = this.cookieManager.get();
        const ltoken = cookie.ltoken;
        const ltuid = cookie.ltuid;
        const { language } = this.options;
        const { cookie: cookieString } = CookieFormatter(ltoken, ltuid);
        const res = new RealTimeNotes().get(uid, language, cookieString);
        return res;
    }

    public async getCharacter(uid: string): Promise<CharacterData> {
        if (!this.cookieManager.get().ltoken) throw new Error("You need to login first.");
        const cookie = this.cookieManager.get();
        const ltoken = cookie.ltoken;
        const ltuid = cookie.ltuid;
        const { language } = this.options;
        const { cookie: cookieString } = CookieFormatter(ltoken, ltuid);
        const res = new Charcters().get(uid, language, cookieString);
        return res;
    }
}


