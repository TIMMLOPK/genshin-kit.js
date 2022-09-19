import { request, setLanguage } from "../utils/request";
import generate_dynamic_secret from "../utils/generate_ds";
import { checkServerRegion } from "../utils/getServer";
import type { Characters, APIResponse, CharacterInfo } from "../interface";
import { APIError } from "../utils/error";

export class Charcters {
    /**
       * @param {string} language The language to set
       * @param {string} cookie The cookie to set
       * @param {string} uid The uid to set
       */

    public async get(uid: string, language: string, cookie: string): Promise<Characters | APIResponse> {
        const instance = request();
        setLanguage(language);
        const res = await instance.post('/character', {
            "role_id": uid,
            "server": checkServerRegion(uid),
        },
            {
                headers: {
                    "x-rpc-client_type": "4",
                    "x-rpc-app_version": "1.5.0",
                    "DS": generate_dynamic_secret(),
                    "Cookie": cookie,
                },
            });

        if (res.data?.retcode === 0) return res.data.data.avatars;

        if (res.data.retcode === 10101) {
            return {
                status: "Cannot get data for more than 30 accounts per cookie per day",
                code: 10101,
            }
        }

        throw new APIError(res.data.message, res.data.retcode);
    }

    /**
     * @param {number} characterId The avatar's id
     * @param {string} language The language to set
     * @param {string} cookie The cookie to set
     */

    public async getAvatarInfo(characterId: number, language: string, cookie: string): Promise<CharacterInfo | APIResponse> {
        const instance = request();
        setLanguage(language);
        const res = await instance.post('/avatarBasicInfo', {
            "character_ids": [characterId],
        },
            {
                headers: {
                    "x-rpc-client_type": "4",
                    "x-rpc-app_version": "1.5.0",
                    "DS": generate_dynamic_secret(),
                    "Cookie": cookie,
                },
            });

        if (res.data?.retcode === 0) return res.data.data.avatars[0];

        if (res.data.retcode === 10101) {
            return {
                status: "Cannot get data for more than 30 accounts per cookie per day",
                code: 10101,
            }
        }

        throw new APIError(res.data.message, res.data.retcode);
    }

}


