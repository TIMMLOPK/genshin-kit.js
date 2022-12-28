import md5 from "md5";
import { SALT } from "../constants/constants";

/**
 * @Description generate dynamic secret
 * @returns {string}
 */
export const generate_dynamic_secret = (): string => {
  const date = new Date();
  const t = Math.floor(date.getTime() / 1000);
  let r = "";
  r = Math.random().toString(36).substring(2, 8);
  const h = md5(`salt=${SALT}&t=${t}&r=${r}`);
  return `${t},${r},${h}`;
};
