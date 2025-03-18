import { BaseRoute, FetchOptions, Options } from "./base";
import {
  mergeOptions,
  RequestManager,
  basicValidator,
  checkServerRegion,
  OptionType,
  charctersListValidator,
  characterDetailsValidator,
} from "../utils";
import type { CharacterData, CharacterDetailsData, CharacterInfoData } from "../interface";

export type CharctersListFetchOptions = FetchOptions & {
  /**
   * @description The sort type of the character list
   * @property {number} 1 - Level Descending
   * @property {number} 5 - Level Ascending
   * @property {number} 2 - Rarity Descending
   * @property {number} 3 - Rarity Ascending
   * @property {number} 6 - Fetter Descending
   * @property {number} 7 - Fetter Ascending
   * @default undefined
   */
  sort_type?: number;
  /**
   * @description The element type of the character
   * @property {"Pyro" | "Hydro" | "Dendro" | "Electro" | "Anemo" | "Geo" | "Cryo"} elements - The element type of the character
   * @default undefined
   */
  elements?: ("Pyro" | "Hydro" | "Dendro" | "Electro" | "Anemo" | "Geo" | "Cryo")[];
  /**
   * @description The weapon type of the character
   * @property {number} 1 - Sword
   * @property {number} 11 - Claymore
   * @property {number} 12 - Bow
   * @property {number} 13 - Polearm
   * @property {number} 10 - Catalyst
   * @default undefined
   */
  weapon_type?: (1 | 12 | 10 | 13 | 11)[];
};

export class Charcters extends BaseRoute<CharacterData[]> {
  private readonly defaultOptions?: FetchOptions;

  constructor(options?: Options) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @param {string} uid Genshin Impact UID
   */
  public async fetch(uid: string, options?: CharctersListFetchOptions): Promise<CharacterData[]> {
    if (this.cache.has(uid)) return this.cache.get(uid);

    const optionsToUse = mergeOptions(
      {
        options,
        cookieManager: this.cookieManager,
        defaultOptions: this.defaultOptions,
      },
      OptionType.CharctersListFetchOptions,
    );

    if (!charctersListValidator(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie, sort_type, elements, weapon_type } = optionsToUse;

    const instance = new RequestManager({
      withExtraHeaders: true,
      language,
    });

    const res = await instance.post(
      "character/list",
      {
        Cookie: cookie,
      },
      {
        role_id: uid,
        server: checkServerRegion(uid),
        ...(elements ? { elements: elements } : {}),
        ...(weapon_type ? { weapon_type: weapon_type } : {}),
        ...(sort_type ? { sort_type: sort_type } : {}),
      },
    );

    const { data } = res;

    this.cache.set(uid, data.list);

    return data.list;
  }

  /**
   * @param {number} characterId The avatar's id
   */
  public async fetchAvatarInfo(characterId: number, options?: FetchOptions): Promise<CharacterInfoData> {
    const optionsToUse = mergeOptions({
      options,
      cookieManager: this.cookieManager,
      defaultOptions: this.defaultOptions,
    });

    if (!basicValidator(characterId, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie } = optionsToUse;

    const instance = new RequestManager({
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

  /**
   * @param {string} uid Genshin Impact UID
   * @param {number} characterId The avatar's id
   */
  public async fetchAvatarDetail(uid: string, characterId: number, options?: FetchOptions) {
    const optionsToUse = mergeOptions({
      options,
      cookieManager: this.cookieManager,
      defaultOptions: this.defaultOptions,
    });

    if (!characterDetailsValidator(uid, characterId, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie } = optionsToUse;

    const instance = new RequestManager({
      withExtraHeaders: true,
      language,
    });

    const res = await instance.post<CharacterDetailsData>(
      "character/detail",
      {
        Cookie: cookie,
      },
      {
        role_id: uid,
        server: checkServerRegion(uid),
        character_ids: [characterId],
      },
    );

    const { data } = res;

    return data;
  }
}
