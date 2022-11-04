import { CookieFormatter } from "../utils/cookieFormatter";

export class ClientCookieManager {
  private cookie: {
    ltoken: string[];
    ltuid: string[];
  };

  constructor() {
    this.cookie = {
      ltoken: [],
      ltuid: [],
    };
  }

  /**
   * @returns {number} - The amount of cookies.
   */
  public get size(): number {
    if (this.cookie.ltoken.length !== this.cookie.ltuid.length) {
      throw new Error("Invalid cookie");
    }
    return this.cookie.ltoken.length;
  }

  public setltoken(ltoken: string): void {
    this.cookie.ltoken.push(ltoken);
  }

  public setltuid(ltuid: string): void {
    this.cookie.ltuid.push(ltuid);
  }

  /**
   * @description Get the ltoken and ltuid for request.
   * @returns {Object} - The ltoken and ltuid.
   */
  public get(): { ltoken: string; ltuid: string; key: number; cookie: string } {
    if (this.size === 0) {
      throw new Error("Please login first.");
    }

    const ltoken = this.cookie.ltoken[0];
    const ltuid = this.cookie.ltuid[0];

    if (!ltoken || !ltuid) {
      throw new Error("Invalid cookie");
    }

    this.cookie.ltoken.splice(0, 1);
    this.cookie.ltuid.splice(0, 1);

    this.cookie.ltoken.push(ltoken);
    this.cookie.ltuid.push(ltuid);

    return {
      ltoken: ltoken,
      ltuid: ltuid,
      key: this.size - 1,
      cookie: CookieFormatter(ltoken, ltuid),
    };
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

  public getAll(): { [key: string]: { ltoken: string; ltuid: string } } {
    const cookie: { [key: string]: { ltoken: string; ltuid: string } } = {};
    for (const key in this.cookie) {
      const K = parseInt(key);
      cookie[key] = {
        ltoken: this.cookie.ltoken[K] || "",
        ltuid: this.cookie.ltuid[K] || "",
      };
    }
    return cookie;
  }
}
