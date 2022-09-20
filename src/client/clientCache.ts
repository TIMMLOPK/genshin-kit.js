export class ClientCache {
    /**
     * @description Cache the API response
     */
    private cache: { [key: string]: any } = {};

    public get(key: string | number): any {
        const C = this.cache[key];
        this.delete(key);
        return C;
    }

    public set(key: string | number, value: any): void {
        this.cache[key] = value;
    }

    public has(key: string | number): boolean {
        return this.cache[key] !== undefined;
    }

    public delete(key: string | number): void {
        delete this.cache[key];
    }

}