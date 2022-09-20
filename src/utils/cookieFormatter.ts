/**
 * @param {string} ltoken - The ltoken to set.
 * @param {string} ltuid - The ltuid to set.
 * @returns {odject} - The cookie.
 */

interface Cookie {
    cookie: string;
}


export function CookieFormatter (ltoken: string, ltuid: string): Cookie {
    return {
        cookie: `ltoken=${ltoken}; ltuid=${ltuid};`,
    }
}