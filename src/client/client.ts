import { GameRecordCard, SpiralAbyss, GenshinUser, RealTimeNotes } from "../index";
import type { RecordCard, AbyssBattle, Full, RealTimeNote, APIResponse } from "../interface";
import type { Language } from "../constants/lang";
import type { ClientCookieManager } from "./clientCookieManager";


export class Client {
    private options: {
        language: Language | Language.EnglishUS;
    }
    private cookieManager: ClientCookieManager;

    /**
     * @param {ClientCookieManager} cookieManager - The cookie manager to use.
     * @param {Object} options - The options to use.
     */

    constructor(cookieManager: ClientCookieManager, options: {
        language: Language | Language.EnglishUS;
    }) {
        this.cookieManager = cookieManager;
        this.options = options;
    }

    /**
     * @param {string} uid - Genshin Impact game uid.
     */

    public async getAbyssBattle(uid: string, previous?: boolean): Promise<AbyssBattle | APIResponse> {
        const cookie = this.cookieManager.get();
        const ltoken = cookie.ltoken;
        const ltuid = cookie.ltuid;
        const { language } = this.options;
        const res = new SpiralAbyss().get(language, `ltoken=${ltoken}; ltuid=${ltuid};`, uid, previous);
        return res;
    }

    /**
     * @param {string} uid - HoYolab uid.
     */

    public async getGameRecordCard(uid: string): Promise<RecordCard> {
        const cookie = this.cookieManager.get();
        const ltoken = cookie.ltoken;
        const ltuid = cookie.ltuid;
        const { language } = this.options;
        const res = new GameRecordCard().get(language, `ltoken=${ltoken}; ltuid=${ltuid};`, uid);
        return res;
    }

    /**
     * @param {string} uid - Genshin Impact game uid.
     */
    public async getGenshinUser(uid: string): Promise<Full | APIResponse> {
        const cookie = this.cookieManager.get();
        const ltoken = cookie.ltoken;
        const ltuid = cookie.ltuid;
        const { language } = this.options;
        const res = new GenshinUser().get(language, `ltoken=${ltoken}; ltuid=${ltuid};`, uid);
        return res;
    }

    /**
     * @param {string} uid - Genshin Impact game uid.
     */
    public async getRealTimeNotes(uid: string): Promise<RealTimeNote> {
        const cookie = this.cookieManager.get();
        const ltoken = cookie.ltoken;
        const ltuid = cookie.ltuid;
        const { language } = this.options;
        const res = new RealTimeNotes().get(language, `ltoken=${ltoken}; ltuid=${ltuid};`, uid);
        return res;
    }
}


