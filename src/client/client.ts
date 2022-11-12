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
    this.cookieManager.setCookie(ltuid, ltoken);

    const option = {
      cache: this.options.cache,
      cacheOptions: this.options.cacheOptions,
      debug: this.options.debug,
      defaultOptions: {
        language: this.options.language,
        cookie: this.cookieManager.get().cookie,
      },
      cookieManager: this.cookieManager,
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
}
