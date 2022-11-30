import { z } from "zod";
import type { fetchOptions } from "../routes/base";
import type { fetchClaimHistoryOption } from "../routes/dailyReward";
import type { SpiralAbyssFetchOptions } from "../routes/genshinAbyss";
import type { RedeemOptions } from "../routes/redeem";
import type { getMonthDiaryOptions } from "../routes/travelerDiary";

export const basicValidator = (key: string, options?: Partial<fetchOptions>): options is fetchOptions => {
  const schema = z.object({
    key: z.string(),
    options: z.object({
      language: z.string(),
      cookie: z.string().min(1),
    }),
  });

  schema.parse({ key, options });

  return true;
};

export const getDayRewardValidator = (day: number, options?: Partial<fetchOptions>): options is fetchOptions => {
  const schema = z.object({
    day: z.number(),
    options: z.object({
      language: z.string(),
      cookie: z.string().min(1),
    }),
  });

  schema.parse({ day, options });

  return true;
};

export const spiralAbyssValidator = (
  uid: string,
  options?: SpiralAbyssFetchOptions,
): options is SpiralAbyssFetchOptions => {
  const schema = z.object({
    uid: z.string(),
    options: z.object({
      language: z.string(),
      cookie: z.string().min(1),
      previous: z.boolean().optional(),
    }),
  });

  schema.parse({ uid, options });
  return true;
};

export const getAvatarValidator = (characterId: number, options?: Partial<fetchOptions>): options is fetchOptions => {
  const schema = z.object({
    characterId: z.number(),
    options: z.object({
      language: z.string(),
      cookie: z.string().min(1),
    }),
  });

  schema.parse({ characterId, options });

  return true;
};

export const redeemValidator = (code: string, options?: RedeemOptions): options is RedeemOptions => {
  const schema = z.object({
    code: z.string(),
    options: z.object({
      language: z.string(),
      cookie: z.string().min(1),
      uid: z.string(),
      cookie_token: z.string(),
    }),
  });

  schema.parse({ code, options });

  return true;
};

export const getMonthValidator = (uid: string, options?: getMonthDiaryOptions): options is getMonthDiaryOptions => {
  const schema = z.object({
    uid: z.string(),
    options: z.object({
      language: z.string(),
      cookie: z.string().min(1),
      month: z.number(),
    }),
  });

  schema.parse({ uid, options });

  return true;
};

export const claimHistoryValidator = (options?: fetchClaimHistoryOption): options is fetchClaimHistoryOption => {
  const schema = z.object({
    options: z.object({
      language: z.string(),
      cookie: z.string().min(1),
      page: z.number().optional(),
    }),
  });

  schema.parse({ options });
  return true;
};
