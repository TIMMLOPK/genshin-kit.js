/**
 * @param {string} ltoken - The ltoken to set.
 * @param {string} ltuid - The ltuid to set.
 * @returns {string} - The cookie for headers.
 */
export function CookieFormatter(ltoken: string, ltuid: string): string {
  const version = ltoken.startsWith("v2_") ? 2 : 1;
  switch (version) {
    case 1:
      return `ltoken=${ltoken}; ltuid=${ltuid};`;
    case 2:
      return `ltoken_v2=${ltoken}; ltuid_v2=${ltuid};`;
    default:
      return `ltoken=${ltoken}; ltuid=${ltuid};`;
  }
}

/**
 * @param {string} cookies - The cookie to parse.
 * @returns {Record<string, string>} - The parsed cookie.
 */
export function CookieToObj(cookies: string): Record<string, string> {
  const cookieObj: Record<string, string> = {};
  const cookieArr = cookies.split(";");
  cookieArr.forEach(cookie => {
    const index = cookie.indexOf("=");
    if (index !== -1) {
      const key = cookie.substring(0, index).trim();
      const value = cookie.substring(index + 1).trim();
      cookieObj[key] = value;
    }
  });

  return cookieObj;
}

/**
 * @param {Record<string, string> | string} cookies - The cookie to convert.
 * @returns {string | undefined} - The converted cookie.
 */
export function CookieObjToString(cookies?: Record<string, string> | string): string | undefined {
  if (!cookies) return undefined;

  if (typeof cookies === "string") {
    return cookies;
  }

  if (Object.keys(cookies).length === 0) return undefined;

  return (
    Object.entries(cookies)
      .map(([key, value]) => `${key}=${value}`)
      .join("; ") + ";"
  );
}
