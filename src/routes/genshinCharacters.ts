import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { CharacterData, CharacterInfo } from "../interface";
import type { Language } from "../constants/lang";
import { BaseRoute } from "./base";

export class Charcters extends BaseRoute {
  constructor(clientCache?: any) {
    super(clientCache);
  }

  /**
   * @param {string} uid The uid to set
   * @param {Language} language The language to set
   * @param {string} cookie The cookie to set
   */

  public async fetch(
    uid: string,
    language: Language,
    cookie: string
  ): Promise<CharacterData[]> {
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
   * @param {Language} language The language to set
   * @param {string} cookie The cookie to set
   */

  public async getAvatarInfo(
    characterId: number,
    language: Language,
    cookie: string
  ): Promise<CharacterInfo> {
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
