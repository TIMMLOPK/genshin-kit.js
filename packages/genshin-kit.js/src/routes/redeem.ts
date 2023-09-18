import { API_URL } from "../constants/constants";
import { checkServerRegion, CookieObjToString, CookieToObj, redeemValidator, RequestManager } from "../utils";
import type { RedeemCodeData } from "../interface/RedeemCode";
import { Language } from "../constants/lang";

export interface RedeemOptions {
  uid: string;
    /**
   * @description The cookie token to set.
   * Examples: `cookie_token=123456789; account_id=123456789;` or `cookie_token_v2=123456789; account_id_v2=123456789;`
   * 
   */
  cookie: string | Record<string, string>;
  language?: Language;
};

export class RedeemCode {
  /**
   * @description Redeem the code
   * @param {string} code The code to redeem
   */
  public async redeem(code: string, options: RedeemOptions) {
    if (!redeemValidator(code, options)) {
      throw new Error("No code or Cookie provided");
    }

    const { language, uid, cookie } = options;
    const cookieObj = CookieToObj(CookieObjToString(cookie) ?? "");
    const version = cookieObj.cookie_token_v2 ? 2 : 1;

    const redeemCookie =
      version === 2
        ? `cookie_token_v2=${cookieObj.cookie_token_v2}; account_id_v2=${cookieObj.account_id_v2};`
        : `cookie_token=${cookieObj.cookie_token}; account_id=${cookieObj.account_id};`;

    const instance = new RequestManager({
      route: API_URL.Genshin_Redeem_Code,
    });

    const res = await instance.get<RedeemCodeData>(
      "",
      {
        Cookie: redeemCookie,
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
