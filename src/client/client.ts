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
  language: Language | Language.EnglishUS;
  cookieManager: ClientCookieManager;
  cache: boolean;
  debug: boolean;
  cacheOptions: {
    maxAge: number;
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

  private options: ClientOptions;

  private logined: boolean;

  private cookieManager: ClientCookieManager;

  /**
   * @param {ClientOptions} options - The options to use.
   */
  constructor(options?: Partial<ClientOptions>) {
    this.options = {
      language: options?.language || Language.EnglishUS,
      cookieManager: options?.cookieManager || new ClientCookieManager(),
      cache: options?.cache || false,
      cacheOptions: {
        maxAge: options?.cacheOptions?.maxAge || 60,
      },
      debug: options?.debug || false,
    };

    this.cookieManager = this.options.cookieManager;
    this.logined = false;
    setDebug(this.options.debug);
  }

  public login(ltuid: string, ltoken: string): Required<this> {
    if (this.isLogin()) return this;

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

    if (this.options.cache) {
      this.initSweeper();
    }

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

  private initSweeper() {
    setInterval(() => {
      const filter = (v: any) => v.timestamp + (this.options.cacheOptions.maxAge) < Date.now();
      const caches = [
        this.genshinActivity?.cache,
        this.gameRecordCard?.cache,
        this.sprialAbyss?.cache,
        this.genshinUser?.cache,
        this.realTimeNotes?.cache,
        this.characters?.cache,
        this.travelDiary?.cache,
        this.tcg?.cardList?.cache,
        this.tcg?.cardBackList?.cache,
        this.tcg?.basicInfo?.cache,
      ];

      for (const cache of caches) {
        if (cache) {
          cache.sweep(filter);
        }
      }

    }, 1000 * this.options.cacheOptions.maxAge).unref();
  }
}
