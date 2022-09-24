export class ClientCookieManager {

    private cookie = {
        ltoken: [] as string[],
        ltuid: [] as string[],
    }

    /**
     * @returns {number} - The amount of cookies.
     */
    amount(): number {
        return this.cookie.ltoken.length;
    }

    /**
     * @param {string} ltoken - The ltoken to set.
     * @param {string} ltuid - The ltuid to set.
     */
    public set(ltoken: string, ltuid: string): void {
        this.cookie.ltoken.push(ltoken);
        this.cookie.ltuid.push(ltuid);
    }

    /**
     * @description Get the ltoken and ltuid for request.
     * @returns {Object} - The ltoken and ltuid.
     */
    public get(): { ltoken: string, ltuid: string, key: number, cookie: string } {
        if (this.amount() === 1) {
            return {
                ltoken: this.cookie.ltoken[0] as string,
                ltuid: this.cookie.ltuid[0] as string,
                key: 0,
                cookie: `ltoken=${this.cookie.ltoken[0]};ltuid=${this.cookie.ltuid[0]};`,
            };
        }
        const randomIndex = Math.floor(Math.random() * this.amount());
        return {
            ltoken: this.cookie.ltoken[randomIndex] as string,
            ltuid: this.cookie.ltuid[randomIndex] as string,
            cookie: `ltoken=${this.cookie.ltoken[randomIndex]}; ltuid=${this.cookie.ltuid[randomIndex]}`,
            key: randomIndex,
        }
    }

    /**
     * @param key - The key to remove.
     */
    public delete(key: number): void {
        this.cookie.ltoken.splice(key, 1);
        this.cookie.ltuid.splice(key, 1);
    }

    public clear(): void {
        this.cookie.ltoken = [];
        this.cookie.ltuid = [];
    }


    public getAll(): { [key: string]: { ltoken: string, ltuid: string } } {
        const cookie = {} as { [key: string]: { ltoken: string, ltuid: string } };
        for (let i = 0; i < this.amount(); i++) {
            cookie[i] = {
                ltoken: this.cookie.ltoken[i] as string,
                ltuid: this.cookie.ltuid[i] as string,
            }
        }
        return cookie;
    }
}