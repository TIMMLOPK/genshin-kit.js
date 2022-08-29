import type { ClientCookieManager } from "./clientCookieManager";
import { getAbyssBattle } from "../api/abyssAPI";
import { getGameRecordCard } from "../api/RecordCard";
import { getFullBattle } from "../api/full";
import type { Base } from "../interface/base";
import type { AbyssBattle } from "../interface/abyss";
import type { Full } from "../interface/full";


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
     * @param {string} uid - Game uid.
     */

    public async getAbyssBattle(uid: string, previous?: boolean): Promise<AbyssBattle> {
        const ltoken = this.cookieManager.ltoken;
        const ltuid = this.cookieManager.ltuid;
        const { language } = this.options;
        const res = new getAbyssBattle().requestAPI(language, `ltoken=${ltoken}; ltuid=${ltuid};`, uid, previous);
        return res;
    }

    /**
     * @param {string} uid - Hoyolab uid.
     */

    public async getGameRecordCard(uid: string): Promise<Base> {
        const ltoken = this.cookieManager.ltoken;
        const ltuid = this.cookieManager.ltuid;
        const { language } = this.options;
        const res = new getGameRecordCard().requestAPI(language, `ltoken=${ltoken}; ltuid=${ltuid};`, uid);
        return res;
    }

    /**
     * @param {string} uid - Game uid.
     */
    public async getFullBattle(uid: string): Promise<Full> {
        const ltoken = this.cookieManager.ltoken;
        const ltuid = this.cookieManager.ltuid;
        const { language } = this.options;
        const res = new getFullBattle().requestAPI(language, `ltoken=${ltoken}; ltuid=${ltuid};`, uid);
        return res;
    }

}


