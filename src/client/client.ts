import {
  GameRecordCard,
  SpiralAbyss,
  GenshinUser,
  RealTimeNotes,
  Charcters,
  TravelerDiary,
} from "../index";
import { ClientCookieManager } from "./clientCookieManager";
import { ClientCache } from "./clientCache";
import type { Language } from "../constants/lang";
import type {
  RecordCard,
  AbyssBattle,
  GenshinUserData,
  RealTimeNote,
  CharacterData,
  Diary,
} from "../interface";

export class Client {
  private options: {
    language: Language | Language.EnglishUS;
    cookieManager?: ClientCookieManager;
    cache?: boolean;
  };
  private cookieManager: ClientCookieManager;
  public cache: ClientCache | null;

  /**
   * @param {Object} options - The options to use.
   */
  constructor(options: {
    language: Language | Language.EnglishUS;
    cookieManager?: ClientCookieManager;
    cache?: boolean;
  }) {
    this.options = options;
    this.cookieManager = options.cookieManager || new ClientCookieManager();
    this.options.cache = options.cache ?? true;
    this.cache = this.options.cache ? new ClientCache() : null;
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
  ): Promise<AbyssBattle> {
    if (!this.cookieManager.get().ltoken)
      throw new Error("You need to login first.");
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = new SpiralAbyss(this.cache).fetch(
      uid,
      language,
      cookie,
      previous
    );
    return res;
  }

  /**
   * @param {string} uid - HoYolab uid.
   */
  public async getGameRecordCard(uid: string): Promise<RecordCard> {
    if (!this.cookieManager.get().ltoken)
      throw new Error("You need to login first.");
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = new GameRecordCard(this.cache).fetch(uid, language, cookie);
    return res;
  }

  /**
   * @param {string} uid - Genshin Impact game uid.
   */
  public async getGenshinUser(uid: string): Promise<GenshinUserData> {
    if (!this.cookieManager.get().ltoken)
      throw new Error("You need to login first.");
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = new GenshinUser(this.cache).fetch(uid, language, cookie);
    return res;
  }

  /**
   * @param {string} uid - Genshin Impact game uid.
   */
  public async getRealTimeNotes(uid: string): Promise<RealTimeNote> {
    if (!this.cookieManager.get().ltoken)
      throw new Error("You need to login first.");
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = new RealTimeNotes(this.cache).fetch(uid, language, cookie);
    return res;
  }

  /**
   * @param {string} uid - Genshin Impact game uid.
   */
  public async getCharacter(uid: string): Promise<CharacterData> {
    if (!this.cookieManager.get().ltoken)
      throw new Error("You need to login first.");
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = new Charcters(this.cache).fetch(uid, language, cookie);
    return res;
  }

  /**
   *  @param {string} uid - Genshin Impact game uid.
   */
  public async getTravelDiary(uid: string): Promise<Diary> {
    if (!this.cookieManager.get().ltoken)
      throw new Error("You need to login first.");
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = new TravelerDiary(this.cache).fetch(uid, language, cookie);
    return res;
  }
}
