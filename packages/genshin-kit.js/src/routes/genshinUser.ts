import { BaseRoute, FetchOptions, Options } from "./base";
import {
  mergeOptions,
  RequestManager,
  basicValidator,
  checkServerRegion,
  userInfoValidator,
  OptionType,
} from "../utils";
import type { GenshinUserData, AchievementData } from "../interface";

export type UserFetchOptions = FetchOptions & {
  /**
   * @description The type of the user data to fetch
   * @property {number} 1 - Detailed Character Info, only return few characters
   * @property {number} 2 - Basic Character Info, return all characters
   * @default 1
   */
  avatar_list_type?: number;
};

export class Achievement extends BaseRoute<AchievementData> {
  private readonly defaultOptions?: FetchOptions;

  constructor(options?: Options) {
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
      language,
    });

    const res = await instance.post<AchievementData>(
      "achievement",
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

export class GenshinUser extends BaseRoute<GenshinUserData> {
  private readonly defaultOptions?: FetchOptions;

  public achievement: Achievement;
  constructor(options?: Options) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
    this.achievement = new Achievement(options);
  }

  /**
   * @param {string} uid Genshin Impact UID
   */
  public async fetch(uid: string, options?: UserFetchOptions) {
    if (this.cache.has(uid)) return this.cache.get(uid);

    const optionsToUse = mergeOptions(
      {
        options,
        cookieManager: this.cookieManager,
        defaultOptions: this.defaultOptions,
      },
      OptionType.UserInfoFetchOptions,
    );

    if (!userInfoValidator(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie, avatar_list_type } = optionsToUse;

    const instance = new RequestManager({
      withExtraHeaders: true,
      language,
    });

    const res = await instance.get<GenshinUserData>(
      "index",
      {
        Cookie: cookie,
      },
      {
        avatar_list_type: avatar_list_type ?? 1,
        server: checkServerRegion(uid),
        role_id: uid,
      },
    );

    const { data } = res;

    this.cache.set(uid, data);

    return data;
  }
}
