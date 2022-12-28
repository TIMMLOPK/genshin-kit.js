import { Genshin_Redeem_Code_URL } from "../constants/constants";
import { checkServerRegion, redeemValidator, request } from "../utils";
import type { Language } from "../constants/lang";
import type { RedeemCodeData } from "../interface/RedeemCode";

export type RedeemOptions = {
  language: Language;
  cookie: string;
  uid: string;
  cookie_token: string;
};

export class RedeemCode {
  /**
   * @description Redeem the code
   * @param {string} code The code to redeem
   */
  public async redeem(code: string, options: RedeemOptions): Promise<RedeemCodeData> {
    if (!redeemValidator(code, options)) {
      throw new Error("No code or Cookie provided");
    }

    const { language, cookie, uid, cookie_token } = options;

    const instance = new request({
      route: Genshin_Redeem_Code_URL,
    });

    const ac_id = cookie
      .split(";")
      .find(item => item.includes("ltuid"))
      ?.split("=")[1];

    const res = await instance.get(
      "",
      {
        Cookie: `${cookie}; cookie_token=${cookie_token}; account_id=${ac_id}`,
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
