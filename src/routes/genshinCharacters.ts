import { request } from "../utils/request";
import { checkServerRegion } from "../utils/getServer";
import type { Characters, APIResponse, CharacterInfo } from "../interface";
import { APIError } from "../utils/error";
import type { Language } from "../constants/lang";

export class Charcters {
    /**
       * @param {string} uid The uid to set       
       * @param {Language} language The language to set
       * @param {string} cookie The cookie to set
       */

    public async get(uid: string, language: Language, cookie: string): Promise<Characters | APIResponse> {
        const instance = new request({
            withDS: true,
        });
        instance.setLanguage(language);
        const res = await instance.post('character',
            {
                "x-rpc-client_type": "4",
                "x-rpc-app_version": "1.5.0",
                "Cookie": cookie,
            },
            {
                "role_id": uid,
                "server": checkServerRegion(uid),
            },
        );

        if (res.retcode === 0) return res.data.avatars;

        throw new APIError(res.message, res.retcode);
    }

    /**
     * @param {number} characterId The avatar's id
     * @param {Language} language The language to set
     * @param {string} cookie The cookie to set
     */

    public async getAvatarInfo(characterId: number, language: Language, cookie: string): Promise<CharacterInfo | APIResponse> {
        const instance = new request({
            withDS: true,
        });
        instance.setLanguage(language);
        const res = await instance.post('avatarBasicInfo',
            {
                "x-rpc-client_type": "4",
                "x-rpc-app_version": "1.5.0",
                "Cookie": cookie,
            },
            {
                "character_ids": [characterId],
            }
        );

        if (res.retcode === 0) return res.data.avatars[0];

        throw new APIError(res.message, res.retcode);
    }

}


