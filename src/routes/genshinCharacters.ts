import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { CharacterData, CharacterInfoData } from "../interface";
import { BaseRoute, fetchOptions } from "./base";
import type { ClientCache } from "../client/clientCache";
import { validate } from "../utils/validate";

export class Charcters extends BaseRoute {
  public declare cache: ClientCache<CharacterData[]> | null;

  /**
   * @param {string} uid The uid to set
   */
  public async fetch(
    uid: string,
    options?: fetchOptions
  ): Promise<CharacterData[]> {
    if (this.cache?.has(uid)) return this.cache.get(uid) as CharacterData[];

    validate<string, fetchOptions>(uid, options || this.defaultOptions);

    const { language, cookie } = options || this.defaultOptions;

    const instance = new request({
      withDS: true,
      debug: this.debug,
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
  public async getAvatarInfo(
    characterId: number,
    options?: fetchOptions
  ): Promise<CharacterInfoData> {
    if (!options && !this.defaultOptions)
      throw new Error("No options provided");

    validate<number, fetchOptions>(characterId, options || this.defaultOptions);

    const { language, cookie } = options || this.defaultOptions;

    const instance = new request({
      withDS: true,
      debug: this.debug,
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
