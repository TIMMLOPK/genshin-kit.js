import { BaseRoute, FetchOptions, Options } from "./base";
import { mergeOptions, RequestManager, basicValidator, checkServerRegion, cardListValidator, alias } from "../utils";
import type { CardBackListData, CardListData, TCGData, TCGGameRecordData } from "../interface";

export type CardListOptions = FetchOptions &
  Partial<{
    need_avatar: boolean;
    need_action: boolean;
    need_stats: boolean;
    offset: number;
    limit: number;
  }>;

class BasicInfo extends BaseRoute<TCGData> {
  private readonly defaultOptions?: FetchOptions;

  constructor(options?: Options<FetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @param {string} uid Genshin Impact UID
   */
  public async fetch(uid: string, options?: FetchOptions): Promise<TCGData> {
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


    alias(data, {
      win_cnt: "win_count",
    });

    this.cache.set(uid, data);

    return data;
  }
}

class CardList extends BaseRoute<CardListData> {
  private readonly defaultOptions?: FetchOptions;

  constructor(options?: Options<FetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @param {string} uid Genshin Impact UID
   */
  public async fetch(uid: string, options?: CardListOptions) {
    if (this.cache.has(uid)) return this.cache.get(uid);
    const optionsToUse = mergeOptions(
      {
        options,
        cookieManager: this.cookieManager,
        defaultOptions: this.defaultOptions,
      },
      "CardListOptions",
    );

    if (!cardListValidator(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie, need_avatar, need_action, need_stats, offset, limit } = optionsToUse;

    const instance = new RequestManager({
      withDS: true,
      withExtraHeaders: true,
      language,
    });

    const res = await instance.get<CardListData>(
      "gcg/cardList",
      {
        Cookie: cookie,
      },
      {
        server: checkServerRegion(uid),
        role_id: uid,
        need_avatar: need_avatar ?? true,
        need_action: need_action ?? true,
        need_stats: need_stats ?? true,
        offset: offset ?? 0,
        limit: limit ?? 32,
      },
    );

    const { data } = res;

    this.cache.set(uid, data);

    return data;
  }
}

class CardBackList extends BaseRoute<CardBackListData> {
  private readonly defaultOptions?: FetchOptions;

  constructor(options?: Options<FetchOptions>) {
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
      withDS: true,
      withExtraHeaders: true,
      language,
    });

    const res = await instance.get<CardBackListData>(
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

    this.cache.set(uid, data);

    return data;
  }
}

export class GameRecord extends BaseRoute<TCGGameRecordData> {
  private readonly defaultOptions?: FetchOptions;

  constructor(options?: Options<FetchOptions>) {
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
      withDS: true,
      withExtraHeaders: true,
      language,
    });

    const res = await instance.get<TCGGameRecordData>(
      "gcg/matchList",
      {
        Cookie: cookie,
      },
      {
        server: checkServerRegion(uid),
        role_id: uid,
      },
    );

    const { data } = res;

    this.cache.set(uid, data);

    return data;
  }
}

export class TCG {
  public basicInfo: BasicInfo;

  public cardList: CardList;

  public cardBackList: CardBackList;

  public gameRecord: GameRecord;

  constructor(options?: Options<FetchOptions>) {
    this.basicInfo = new BasicInfo(options);
    this.cardList = new CardList(options);
    this.cardBackList = new CardBackList(options);
    this.gameRecord = new GameRecord(options);
  }
}
