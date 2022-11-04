import {
  GameRecordCard,
  SpiralAbyss,
  GenshinUser,
  RealTimeNotes,
  Charcters,
  TravelerDiary,
  DailyRewards,
  Activities,
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

  public dailyReward: DailyRewards;

  public gameRecordCard: GameRecordCard;

  public sprialAbyss: SpiralAbyss;

  public genshinActivity: Activities;

  public characters: Charcters;

  public genshinUser: GenshinUser;

  public realTimeNotes: RealTimeNotes;

  public travelDiary: TravelerDiary;

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
   * @param {Object} options - The options to use.
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

    this.cookieManager = this.options.cookieManager as ClientCookieManager;

    const option = {
      cache: this.options.cache,
      cacheOptions: options?.cacheOptions,
      debug: this.options.debug,
    };

    this.dailyReward = new DailyRewards();
    this.genshinActivity = new Activities(option);
    this.gameRecordCard = new GameRecordCard(option);
    this.sprialAbyss = new SpiralAbyss(option);
    this.genshinUser = new GenshinUser(option);
    this.realTimeNotes = new RealTimeNotes(option);
    this.characters = new Charcters(option);
    this.travelDiary = new TravelerDiary(option);
  }

  public setltoken(ltoken: string) {
    this.cookieManager.setltoken(ltoken);
  }

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
    if (!this.cookieManager.get().ltoken)
      throw new Error("You need to login first.");
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = this.sprialAbyss.fetch(uid, language, cookie, previous);
    return res;
  }

  /**
   * @param {string} uid - HoYolab uid.
   */
  public async getGameRecordCard(uid: string): Promise<RecordCardData> {
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = this.gameRecordCard.fetch(uid, language, cookie);
    return res;
  }

  /**
   * @param {string} uid - Genshin Impact game uid.
   */
  public async getGenshinUser(uid: string): Promise<GenshinUserData> {
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = this.genshinUser.fetch(uid, language, cookie);
    return res;
  }

  /**
   * @param {string} uid - Genshin Impact game uid.
   */
  public async getRealTimeNotes(uid: string): Promise<RealTimeNoteData> {
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = this.realTimeNotes.fetch(uid, language, cookie);
    return res;
  }

  /**
   * @param {string} uid - Genshin Impact game uid.
   */
  public async getCharacter(uid: string): Promise<CharacterData[]> {
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = this.characters.fetch(uid, language, cookie);
    return res;
  }

  /**
   *  @param {string} uid - Genshin Impact game uid.
   */
  public async getTravelDiary(uid: string): Promise<DiaryData> {
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = this.travelDiary.fetch(uid, language, cookie);
    return res;
  }
}
