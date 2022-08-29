import axios from "axios";
import { Genshin_Battle_API_URL, Genshin_Hoyolab_API_URL } from "../constants/constants";


/**
 * @description Creates a new axios instance with the base url set to the api url
 * @param {string} type The type of api
 */


const request = (type?: string) => {
    let baseURL = Genshin_Battle_API_URL;
    if (type === "hoyolab") {
        baseURL = Genshin_Hoyolab_API_URL;
    }

    return axios.create({
        baseURL
    });
}


/**
 * 
 * @description Set i18n language
 * @param {string} language The language to set
 * 
 */
const setLanguage = (language: string) => {
    axios.defaults.headers.common['x-rpc-language'] = language;
}


export { request, setLanguage };