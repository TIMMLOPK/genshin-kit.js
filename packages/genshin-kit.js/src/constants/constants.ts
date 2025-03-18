import type { Client } from "../client/client";

export enum API_URL {
  Genshin_Battle = "https://sg-public-api.hoyolab.com/event/game_record/genshin/api/",
  Genshin_HoYolab = " https://sg-public-api.hoyolab.com/event/game_record/card/wapi/",
  Genshin_HoYolab_Reward = "https://sg-hk4e-api.hoyolab.com/event/sol/",
  Genshin_HoYolab_Diary = "https://sg-hk4e-api.hoyolab.com/event/ysledgeros/",
  Genshin_Redeem_Code = "https://sg-hk4e-api.hoyoverse.com/common/apicdkey/api/webExchangeCdkey",
  Genshin_HoYolab_Cookie = "https://webapi-os.account.hoyoverse.com/Api/fetch_cookie_accountinfo",
}

export const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36";
export const SALT = "6s25p5ox5y14umn1p61aqyyvbvvl3lrt";

export enum ServerRegion {
  os_asia = "os_asia",
  os_cht = "os_cht",
  os_euro = "os_euro",
  os_usa = "os_usa",
}

export const cacheKeys = (client: Client) => {
  if (!client.isLogin()) {
    return [];
  }

  const caches = [
    client.dailyReward.checkInHistory.cache,
    client.dailyReward.extraRewardInfo.cache,
    client.dailyReward.resignInfo.cache,
    client.dailyReward.rewardInfo.cache,
    client.genshinActivity.cache,
    client.gameRecordCard.cache,
    client.sprialAbyss.cache,
    client.genshinUser.cache,
    client.realTimeNotes.cache,
    client.characters.cache,
    client.travelDiary.cache,
    client.tcg.cardList.cache,
    client.tcg.cardBackList.cache,
    client.tcg.basicInfo.cache,
    client.tcg.gameRecord.cache,
    client.roleCombat.cache,
  ] as const;

  return caches;
};
