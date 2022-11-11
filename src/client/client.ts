import {
  GameRecordCard,
  SpiralAbyss,
  GenshinUser,
  RealTimeNotes,
  Charcters,
  TravelerDiary,
  DailyRewards,
  Activities,
  RedeemCode,
} from "../index";
import { ClientCookieManager } from "./clientCookieManager";
import { Language } from "../constants/lang";
import type {
  RecordCardData,
  AbyssBattleData,
  GenshinUserData,
  RealTimeNoteData,
  DiaryData,
  CharacterData,
} from "../interface";

interface ClientOptions {
  language?: Language | Language.EnglishUS;
  cookieManager?: ClientCookieManager;
  cache?: boolean;
  debug?: boolean;
  cacheOptions?: {
    maxAge?: number;
  };
}

export class Client {
  private cookieManager: ClientCookieManager;

  public dailyReward?: DailyRewards;

  public gameRecordCard?: GameRecordCard;

  public sprialAbyss?: SpiralAbyss;

  public genshinActivity?: Activities;

  public characters?: Charcters;

  public genshinUser?: GenshinUser;

  public realTimeNotes?: RealTimeNotes;

  public travelDiary?: TravelerDiary;

  public redeemCode?: RedeemCode;

  private options: {
    language: Language | Language.EnglishUS;
    cookieManager: ClientCookieManager;
    cache: boolean;
    debug: boolean;
    cacheOptions: {
      maxAge: number;
    };
  };

  /**
   * @param {ClientOptions} options - The options to use.
   */
  constructor(options?: ClientOptions) {
    this.options = {
      language: options?.language || Language.EnglishUS,
      cookieManager: options?.cookieManager || new ClientCookieManager(),
      cache: options?.cache || false,
      debug: options?.debug || false,
      cacheOptions: {
        maxAge: options?.cacheOptions?.maxAge || 0,
      },
    };

    this.cookieManager = this.options.cookieManager;
  }

  public login(ltuid: string, ltoken: string) {
    this.cookieManager.setltuid(ltuid);
    this.cookieManager.setltoken(ltoken);

    const option = {
      cache: this.options.cache,
      cacheOptions: this.options.cacheOptions,
      debug: this.options.debug,
      defaultOptions: {
        language: this.options.language,
        cookie: this.cookieManager.get().cookie,
      },
    };

    this.dailyReward = new DailyRewards();
    this.genshinActivity = new Activities(option);
    this.gameRecordCard = new GameRecordCard(option);
    this.sprialAbyss = new SpiralAbyss(option);
    this.genshinUser = new GenshinUser(option);
    this.realTimeNotes = new RealTimeNotes(option);
    this.characters = new Charcters(option);
    this.travelDiary = new TravelerDiary(option);
    this.redeemCode = new RedeemCode();
  }

  /**
   * @deprecated Use `login` instead.
   */
  public setltoken(ltoken: string) {
    this.cookieManager.setltoken(ltoken);
  }

  /**
   * @deprecated Use `login` instead.
   */
  public setltuid(ltuid: string) {
    this.cookieManager.setltuid(ltuid);
  }

  /**
   * @param {string} uid - Genshin Impact game uid.
   */
  public async getAbyssBattle(
    uid: string,
    previous?: boolean
  ): Promise<AbyssBattleData> {
    if (!this.sprialAbyss) throw new Error("Login to init sprialAbyss");
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = this.sprialAbyss.fetch(uid, { language, cookie, previous });
    return res;
  }

  /**
   * @param {string} uid - HoYolab uid.
   */
  public async getGameRecordCard(uid: string): Promise<RecordCardData> {
    if (!this.gameRecordCard) throw new Error("Login to init gameRecordCard");
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = this.gameRecordCard.fetch(uid, { language, cookie });
    return res;
  }

  /**
   * @param {string} uid - Genshin Impact game uid.
   */
  public async getGenshinUser(uid: string): Promise<GenshinUserData> {
    if (!this.genshinUser) throw new Error("Login to init genshinUser");
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = this.genshinUser.fetch(uid, { language, cookie });
    return res;
  }

  /**
   * @param {string} uid - Genshin Impact game uid.
   */
  public async getRealTimeNotes(uid: string): Promise<RealTimeNoteData> {
    if (!this.realTimeNotes) throw new Error("Login to init realTimeNotes");
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = this.realTimeNotes.fetch(uid, { language, cookie });
    return res;
  }

  /**
   * @param {string} uid - Genshin Impact game uid.
   */
  public async getCharacter(uid: string): Promise<CharacterData[]> {
    if (!this.characters) throw new Error("Login to init characters");
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = this.characters.fetch(uid, { language, cookie });
    return res;
  }

  /**
   *  @param {string} uid - Genshin Impact game uid.
   */
  public async getTravelDiary(uid: string): Promise<DiaryData> {
    if (!this.travelDiary) throw new Error("Login to init travelDiary");
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = this.travelDiary.fetch(uid, { language, cookie });
    return res;
  }
}
