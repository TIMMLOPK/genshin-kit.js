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
  TCG,
} from "../index";
import { ClientCookieManager } from "./clientCookieManager";
import { Language } from "../constants/lang";
import { setDebug } from "../utils";

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
  public dailyReward?: DailyRewards;

  public gameRecordCard?: GameRecordCard;

  public sprialAbyss?: SpiralAbyss;

  public genshinActivity?: Activities;

  public characters?: Charcters;

  public genshinUser?: GenshinUser;

  public realTimeNotes?: RealTimeNotes;

  public travelDiary?: TravelerDiary;

  public redeemCode?: RedeemCode;

  public tcg?: TCG;

  private options: {
    language: Language;
    cookieManager: ClientCookieManager;
    cache: boolean;
    cacheOptions?: {
      maxAge?: number;
    };
  };

  private logined: boolean;

  private cookieManager: ClientCookieManager;

  /**
   * @param {ClientOptions} options - The options to use.
   */
  constructor(options?: ClientOptions) {
    this.options = {
      language: options?.language || Language.EnglishUS,
      cookieManager: options?.cookieManager || new ClientCookieManager(),
      cache: options?.cache || false,
      cacheOptions: {
        maxAge: options?.cacheOptions?.maxAge,
      },
    };

    this.cookieManager = this.options.cookieManager;
    this.logined = false;
    setDebug(options?.debug || false);
  }

  public login(ltuid: string, ltoken: string): Required<this> {
    if (this.logined) return this as Required<this>;

    this.cookieManager.setCookie(ltuid, ltoken);

    const option = {
      cache: this.options.cache,
      cacheOptions: this.options.cacheOptions,
      defaultOptions: {
        language: this.options.language,
        cookie: this.cookieManager.get().cookie,
      },
      cookieManager: this.cookieManager,
    };

    this.dailyReward = new DailyRewards(option);
    this.genshinActivity = new Activities(option);
    this.gameRecordCard = new GameRecordCard(option);
    this.sprialAbyss = new SpiralAbyss(option);
    this.genshinUser = new GenshinUser(option);
    this.realTimeNotes = new RealTimeNotes(option);
    this.characters = new Charcters(option);
    this.travelDiary = new TravelerDiary(option);
    this.tcg = new TCG(option);
    this.redeemCode = new RedeemCode();
    this.logined = true;

    return this as Required<this>;
  }

  public addCookies(cookies: { ltuid: string; ltoken: string }[]) {
    cookies.forEach(cookie => {
      this.cookieManager.setCookie(cookie.ltuid, cookie.ltoken);
    });
  }

  public isLogin(): this is Client & Required<this> {
    return this.logined;
  }
}
