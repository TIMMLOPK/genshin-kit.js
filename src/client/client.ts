import type { ClientCookieManager } from "./clientCookieManager";
import { getAbyssBattle } from "../api/abyssAPI";


export class Client {
    options: {
        language: string;
        retry: boolean;
    }
    cookieManager: ClientCookieManager;
    /**
     * @param {ClientCookieManager} cookieManager - The cookie manager to use.
     * @param {Object} options - The options to use.
     */

    constructor(cookieManager: ClientCookieManager, options: {
        language: string;
        retry: boolean;
    }) {
        this.cookieManager = cookieManager;
        this.options = options;
    }

    public async getAbyssBattle(uid: string): Promise<any> {
        const ltoken = this.cookieManager.ltoken;
        const ltuid = this.cookieManager.ltuid;
        const { language } = this.options;
        const res = new getAbyssBattle().requestAPI(language, `ltoken=${ltoken}; ltuid=${ltuid};`, uid);
        return res;
    }
}


