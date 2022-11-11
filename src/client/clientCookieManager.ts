import { CookieFormatter } from "../utils/cookieFormatter";

interface getCookie {
  ltuid: string;
  ltoken: string;
  key: number;
  cookie: string;
}

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
   * @returns {getCookie} - The ltoken and ltuid.
   */
  public get(): getCookie {
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

  public getAll(): getCookie[] {
    const cookie = [];

    for (let i = 0; i < this.size; i++) {
      cookie[i] = {
        ltoken: this.cookie.ltoken[i] || "",
        ltuid: this.cookie.ltuid[i] || "",
        key: i,
        cookie: CookieFormatter(
          this.cookie.ltoken[i] || "",
          this.cookie.ltuid[i] || ""
        ),
      };
    }

    return cookie;
  }
}
