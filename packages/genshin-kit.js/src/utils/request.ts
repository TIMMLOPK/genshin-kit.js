import { API_URL, UA } from "../constants/constants";
import { request } from "undici";
import { generate_dynamic_secret } from "./generateDS";
import { APIERROR } from "./error";
import { getErrorByRetcode } from "../constants/error";
import { Language } from "../constants/lang";
import { isDebug } from "./debug";

interface Option {
  route?: API_URL;
  withUA?: boolean;
  withDS?: boolean;
  withExtraHeaders?: boolean;
  language?: Language;
}

interface Response<T> {
  retcode: number;
  message: string;
  data: T;
}

type Headers = Record<string, string | string[]>;

/**
 * @description Creates a new instance for the request
 */
export class RequestManager {
  private baseURL: API_URL;
  private language: Language;
  private headers: Headers;

  constructor(option?: Option) {
    this.baseURL = option?.route || API_URL.Genshin_Battle;
    this.language = option?.language || Language.EnglishUS;

    this.headers = {
      "x-rpc-language": this.language,
    };

    if (option?.withUA) {
      this.headers["User-Agent"] = UA;
    }

    if (option?.withExtraHeaders) {
      this.headers["x-rpc-app_version"] = "1.5.0";
      this.headers["x-rpc-client_type"] = "5";
    }

    if (option?.withDS) {
      this.headers.DS = generate_dynamic_secret();
    }
  }

  public _debug(message: string | string[]): void {
    if (isDebug()) {
      if (Array.isArray(message)) {
        console.log(`[DEBUG] ${message.join("\n[DEBUG] ")}`);
      } else {
        console.log(`[DEBUG] ${message}`);
      }
    }
  }

  public async get<T = any>(
    url: string,
    headers?: Headers,
    params?: Record<string, string | number | boolean>,
  ): Promise<Response<T>> {
    const URL = `${this.baseURL}${url}`;
    const requestHeaders = {
      ...this.headers,
      ...headers,
    };

    this._debug([`GET ${URL}`, `Headers: ${JSON.stringify(requestHeaders)}`, `Params: ${JSON.stringify(params)}`]);

    const { body: res, statusCode } = await request(URL, {
      method: "GET",
      headers: requestHeaders,
      query: params,
    });

    if (statusCode !== 200) {
      this._debug(`Request failed with status code ${statusCode}`);
      throw new Error(`Request failed with status code ${statusCode}`);
    }

    const resData = (await res.json()) as Response<T>;

    this._debug([
      `Retcode: ${resData.retcode}`,
      `Message: ${resData.message}`,
      `Data: ${JSON.stringify(resData.data)}`,
    ]);

    if (resData.retcode !== 0) {
      const description = getErrorByRetcode(resData.retcode);
      this._debug(`Error: ${description}`);
      throw new APIERROR(`${resData.message}`, resData.retcode, description);
    }

    return resData;
  }

  public async post<T = any>(
    url: string,
    headers?: Headers,
    data?: Record<string, string | number[] | number | boolean>,
    params?: Record<string, string>,
  ): Promise<Response<T>> {
    const URL = `${this.baseURL}${url}`;
    const requestHeaders = {
      "content-type": "application/json",
      ...this.headers,
      ...headers,
    };
    const body = JSON.stringify(data);

    this._debug([
      `POST ${URL}`,
      `Headers: ${JSON.stringify(requestHeaders)}`,
      `Params: ${JSON.stringify(params)}`,
      `Body: ${body}`,
    ]);

    const { body: res, statusCode } = await request(URL, {
      method: "POST",
      headers: requestHeaders,
      body: body,
      query: params,
    });

    if (statusCode !== 200) {
      this._debug(`Request failed with status code ${statusCode}`);
      throw new Error(`Request failed with status code ${statusCode}`);
    }

    const resData = (await res.json()) as Response<T>;

    this._debug([
      `Retcode: ${resData.retcode}`,
      `Message: ${resData.message}`,
      `Data: ${JSON.stringify(resData.data)}`,
    ]);

    if (resData.retcode !== 0 && resData.retcode !== -5003) {
      const description = getErrorByRetcode(resData.retcode);
      this._debug(`Error: ${description}`);
      throw new APIERROR(`${resData.message}`, resData.retcode, description);
    }

    return resData;
  }
}
