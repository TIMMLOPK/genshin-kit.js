import { API_URL, UA } from "../constants/constants";
import { request } from "undici";
import { generate_dynamic_secret } from "./generateDS";
import { APIERROR } from "./error";
import { getErrorByRetcode } from "../constants/error";
import { Language } from "../constants/lang";
import { isDebug } from "./debug";

interface option {
  route?: string;
  withUA?: boolean;
  withDS?: boolean;
  withExtraHeaders?: boolean;
  language?: Language;
}

interface Response {
  retcode: number;
  message: string;
  data: any;
}

type Headers = Record<string, string | string[]>;

/**
 * @description Creates a new instance for the request
 */
export class RequestManager {
  private baseURL: string;
  private language: Language;
  private headers: Headers;

  constructor(option?: option) {
    this.baseURL = API_URL.Genshin_Battle;
    if (option?.route) {
      this.baseURL = option.route;
    }
    this.language = option?.language ? option.language : Language.EnglishUS;

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

  public _debug(message: string): void {
    if (isDebug()) {
      console.log(`[DEBUG] ${message}`);
    }
  }

  public async get(
    url: string,
    headers?: Headers,
    params?: Record<string, string | number | boolean>,
  ): Promise<Response> {
    const URL = `${this.baseURL}${url}`;
    const requestHeaders = {
      ...this.headers,
      ...headers,
    };

    this._debug(`GET ${URL}`);
    this._debug(`Headers: ${JSON.stringify(requestHeaders)}`);
    this._debug(`Params: ${JSON.stringify(params)}`);

    const { body: res, statusCode } = await request(URL, {
      method: "GET",
      headers: requestHeaders,
      query: params,
    });

    if (statusCode !== 200) {
      this._debug(`Request failed with status code ${statusCode}`);
      throw new Error(`Request failed with status code ${statusCode}`);
    }

    const resData = await res.json();

    this._debug(`Retcode: ${resData.retcode}`);
    this._debug(`Message: ${resData.message}`);
    this._debug(`Data: ${JSON.stringify(resData.data)}`);

    if (resData.retcode !== 0) {
      const description = getErrorByRetcode(resData.retcode);
      this._debug(`Error: ${description}`);
      throw new APIERROR(`${resData.message}`, resData.retcode, description);
    }

    return resData;
  }

  public async post(
    url: string,
    headers?: Headers,
    data?: Record<string, string | number[] | number | boolean>,
    params?: Record<string, string>,
  ): Promise<Response> {
    const URL = `${this.baseURL}${url}`;
    const requestHeaders = {
      "content-type": "application/json",
      ...this.headers,
      ...headers,
    };
    const body = JSON.stringify(data);

    this._debug(`POST ${URL}`);
    this._debug(`Headers: ${JSON.stringify(requestHeaders)}`);
    this._debug(`Params: ${JSON.stringify(params)}`);
    this._debug(`Body: ${body}`);

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

    const resData = await res.json();

    this._debug(`Retcode: ${resData.retcode}`);
    this._debug(`Message: ${resData.message}`);
    this._debug(`Data: ${JSON.stringify(resData.data)}`);

    if (resData.retcode !== 0 && resData.retcode !== -5003) {
      const description = getErrorByRetcode(resData.retcode);
      this._debug(`Error: ${description}`);
      throw new APIERROR(`${resData.message}`, resData.retcode, description);
    }

    return resData;
  }
}
