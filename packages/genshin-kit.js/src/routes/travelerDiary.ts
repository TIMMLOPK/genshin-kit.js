import { BaseRoute, FetchOptions, Options } from "./base";
import { API_URL } from "../constants/constants";
import { basicValidator, getMonthValidator, mergeOptions, RequestManager, checkServerRegion } from "../utils";
import type { DiaryData } from "../interface";

export type MonthDiaryOptions = FetchOptions & {
  month: number;
};

export class TravelerDiary extends BaseRoute<DiaryData> {
  private readonly defaultOptions?: FetchOptions;

  constructor(options?: Options) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @param {string} uid Genshin Impact UID
   */
  public async fetch(uid: string, options?: FetchOptions) {
    if (this.cache.has(uid)) return this.cache.get(uid);

    const optionsToUse = mergeOptions({
      options,
      cookieManager: this.cookieManager,
      defaultOptions: this.defaultOptions,
    });

    if (!basicValidator(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie } = optionsToUse;

    const instance = new RequestManager({
      route: API_URL.Genshin_HoYolab_Diary,
    });
    const res = await instance.get<DiaryData>(
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

    this.cache.set(uid, data);

    return data;
  }

  public async fetchMonth(uid: string, options: MonthDiaryOptions) {
    const optionsToUse = mergeOptions(
      {
        options,
        cookieManager: this.cookieManager,
        defaultOptions: this.defaultOptions,
      },
      "MonthDiaryOptions",
    );

    if (!getMonthValidator(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie, month } = optionsToUse;

    const instance = new RequestManager({
      route: API_URL.Genshin_HoYolab_Diary,
    });

    const res = await instance.get<DiaryData>(
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
