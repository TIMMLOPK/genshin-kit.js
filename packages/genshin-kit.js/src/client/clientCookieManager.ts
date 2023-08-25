import { CookieFormatter } from "../utils/cookie";
import { dynamic } from "../utils/import";

interface cookie {
  ltuid: string;
  ltoken: string;
  key: number;
  cookie: string;
}

type CookieStore = Pick<cookie, "ltoken" | "ltuid"> & { cookie_token?: string };

export class ClientCookieManager {
  private cookie: CookieStore[];

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
   * @returns {cookie} - The ltoken and ltuid.
   */
  public get(): cookie {
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
    this.cookie.splice(key - 1, 1);
  }

  public clear(): void {
    this.cookie = [];
  }

  public getAll(): cookie[] {
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

  public async getBrowserCookie(customProfile: string): Promise<CookieStore> {
    try {
      await dynamic("chrome-cookies-secure");
    } catch (e) {
      throw new Error("Please install chrome-cookies-secure");
    }
    const chrome = await dynamic("chrome-cookies-secure");
    const cookie = await chrome.getCookiesPromised("https://www.hoyolab.com/", "chrome", `${customProfile}`);

    let ltoken, ltuid, cookie_token;
    for (const key in cookie) {
      if (key === "ltoken" || key === "ltoken_v2") {
        ltoken = cookie[key];
      }
      if (key === "ltuid" || key === "ltuid_v2") {
        ltuid = cookie[key];
      }
      if (key === "cookie_token" || key === "cookie_token_v2") {
        cookie_token = cookie[key];
      }
      if (ltoken && ltuid && cookie_token) {
        break;
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
