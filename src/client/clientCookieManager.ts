export class ClientCookieManager {
    private ltuid: string[] = [];
    private ltoken: string[] = [];

    amount(): number {
        return this.ltoken.length;
    }

    /**
     * @param {string} ltoken - The ltoken to set.
     * @param {string} ltuid - The ltuid to set.
     * 
     */
    public set(ltoken: string, ltuid: string): void {
        this.ltoken.push(ltoken);
        this.ltuid.push(ltuid);
    }

    /**
     * @description Get the ltoken and ltuid for request.
     * @returns {Object} - The ltoken and ltuid.
     */
    public get(): { ltoken: string | undefined, ltuid: string | undefined } {
        if (this.amount() === 1) {
            return {
                ltoken: this.ltoken[0],
                ltuid: this.ltuid[0],
            }
        }
        const randomIndex = Math.floor(Math.random() * this.amount());
        return {
            ltoken: this.ltoken[randomIndex],
            ltuid: this.ltuid[randomIndex],
        }
    }

    public delete(key: number): void {
        this.ltoken.splice(key, 1);
        this.ltuid.splice(key, 1);
    }

    public clear(): void {
        this.ltoken = [];
        this.ltuid = [];
    }

    public getAll(): { ltoken: string[], ltuid: string[] } {
        return {
            ltoken: this.ltoken,
            ltuid: this.ltuid,
        }
    }

}