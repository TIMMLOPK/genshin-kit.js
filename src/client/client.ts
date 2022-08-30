import type { ClientCookieManager } from "./clientCookieManager";
import { SpiralAbyss } from "../api/genshinAbyss";
import { RecordCard } from "../api/RecordCard";
import { GenshinUser } from "../api/genshinUser";
import type { Base } from "../interface/recordCardAPI";
import type { AbyssBattle } from "../interface/genshinAbyssAPI";
import type { Full } from "../interface/genshinUserAPI";


export class Client {
    options: {
        language: string | 'en';
        retry: boolean | false;
    }
    cookieManager: ClientCookieManager;
    
    /**
     * @param {ClientCookieManager} cookieManager - The cookie manager to use.
     * @param {Object} options - The options to use.
     */

    constructor(cookieManager: ClientCookieManager, options: {
        language: string | 'en';
        retry: boolean | false;
    }) {
        this.cookieManager = cookieManager;
        this.options = options;
    }

    /**
     * @param {string} uid - Genshin Impact game uid.
     */

    public async getAbyssBattle(uid: string, previous?: boolean): Promise<AbyssBattle> {
        const ltoken = this.cookieManager.ltoken;
        const ltuid = this.cookieManager.ltuid;
        const { language } = this.options
        const res = new SpiralAbyss().requestAPI(language, `ltoken=${ltoken}; ltuid=${ltuid};`, uid, previous);
        return res;
    }

    /**
     * @param {string} uid - HoYolab uid.
     */

    public async getGameRecordCard(uid: string): Promise<Base> {
        const ltoken = this.cookieManager.ltoken;
        const ltuid = this.cookieManager.ltuid;
        const { language } = this.options;
        const res = new RecordCard().requestAPI(language, `ltoken=${ltoken}; ltuid=${ltuid};`, uid);
        return res;
    }

    /**
     * @param {string} uid - Genshin Impact game uid.
     */
    public async getFullBattle(uid: string): Promise<Full> {
        const ltoken = this.cookieManager.ltoken;
        const ltuid = this.cookieManager.ltuid;
        const { language } = this.options;
        const res = new GenshinUser().requestAPI(language, `ltoken=${ltoken}; ltuid=${ltuid};`, uid);
        return res;
    }

}


