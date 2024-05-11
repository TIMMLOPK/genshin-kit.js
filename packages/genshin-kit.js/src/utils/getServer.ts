import { ServerRegion } from "../constants/constants";

/**
 * @description Check server_region by uid
 *
 * 8 / 18: os_asia
 * 9: os_cht
 * 7: os_euro
 * 6: os_usa
 */
export function checkServerRegion(uid: string | number): ServerRegion {
  const uidString = uid.toString();
  const serverMap: { [key: string]: ServerRegion } = {
    "18": ServerRegion.os_asia,
    "8": ServerRegion.os_asia,
    "9": ServerRegion.os_cht,
    "7": ServerRegion.os_euro,
    "6": ServerRegion.os_usa,
  };

  const serverKey = Object.keys(serverMap).find(key => uidString.startsWith(key)) ?? "";
  const serverRegion = serverMap[serverKey];

  if (serverRegion === undefined) {
    throw new Error("Invalid UID(unknown server region)");
  }

  return serverRegion;
}
