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
  RecordCard,
  AbyssBattle,
  GenshinUserData,
  RealTimeNote,
  Diary,
  CharacterData,
} from "../interface";

export class Client {
  private options: {
    language: Language | Language.EnglishUS;
    cookieManager: ClientCookieManager;
    cache: boolean;
  };

  private cookieManager: ClientCookieManager;

  public DailyReward: DailyRewards;

  public GameRecordCard: GameRecordCard;

  public SprialAbyss: SpiralAbyss;

  public GenshinActivity: Activities;

  public Characters: Charcters;

  public GenshinUser: GenshinUser;

  public RealTimeNotes: RealTimeNotes;

  public TravelDiary: TravelerDiary;

  /**
   * @param {Object} options - The options to use.
   */
  constructor(options?: {
    language: Language | Language.EnglishUS;
    cookieManager?: ClientCookieManager;
    cache?: boolean;
  }) {
    this.options = {
      language: options?.language || Language.EnglishUS,
      cookieManager: options?.cookieManager || new ClientCookieManager(),
      cache: options?.cache || false,
    };

    this.cookieManager = this.options.cookieManager;
    if (!options) {
      options = {
        language: Language.EnglishUS,
        cookieManager: new ClientCookieManager(),
        cache: false,
      };
    }

    if (!options.language) {
      options.language = Language.EnglishUS;
    }

    if (!options.cookieManager) {
      options.cookieManager = new ClientCookieManager();
    }

    if (!options.cache) {
      options.cache = false;
    }

    this.DailyReward = new DailyRewards();
    this.GenshinActivity = new Activities({ cache: this.options.cache });
    this.GameRecordCard = new GameRecordCard({ cache: this.options.cache });
    this.SprialAbyss = new SpiralAbyss({ cache: this.options.cache });
    this.GenshinUser = new GenshinUser({ cache: this.options.cache });
    this.RealTimeNotes = new RealTimeNotes({ cache: this.options.cache });
    this.Characters = new Charcters({ cache: this.options.cache });
    this.TravelDiary = new TravelerDiary({ cache: this.options.cache });
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
    const res = this.SprialAbyss.fetch(uid, language, cookie, previous);
    return res;
  }

  /**
   * @param {string} uid - HoYolab uid.
   */
  public async getGameRecordCard(uid: string): Promise<RecordCard> {
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = this.GameRecordCard.fetch(uid, language, cookie);
    return res;
  }

  /**
   * @param {string} uid - Genshin Impact game uid.
   */
  public async getGenshinUser(uid: string): Promise<GenshinUserData> {
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = this.GenshinUser.fetch(uid, language, cookie);
    return res;
  }

  /**
   * @param {string} uid - Genshin Impact game uid.
   */
  public async getRealTimeNotes(uid: string): Promise<RealTimeNote> {
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = this.RealTimeNotes.fetch(uid, language, cookie);
    return res;
  }

  /**
   * @param {string} uid - Genshin Impact game uid.
   */
  public async getCharacter(uid: string): Promise<CharacterData[]> {
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = this.Characters.fetch(uid, language, cookie);
    return res;
  }

  /**
   *  @param {string} uid - Genshin Impact game uid.
   */
  public async getTravelDiary(uid: string): Promise<Diary> {
    const cookie = this.cookieManager.get().cookie;
    const { language } = this.options;
    const res = this.TravelDiary.fetch(uid, language, cookie);
    return res;
  }
}
