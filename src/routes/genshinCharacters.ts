import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { CharacterData, CharacterInfoData } from "../interface";
import { BaseRoute, fetchOptions } from "./base";
import type { ClientCache } from "../client/clientCache";
import { getAvatarValidator, validate } from "../utils/validate";

export class Charcters extends BaseRoute {
  public declare cache: ClientCache<CharacterData[]> | null;

  /**
   * @param {string} uid Genshin Impact game uid.
   */
  public async fetch(
    uid: string,
    options?: fetchOptions
  ): Promise<CharacterData[]> {
    if (this.cache?.has(uid)) return this.cache.get(uid);

    const optionsToUse = this.getFetchOptions(options);

    if (!validate(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie } = optionsToUse;

    const instance = new request({
      withDS: true,
    });

    instance.setLanguage(language);

    const res = await instance.post(
      "character",
      {
        "x-rpc-client_type": "4",
        "x-rpc-app_version": "1.5.0",
        Cookie: cookie,
      },
      {
        role_id: uid,
        server: checkServerRegion(uid),
      }
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
  public async fetchAvatarInfo(
    characterId: number,
    options?: fetchOptions
  ): Promise<CharacterInfoData> {
    const optionsToUse = options || this.defaultOptions;

    if (!getAvatarValidator<fetchOptions>(characterId, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie } = optionsToUse;

    const instance = new request({
      withDS: true,
    });

    instance.setLanguage(language);

    const res = await instance.post(
      "avatarBasicInfo",
      {
        "x-rpc-client_type": "4",
        "x-rpc-app_version": "1.5.0",
        Cookie: cookie,
      },
      {
        character_ids: [characterId],
      }
    );

    const { data } = res;

    return data.avatars[0];
  }
}
