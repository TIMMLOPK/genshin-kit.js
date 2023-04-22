import { BaseRoute, FetchOptions, Options } from "./base";
import { API_URL } from "../constants/constants";
import { mergeOptions, RequestManager, basicValidator, removeFromObject } from "../utils";
import type { RecordCardData } from "../interface";

export class GameRecordCard extends BaseRoute<RecordCardData> {
  private readonly defaultOptions?: FetchOptions;

  constructor(options?: Options<FetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @param {string} uid HoYoLab Account ID
   */
  public async fetch(uid: string, options?: FetchOptions): Promise<RecordCardData> {
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
      route: API_URL.Genshin_HoYolab,
      language,
    });

    const res = await instance.get(
      "getGameRecordCard",
      {
        Cookie: cookie,
      },
      {
        uid: uid,
      },
    );

    const { data } = res;

    removeFromObject(data.list, ["h5_data_switches", "data_switches"]);

    const returnData = {
      list: data.list,
      currecnt: data.list[0],
    };

    this.cache.set(uid, returnData);

    return returnData;
  }
}
