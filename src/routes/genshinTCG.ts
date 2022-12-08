import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import { BaseRoute, fetchOptions, Options } from "./base";
import type { ClientCache } from "../client/clientCache";
import { basicValidator, cardListValidator } from "../utils/validator";
import mergeOptions from "../utils/mergeOptions";
import type { CardBackListData, CardListData, TCGData } from "../interface";

export type CardListOptions = fetchOptions & {
  need_avatar: boolean;
  need_action: boolean;
  need_stats: boolean;
  offset: number;
  limit: number;
};

export class TCG extends BaseRoute {
  public declare cache: ClientCache<TCGData | CardBackListData | CardListData> | null;

  private readonly defaultOptions?: fetchOptions;

  constructor(options?: Options<fetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  get basicInfoCache() {
    return this.cache?.setType("basicInfo") as ClientCache<TCGData>;
  }

  get cardBackListCache() {
    return this.cache?.setType("cardBackList") as ClientCache<CardBackListData>;
  }

  get cardListCache() {
    return this.cache?.setType("cardList") as ClientCache<CardListData>;
  }

  /**
   * @param {string} uid Genshin Impact UID
   */
  public async fetchBasicInfo(uid: string, options?: fetchOptions): Promise<TCGData> {
    if (this.basicInfoCache?.has(uid)) return this.basicInfoCache.get(uid);

    const optionsToUse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!basicValidator(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie } = optionsToUse;

    const instance = new request({
      withDS: true,
      withExtraHeaders: true,
      language,
    });

    const res = await instance.get(
      "gcg/basicInfo",
      {
        Cookie: cookie,
      },
      {
        server: checkServerRegion(uid),
        role_id: uid,
      },
    );

    const { data } = res;

    if (this.basicInfoCache) {
      this.basicInfoCache.set(uid, data);
    }

    return data;
  }

  /**
   * @param {string} uid Genshin Impact UID
   */
  public async fetchCardList(uid: string, options?: CardListOptions): Promise<CardListData> {
    if (this.cardListCache?.has(uid)) return this.cardListCache.get(uid);
    const optionsToUse = mergeOptions(options, this.cookieManager, this.defaultOptions) as CardListOptions;

    if (!cardListValidator(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie } = optionsToUse;

    const instance = new request({
      withDS: true,
      withExtraHeaders: true,
      language,
    });

    const res = await instance.get(
      "gcg/cardList",
      {
        Cookie: cookie,
      },
      {
        server: checkServerRegion(uid),
        role_id: uid,
        need_avatar: optionsToUse.need_avatar || true,
        need_action: optionsToUse.need_action || true,
        need_stats: optionsToUse.need_stats || true,
        offset: optionsToUse.offset || 0,
        limit: optionsToUse.limit || 32,
      },
    );

    const { data } = res;

    if (this.cardListCache) {
      this.cardListCache.set(uid, data);
    }

    return data;
  }

  /**
   * @param {string} uid Genshin Impact UID
   */
  public async fetchCardBackList(uid: string, options?: fetchOptions): Promise<CardBackListData> {
    if (this.cardBackListCache?.has(uid)) return this.cardBackListCache.get(uid);
    const optionsToUse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!basicValidator(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie } = optionsToUse;

    const instance = new request({
      withDS: true,
      withExtraHeaders: true,
      language,
    });

    const res = await instance.get(
      "gcg/cardBackList",
      {
        Cookie: cookie,
      },
      {
        server: checkServerRegion(uid),
        role_id: uid,
      },
    );

    const { data } = res;

    if (this.cardBackListCache) {
      this.cardBackListCache.set(uid, data);
    }

    return data;
  }
}
