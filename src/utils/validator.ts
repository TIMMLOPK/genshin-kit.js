import { z } from "zod";
import type { fetchOptions } from "../routes/base";
import type { fetchClaimHistoryOption } from "../routes/dailyReward";
import type { SpiralAbyssFetchOptions } from "../routes/genshinAbyss";
import type { CardListOptions } from "../routes/genshinTCG";
import type { RedeemOptions } from "../routes/redeem";
import type { getMonthDiaryOptions } from "../routes/travelerDiary";

type requiredFetchOptions = Required<fetchOptions>;

export const basicValidator = (key: string | number, options?: fetchOptions): options is requiredFetchOptions => {
  if (typeof key === "string") {
    const schema = z.object({
      key: z.string(),
      options: z.object({
        language: z.string(),
        cookie: z.string().min(1),
      }),
    });

    schema.parse({ key, options });

    return true;
  }

  if (typeof key === "number") {
    const schema = z.object({
      key: z.number(),
      options: z.object({
        language: z.string(),
        cookie: z.string().min(1),
      }),
    });

    schema.parse({ key, options });

    return true;
  }

  return false;
};

export const spiralAbyssValidator = (
  uid: string,
  options?: SpiralAbyssFetchOptions,
): options is Required<SpiralAbyssFetchOptions> => {
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

export const cardListValidator = (uid: string, options?: CardListOptions): options is Required<CardListOptions> => {
  const schema = z.object({
    uid: z.string(),
    options: z.object({
      language: z.string(),
      cookie: z.string().min(1),
      need_avatar: z.boolean().optional(),
      need_action: z.boolean().optional(),
      need_stats: z.boolean().optional(),
      offset: z.number().optional(),
      limit: z.number().optional(),
    }),
  });

  schema.parse({ uid, options });

  return true;
};

export const getAvatarValidator = (characterId: number, options?: fetchOptions): options is requiredFetchOptions => {
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

export const redeemValidator = (code: string, options?: RedeemOptions): options is Required<RedeemOptions> => {
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

export const getMonthValidator = (
  uid: string,
  options?: Partial<getMonthDiaryOptions>,
): options is Required<getMonthDiaryOptions> => {
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

export const claimHistoryValidator = (
  options?: fetchClaimHistoryOption,
): options is Required<fetchClaimHistoryOption> => {
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
