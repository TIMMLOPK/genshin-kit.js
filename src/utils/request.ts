import axios from "axios";
import { Genshin_Battle_API_URL, Genshin_Hoyolab_API_URL, Genshin_Hoyolab_REWARD_URL, UA } from "../constants/constants";


/**
 * @description Creates a new axios instance with the base url set to the api url
 */


export enum optionType {
    hoyolab = "hoyolab",
    dailyrewards = "dailyrewards",
}

type option = {
    type: optionType,
    withUA?: boolean,
    withDS?: boolean,
}

const request = (option?: option) => {
    let baseURL = Genshin_Battle_API_URL;
    if (option?.type === optionType.hoyolab) {
        baseURL = Genshin_Hoyolab_API_URL;
    }
    if (option?.type === optionType.dailyrewards) {
        baseURL = Genshin_Hoyolab_REWARD_URL;
    }
    if (option?.withUA) {
        axios.defaults.headers.common['User-Agent'] = UA;
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