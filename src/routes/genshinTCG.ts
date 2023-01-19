import { BaseRoute, fetchOptions, Options } from "./base";
import { mergeOptions, request, basicValidator, checkServerRegion, cardListValidator } from "../utils";
import type { CardBackListData, CardListData, TCGData } from "../interface";

export type CardListOptions = fetchOptions & {
  need_avatar?: boolean;
  need_action?: boolean;
  need_stats?: boolean;
  offset?: number;
  limit?: number;
};

class BasicInfo extends BaseRoute<TCGData> {
  private readonly defaultOptions?: fetchOptions;

  constructor(options?: Options<fetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @param {string} uid Genshin Impact UID
   */
  public async fetch(uid: string, options?: fetchOptions): Promise<TCGData> {
    if (this.cache?.has(uid)) return this.cache.get(uid);

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

    if (this.cache) {
      this.cache.set(uid, data);
    }

    return data;
  }
}

class CardList extends BaseRoute<CardListData> {
  private readonly defaultOptions?: fetchOptions;

  constructor(options?: Options<fetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @param {string} uid Genshin Impact UID
   */
  public async fetch(uid: string, options?: CardListOptions): Promise<CardListData> {
    if (this.cache?.has(uid)) return this.cache.get(uid);
    const optionsToUse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!cardListValidator(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie, need_avatar, need_action, need_stats, offset, limit } = optionsToUse;

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
        need_avatar: need_avatar || true,
        need_action: need_action || true,
        need_stats: need_stats || true,
        offset: offset || 0,
        limit: limit || 32,
      },
    );

    const { data } = res;

    if (this.cache) {
      this.cache.set(uid, data);
    }

    return data;
  }
}

class CardBackList extends BaseRoute<CardBackListData> {
  private readonly defaultOptions?: fetchOptions;

  constructor(options?: Options<fetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @param {string} uid Genshin Impact UID
   */
  public async fetch(uid: string, options?: fetchOptions): Promise<CardBackListData> {
    if (this.cache?.has(uid)) return this.cache.get(uid);
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

    if (this.cache) {
      this.cache.set(uid, data);
    }

    return data;
  }
}

export class TCG {
  public basicInfo: BasicInfo;

  public cardList: CardList;

  public cardBackList: CardBackList;

  constructor(options?: Options<fetchOptions>) {
    this.basicInfo = new BasicInfo(options);
    this.cardList = new CardList(options);
    this.cardBackList = new CardBackList(options);
  }
}
