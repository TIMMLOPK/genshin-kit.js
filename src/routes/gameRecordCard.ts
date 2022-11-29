import { request } from "../utils/request";
import type { RecordCardData } from "../interface";
import { BaseRoute, fetchOptions, Options } from "./base";
import { Genshin_Hoyolab_API_URL } from "../constants/constants";
import { removeFromArrayObject } from "../utils/alias";
import type { ClientCache } from "../client/clientCache";
import { basicValidator } from "../utils/validator";
import mergeOptions from "../utils/mergeOptions";

export class GameRecordCard extends BaseRoute {
  public declare cache: ClientCache<RecordCardData> | null;

  private readonly defaultOptions?: fetchOptions;

  constructor(options?: Options<fetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @param {string} uid HoYoLab Account ID
   */
  public async fetch(
    uid: string,
    options?: fetchOptions
  ): Promise<RecordCardData> {
    if (this.cache?.has(uid)) return this.cache.get(uid);

    const optionsToUse = mergeOptions(
      options,
      this.cookieManager,
      this.defaultOptions
    );

    if (!basicValidator(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie } = optionsToUse;

    const instance = new request({
      route: Genshin_Hoyolab_API_URL,
    });

    instance.setLanguage(language);

    const res = await instance.get(
      "getGameRecordCard",
      {
        Cookie: cookie,
      },
      {
        uid: uid,
      }
    );

    const { data } = res;

    removeFromArrayObject(data.list, ["h5_data_switches", "data_switches"]);

    const returnData = {
      list: data.list,
      currecnt: data.list[0],
    };

    if (this.cache) {
      this.cache.set(uid, returnData);
    }

    return returnData;
  }
}
