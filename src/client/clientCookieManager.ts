

export class ClientCookieManager {
    ltoken: string | undefined;
    ltuid: string | undefined;
    /**
     * @param {string} ltoken - The ltoken to set.
     * @param {string} ltuid - The ltuid to set.
     */
    public setCookie(ltoken: string, ltuid: string) {
        this.ltoken = ltoken;
        this.ltuid = ltuid;
        return {
            ltoken: ltoken,
            ltuid: ltuid,
        }
    }
}