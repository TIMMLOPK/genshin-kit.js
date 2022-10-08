/**
 * @description Check server_region by uid
 *
 * 8: os_asia
 * 9: os_cht
 * 7: os_euro
 * 6: os_usa
 */

export function checkServerRegion(uid: string | number): string {
  const server_region = Number(uid.toString().slice(0, 1));
  switch (server_region) {
    case 8:
      return "os_asia";
    case 9:
      return "os_cht";
    case 7:
      return "os_euro";
    case 6:
      return "os_usa";
    default:
      throw new Error("Invalid UID (server_region)");
  }
}
