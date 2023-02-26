import { BaseRoute, fetchOptions, Options } from "./base";
import { API_URL } from "../constants/constants";
import { basicValidator, getMonthValidator, mergeOptions, RequestManager, checkServerRegion } from "../utils";
import type { DiaryData } from "../interface";

export type getMonthDiaryOptions = fetchOptions & {
  month: number;
};

export class TravelerDiary extends BaseRoute<DiaryData> {
  private readonly defaultOptions?: fetchOptions;

  constructor(options?: Options<fetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @param {string} uid Genshin Impact UID
   */
  public async fetch(uid: string, options: fetchOptions): Promise<DiaryData> {
    if (this.cache?.has(uid)) return this.cache.get(uid);

    const optionsToUse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!basicValidator(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie } = optionsToUse;

    const instance = new RequestManager({
      route: API_URL.Genshin_Hoyolab_Diary,
    });
    const res = await instance.get(
      "month_info",
      {
        Cookie: cookie,
      },
      {
        region: checkServerRegion(uid),
        uid: uid,
        lang: language,
      },
    );

    const { data } = res;

    if (this.cache) {
      this.cache.set(uid, data);
    }
    return data;
  }

  public async fetchMonth(uid: string, options: getMonthDiaryOptions): Promise<DiaryData> {
    const optionsToUse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!getMonthValidator(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie, month } = optionsToUse;

    const instance = new RequestManager({
      route: API_URL.Genshin_Hoyolab_Diary,
    });

    const res = await instance.get(
      "month_info",
      {
        Cookie: cookie,
      },
      {
        region: checkServerRegion(uid),
        uid: uid,
        lang: language,
        month: month,
      },
    );

    const { data } = res;

    if (this.cache) {
      this.cache.set(`${uid}-${month}`, data);
    }

    return data;
  }
}
