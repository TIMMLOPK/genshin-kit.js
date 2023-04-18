/**
 * @param {string} ltoken - The ltoken to set.
 * @param {string} ltuid - The ltuid to set.
 * @returns {string} - The cookie for headers.
 */

export function CookieFormatter(ltoken: string, ltuid: string): string {
  return `ltoken=${ltoken}; ltuid=${ltuid};`;
}
