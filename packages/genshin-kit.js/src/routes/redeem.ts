import { API_URL } from "../constants/constants";
import { checkServerRegion, CookieObjToString, CookieToObj, redeemValidator, RequestManager } from "../utils";
import type { RedeemCodeData } from "../interface/RedeemCode";
import type { FetchOptions } from "./base";

export type RedeemOptions = Required<FetchOptions> & {
  uid: string;
  /**
   * @description The cookie token to set.
   * Examples: `cookie_token=123456789;` or `cookie_token_v2=123456789;`
   */
  cookie_token: string;
};

export class RedeemCode {
  /**
   * @description Redeem the code
   * @param {string} code The code to redeem
   */
  public async redeem(code: string, options: RedeemOptions) {
    const optionsToUse = {
      ...options,
      language: options.language ?? "en-us",
      cookie: CookieObjToString(options.cookie),
    };

    if (!redeemValidator(code, optionsToUse)) {
      throw new Error("No code or Cookie provided");
    }

    const { language, cookie, uid, cookie_token } = optionsToUse;
    const cookieObj = CookieToObj(cookie ?? "");
    const ac_id = cookieObj.ltuid ?? cookieObj.ltuid_v2;
    const version = cookieObj.ltuid_v2 ? 2 : 1;

    if (!ac_id) {
      throw new Error("No ltuid or ltuid_v2 provided");
    }

    const redeemCookie =
      version === 2
        ? `cookie_token_v2=${cookie_token}; account_id_v2=${ac_id};`
        : `cookie_token=${cookie_token}; account_id=${ac_id};`;

    const instance = new RequestManager({
      route: API_URL.Genshin_Redeem_Code,
    });

    const res = await instance.get<RedeemCodeData>(
      "",
      {
        Cookie: `${cookie} ${redeemCookie}`,
      },
      {
        uid: uid,
        region: checkServerRegion(uid),
        lang: language,
        cdkey: code,
        game_biz: "hk4e_global",
      },
    );

    const { data } = res;

    const isSuccessful = data.msg === "Redeemed successfully!";

    return {
      success: isSuccessful,
      msg: data.msg,
      special_shipping: data.special_shipping,
    };
  }
}
