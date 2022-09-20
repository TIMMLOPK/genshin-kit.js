export class ClientCookieManager {

    private cookie = {
        vaild: {
            ltuid: [] as string[],
            ltoken: [] as string[],
        },
        invalid: {
            timeOut: 0,
            ltuid: [] as string[],
            ltoken: [] as string[],
        },
    }


    /**
     * 
     * @returns {number} - The amount of cookies.
     */
    amount(): number {
        return this.cookie.vaild.ltoken.length;
    }

    /**
     * @param {string} ltoken - The ltoken to set.
     * @param {string} ltuid - The ltuid to set.
     * 
     */
    public set(ltoken: string, ltuid: string): void {
        this.cookie.vaild.ltoken.push(ltoken);
        this.cookie.vaild.ltuid.push(ltuid);
    }

    /**
     * @description Get the ltoken and ltuid for request.
     * @returns {Object} - The ltoken and ltuid.
     */
    public get(): { ltoken: string, ltuid: string, key: number } {
        if (this.amount() === 1) {
            return {
                ltoken: this.cookie.vaild.ltoken[0] as string,
                ltuid: this.cookie.vaild.ltuid[0] as string,
                key: 0,
            };
        }
        const randomIndex = Math.floor(Math.random() * this.amount());
        return {
            ltoken: this.cookie.vaild.ltoken[randomIndex] as string,
            ltuid: this.cookie.vaild.ltuid[randomIndex] as string,
            key: randomIndex,
        }
    }

    /**
     * 
     * @param key - The key to remove.
     */
    public delete(key: number): void {
        this.cookie.vaild.ltoken.splice(key, 1);
        this.cookie.vaild.ltuid.splice(key, 1);
    }

    public clear(): void {
        this.cookie.vaild.ltoken = [];
        this.cookie.vaild.ltuid = [];
    }

    public getAll(): { ltoken: string[], ltuid: string[] } {
        return {
            ltoken: this.cookie.vaild.ltoken,
            ltuid: this.cookie.vaild.ltuid,
        }
    }
}