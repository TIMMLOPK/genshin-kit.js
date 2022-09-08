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
    public get(): { ltoken?: string, ltuid?: string, key: number } {
        if (this.amount() === 1) {
            return {
                ltoken: this.cookie.vaild.ltoken[0],
                ltuid: this.cookie.vaild.ltuid[0],
                key: 0,
            }
        }
        const randomIndex = Math.floor(Math.random() * this.amount());
        return {
            ltoken: this.cookie.vaild.ltoken[randomIndex],
            ltuid: this.cookie.vaild.ltuid[randomIndex],
            key: randomIndex,
        }
    }

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

    public mark(key: number): void {
        this.cookie.invalid.ltoken.push(this.cookie.vaild.ltoken[key] as string);
        this.cookie.invalid.ltuid.push(this.cookie.vaild.ltuid[key] as string);
    }
}