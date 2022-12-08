import { Genshin_Battle_API_URL, UA } from "../constants/constants";
import { request } from "undici";
import generate_dynamic_secret from "./generateDS";
import { APIERROR } from "./error";
import getErrorByRetcode from "../constants/error";
import { Language } from "../constants/lang";
import type { IncomingHttpHeaders } from "http2";
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

/**
 * @description Creates a new instance for the request
 */
class HTTPRequest {
  private baseURL: string;
  private language: Language;
  private headers: IncomingHttpHeaders;

  constructor(option?: option) {
    this.baseURL = Genshin_Battle_API_URL;
    if (option?.route) {
      this.baseURL = option.route;
    }
    this.language = option?.language ? option.language : Language.EnglishUS;

    this.headers = {
      "User-Agent": option?.withUA ? UA : undefined,
      "x-rpc-language": this.language,
      "x-rpc-app_version": option?.withExtraHeaders ? "1.5.0" : undefined,
      "x-rpc-client_type": option?.withExtraHeaders ? "5" : undefined,
      DS: option?.withDS ? generate_dynamic_secret() : undefined,
    };
  }

  public _debug(message: string): void {
    if (isDebug()) {
      console.log(message);
    }
  }

  public async get(
    url: string,
    headers?: IncomingHttpHeaders,
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
    headers?: IncomingHttpHeaders,
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

export { HTTPRequest as request };
