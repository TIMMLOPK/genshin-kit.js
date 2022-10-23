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
  amount(): number {
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
    if (this.amount() === 0) {
      throw new Error("Please login first.");
    }

    if (this.amount() === 1) {
      if (!this.cookie.ltoken[0] || !this.cookie.ltuid[0]) {
        throw new Error("Invalid cookie");
      }
      return {
        ltoken: this.cookie.ltoken[0],
        ltuid: this.cookie.ltuid[0],
        key: 0,
        cookie: CookieFormatter(this.cookie.ltoken[0], this.cookie.ltuid[0]),
      };
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
      key: this.amount() - 1,
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
    const cookie = {} as { [key: string]: { ltoken: string; ltuid: string } };
    for (let i = 0; i < this.amount(); i++) {
      cookie[i] = {
        ltoken: this.cookie.ltoken[i] as string,
        ltuid: this.cookie.ltuid[i] as string,
      };
    }
    return cookie;
  }
}
