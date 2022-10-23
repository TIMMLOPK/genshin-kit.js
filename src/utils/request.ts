import {
  Genshin_Battle_API_URL,
  Genshin_Hoyolab_API_URL,
  Genshin_Hoyolab_DIARY_URL,
  Genshin_Hoyolab_REWARD_URL,
  UA,
} from "../constants/constants";
import { request } from "undici";
import generate_dynamic_secret from "./generate_ds";
import ERROR from "../constants/error";
import { APIERROR } from "./error";

type option = {
  route?:
    | typeof Genshin_Hoyolab_API_URL
    | typeof Genshin_Hoyolab_DIARY_URL
    | typeof Genshin_Hoyolab_REWARD_URL
    | typeof Genshin_Battle_API_URL;
  withUA?: boolean;
  withDS?: boolean;
};

interface Response {
  retcode: number;
  message: string;
  data: any;
}

/**
 * @description Creates a new instance for the request
 */
class HTTPRequest {
  private baseURL: string;
  private withUA: boolean;
  private withDS: boolean;
  private language: string;

  constructor(option?: option) {
    this.baseURL = Genshin_Battle_API_URL;
    if (option?.route) {
      this.baseURL = option.route;
    }
    this.withUA = option?.withUA || false;
    this.withDS = option?.withDS || false;
    this.language = "en-us";
  }

  public async get(
    url: string,
    headers?: any,
    params?: any
  ): Promise<Response> {
    const { body: res, statusCode } = await request(`${this.baseURL}${url}`, {
      method: "GET",
      headers: {
        "User-Agent": this.withUA ? UA : undefined,
        "x-rpc-language": this.language,
        DS: this.withDS ? generate_dynamic_secret() : undefined,
        ...headers,
      },
      query: params,
    });

    if (statusCode !== 200) {
      throw new Error(`Request failed with status code ${statusCode}`);
    }

    const resData = await res.json();

    if (resData.retcode !== 0) {
      const description = ERROR.find(
        (error) => error.retcode === resData.retcode
      )?.message;
      throw new APIERROR(`${resData.message}`, resData.retcode, description);
    }

    return resData;
  }

  public async post(
    url: string,
    headers?: any,
    data?: any,
    params?: any
  ): Promise<Response> {
    const { body: res, statusCode } = await request(`${this.baseURL}${url}`, {
      method: "POST",
      headers: {
        "User-Agent": this.withUA ? UA : undefined,
        "x-rpc-language": this.language,
        DS: this.withDS ? generate_dynamic_secret() : undefined,
        ...headers,
      },
      body: JSON.stringify(data),
      query: params,
    });

    if (statusCode !== 200) {
      throw new Error(`Request failed with status code ${statusCode}`);
    }

    const resData = await res.json();

    if (resData.retcode !== 0) {
      const description = ERROR.find(
        (error) => error.retcode === resData.retcode
      )?.message;
      throw new APIERROR(`${resData.message}`, resData.retcode, description);
    }

    return resData;
  }

  public setLanguage(language: string): void {
    this.language = language;
  }
}

export { HTTPRequest as request };
