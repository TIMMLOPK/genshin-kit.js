import md5 from 'md5';
import { SALT } from '../constants/constants';

/**
 * 
 * @Description generate dynamic secret
 * @returns {string}
 * 
 */

const generate_dynamic_secret = (): string => {
    const date = new Date();
    const t = Math.floor(date.getTime() / 1000);
    let r = "";
    let possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 6; i++) {
        r += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    let h = md5(`salt=${SALT}&t=${t}&r=${r}`, { encoding: 'string' });
    return `${t},${r},${h}`;
}

export default generate_dynamic_secret;