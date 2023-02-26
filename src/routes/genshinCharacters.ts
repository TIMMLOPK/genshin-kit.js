import { BaseRoute, fetchOptions, Options } from "./base";
import { mergeOptions, RequestManager, basicValidator, checkServerRegion, getAvatarValidator } from "../utils";
import type { CharacterData, CharacterInfoData } from "../interface";

export class Charcters extends BaseRoute<CharacterData[]> {
  private readonly defaultOptions?: fetchOptions;

  constructor(options?: Options<fetchOptions>) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @param {string} uid Genshin Impact UID
   */
  public async fetch(uid: string, options?: fetchOptions): Promise<CharacterData[]> {
    if (this.cache?.has(uid)) return this.cache.get(uid);

    const optionsToUse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!basicValidator(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie } = optionsToUse;

    const instance = new RequestManager({
      withDS: true,
      withExtraHeaders: true,
      language,
    });

    const res = await instance.post(
      "character",
      {
        Cookie: cookie,
      },
      {
        role_id: uid,
        server: checkServerRegion(uid),
      },
    );

    const { data } = res;

    if (this.cache) {
      this.cache.set(uid, data.avatars);
    }

    return data.avatars;
  }

  /**
   * @param {number} characterId The avatar's id
   */
  public async fetchAvatarInfo(characterId: number, options?: fetchOptions): Promise<CharacterInfoData> {
    const optionsToUse = mergeOptions(options, this.cookieManager, this.defaultOptions);

    if (!getAvatarValidator(characterId, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie } = optionsToUse;

    const instance = new RequestManager({
      withDS: true,
      withExtraHeaders: true,
      language,
    });

    const res = await instance.post(
      "avatarBasicInfo",
      {
        Cookie: cookie,
      },
      {
        character_ids: [characterId],
      },
    );

    const { data } = res;

    return data.avatars[0];
  }
}
