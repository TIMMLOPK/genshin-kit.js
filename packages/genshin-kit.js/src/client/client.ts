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
} from "../routes";
import { ClientCookieManager } from "./clientCookieManager";
import { Language } from "../constants/lang";
import { setDebug } from "../utils";
import { cacheKeys } from "../constants/constants";
import type { SweepFilterOptions } from "./clientCache";

export interface ClientOptions {
  language: Language;
  cookieManager: ClientCookieManager;
  debug: boolean;
  cacheOptions: Partial<CacheOptions>;
}

interface CacheOptions {
  maxAge: number;
  maxSize: number;
}

export class Client {
  /**
   * @type {DailyRewards}
   * @description Daily rewards endpoint
   */
  public dailyReward?: DailyRewards;

  /**
   * @type {GameRecordCard}
   * @description Game record card endpoint
   */
  public gameRecordCard?: GameRecordCard;

  /**
   * @type {SpiralAbyss}
   * @description Spiral abyss endpoint
   */
  public sprialAbyss?: SpiralAbyss;

  /**
   * @type {Activities}
   * @description Genshin activity endpoint
   */
  public genshinActivity?: Activities;

  /**
   * @type {Charcters}
   * @description Genshin character endpoint
   */
  public characters?: Charcters;


  /**
   * @type {GenshinUser}
   * @description Genshin user endpoint
   */
  public genshinUser?: GenshinUser;

  /**
   * @type {RealTimeNotes}
   * @description Real time notes endpoint
   */
  public realTimeNotes?: RealTimeNotes;

  /**
   * @type {TravelerDiary}
   * @description Traveler diary endpoint
   */
  public travelDiary?: TravelerDiary;

  /**
   * @type {RedeemCode}
   * @description Redeem code endpoint
   */
  public redeemCode?: RedeemCode;

  /**
   * @type {TCG}
   * @description TCG endpoint
   */
  public tcg?: TCG;

  private options: ClientOptions & { cacheOptions: { maxAge: number; maxSize?: number } };

  private logined: boolean;

  private cookieManager: ClientCookieManager;

  /**
   * @param {ClientOptions} options - The options to use.
   */
  constructor(options?: Partial<ClientOptions>) {
    this.options = {
      language: options?.language || Language.EnglishUS,
      cookieManager: options?.cookieManager || new ClientCookieManager(),
      cacheOptions: {
        maxAge: options?.cacheOptions?.maxAge ?? 60,
        maxSize: options?.cacheOptions?.maxSize,
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
      cacheOptions: {
        maxSize: this.options.cacheOptions.maxSize,
      },
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

    this.initSweeper();
    this.logined = true;

    return this as Required<this>;
  }

  public addCookies(cookies: { ltuid: string; ltoken: string }[]) {
    for (const cookie of cookies) {
      this.cookieManager.setCookie(cookie.ltuid, cookie.ltoken);
    }
  }

  public isLogin(): this is Client & Required<this> {
    return this.logined;
  }

  private initSweeper() {
    setInterval(() => {
      if (this.options.debug) console.log("[DEBUG] Sweeping cache");
      const filter: SweepFilterOptions = v =>
        v.timestamp + this.options.cacheOptions.maxAge < Date.now() ||
        (this.options.cacheOptions.maxSize !== undefined ? v.size > this.options.cacheOptions.maxSize : false);

      for (const cache of cacheKeys(this)) {
        cache.sweep(filter);
      }
    }, 1000 * this.options.cacheOptions.maxAge).unref();
  }
}
