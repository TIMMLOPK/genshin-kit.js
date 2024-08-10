import { BaseRoute, FetchOptions, Options } from "./base";
import { mergeOptions, RequestManager, checkServerRegion, roleCombatValidator, OptionType } from "../utils";
import type { RoleCombatData } from "../interface";

export type RoleCombatOptions<need_detail extends boolean = false> = FetchOptions &
  Partial<{
    need_detail: need_detail;
  }>;

/**
 * @description Imaginarium Theater
 */
export class RoleCombat extends BaseRoute<RoleCombatData<true | false>> {
  private readonly defaultOptions?: FetchOptions;

  constructor(options?: Options) {
    super(options);
    this.defaultOptions = options?.defaultOptions;
  }

  /**
   * @param {string} uid Genshin Impact UID
   */
  public async fetch<need_detail extends boolean = false>(
    uid: string,
    options?: RoleCombatOptions<need_detail>,
  ): Promise<RoleCombatData<need_detail>> {
    if (this.cache.has(uid)) return this.cache.get(uid) as RoleCombatData<need_detail>;

    const optionsToUse = mergeOptions(
      {
        options,
        cookieManager: this.cookieManager,
        defaultOptions: this.defaultOptions,
      },
      OptionType.RoleCombatOptions,
    );

    if (!roleCombatValidator(uid, optionsToUse)) {
      throw new Error("No UID or Cookie provided");
    }

    const { language, cookie, need_detail: optionsNeedDetail } = optionsToUse;

    const instance = new RequestManager({
      withExtraHeaders: true,
      language,
    });

    const res = await instance.get<RoleCombatData<need_detail>>(
      "role_combat",
      {
        Cookie: cookie,
      },
      {
        server: checkServerRegion(uid),
        role_id: uid,
        need_detail: optionsNeedDetail ?? false,
      },
    );

    const { data } = res;

    this.cache.set(uid, data);

    return data;
  }
}
