import { Genshin_Battle_API_URL, Genshin_Hoyolab_API_URL, Genshin_Hoyolab_REWARD_URL, UA } from "../constants/constants";
import { request } from "undici";
import generate_dynamic_secret from "./generate_ds";


/**
 * @description Creates a new instance with the base url set to the api url
 */
export enum urlOption {
    hoyolab = "hoyolab",
    dailyrewards = "dailyrewards",
}

type option = {
    type?: urlOption,
    withUA?: boolean,
    withDS?: boolean,
}

class HTTPRequest {
    private baseURL: string;
    private withUA: boolean;
    private withDS: boolean;
    private language: string;
    constructor(option?: option) {
        this.baseURL = Genshin_Battle_API_URL;
        if (option?.type === urlOption.hoyolab) {
            this.baseURL = Genshin_Hoyolab_API_URL;
        }
        if (option?.type === urlOption.dailyrewards) {
            this.baseURL = Genshin_Hoyolab_REWARD_URL;
        }
        this.withUA = option?.withUA || false;
        this.withDS = option?.withDS || false;
        this.language = "en-us";
    }

    public async get(url: string, headers?: any, params?: any): Promise<any> {
        const { body: res } = await request(`${this.baseURL}${url}`, {
            method: "GET",
            headers: {
                "User-Agent": this.withUA ? UA : undefined,
                "DS": this.withDS ? generate_dynamic_secret() : undefined,
                "x-rpc-language": this.language,
                ...headers,
            },
            query: params,
        });


        const resData = await res.json();

        if (resData.retcode === -100) {
            return {
                message: "Invalid cookie",
                retcode: -100,
            }
        }

        if (resData.retcode === 10001) {
            return {
                message: "Invalid cookie",
                retcode: 10001,
            }
        }


        if (resData.retcode === 10101) {
            return {
                message: "Cannot get data for more than 30 accounts per cookie per day",
                retcode: 10101,
            }
        }


        return resData;
    }

    public async post(url: string, headers?: any, data?: any, params?: any): Promise<any> {
        const { body: res } = await request(`${this.baseURL}${url}`, {
            method: "POST",
            headers: {
                "User-Agent": this.withUA ? UA : undefined,
                "DS": this.withDS ? generate_dynamic_secret() : undefined,
                "x-rpc-language": this.language,
                ...headers,
            },
            body: JSON.stringify(data),
            query: params,
        });
        const resData = await res.json();
        return resData;
    }

    public setLanguage(language: string): void {
        this.language = language;
    }
}

export { HTTPRequest as request };