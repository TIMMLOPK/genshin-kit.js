import { createHash } from "crypto";
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
  const h = createHash("md5").update(`salt=${SALT}&t=${t}&r=${r}`).digest("hex");
  return `${t},${r},${h}`;
};
