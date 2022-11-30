import { CookieFormatter } from "../utils/cookieFormatter";
import { dynamic } from "../utils/import";

interface getCookie {
  ltuid: string;
  ltoken: string;
  key: number;
  cookie: string;
}

interface cookieStore {
  ltuid: string;
  ltoken: string;
  cookie_token?: string;
}

export class ClientCookieManager {
  private cookie: cookieStore[];

  constructor() {
    this.cookie = [];
  }

  /**
   * @returns {number} - The amount of cookies.
   */
  public get size(): number {
    return this.cookie.length;
  }

  public setCookie(ltuid: string, ltoken: string): void {
    this.cookie.push({ ltoken: ltoken, ltuid: ltuid });
  }

  /**
   * @description Get the ltoken and ltuid for request.
   * @returns {getCookie} - The ltoken and ltuid.
   */
  public get(): getCookie {
    if (this.size === 0) {
      throw new Error("Please login first.");
    }

    const ltoken = this.cookie[0]?.ltoken;
    const ltuid = this.cookie[0]?.ltuid;

    if (!ltoken || !ltuid) {
      throw new Error("Invalid cookie");
    }

    this.cookie.splice(0, 1);
    this.cookie.push({ ltoken: ltoken, ltuid: ltuid });

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
    this.cookie.splice(key, 1);
  }

  public clear(): void {
    this.cookie = [];
  }

  public getAll(): getCookie[] {
    const cookie = [];

    for (let i = 0; i < this.size; i++) {
      cookie[i] = {
        ltoken: this.cookie[i]?.ltoken || "",
        ltuid: this.cookie[i]?.ltuid || "",
        key: i,
        cookie: CookieFormatter(this.cookie[i]?.ltoken || "", this.cookie[i]?.ltuid || ""),
      };
    }

    return cookie;
  }

  public async getBrowserCookie(customProfile: string): Promise<cookieStore> {
    try {
      await dynamic("chrome-cookies-secure");
    } catch (e) {
      throw new Error("Please install chrome-cookies-secure");
    }
    const chrome = await dynamic("chrome-cookies-secure");
    const cookie = await chrome.getCookiesPromised("https://www.hoyolab.com/", "chrome", `${customProfile}`);

    let ltoken, ltuid, cookie_token;
    for (const key in cookie) {
      if (key === "ltoken") {
        ltoken = cookie[key];
      }
      if (key === "ltuid") {
        ltuid = cookie[key];
      }
      if (key === "cookie_token") {
        cookie_token = cookie[key];
      }
    }

    if (!ltoken || !ltuid || !cookie_token) {
      throw new Error("Invalid cookie");
    }

    this.setCookie(ltuid, ltoken);

    return {
      ltoken,
      ltuid,
      cookie_token,
    };
  }
}
