import { z } from "zod";
import type { FetchOptions } from "../routes/base";
import type {
  FetchClaimHistoryOption,
  SpiralAbyssFetchOptions,
  CardListOptions,
  RedeemOptions,
  MonthDiaryOptions,
} from "../routes";

type RequiredFetchOptions = Required<FetchOptions>;

export const basicValidator = (key: string | number, options?: FetchOptions): options is RequiredFetchOptions => {
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
): options is RequiredFetchOptions & SpiralAbyssFetchOptions => {
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

export const cardListValidator = (
  uid: string,
  options?: CardListOptions,
): options is RequiredFetchOptions & CardListOptions => {
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

export const redeemValidator = (code: string, options?: Partial<RedeemOptions>): options is Required<RedeemOptions> => {
  const schema = z.object({
    code: z.string(),
    options: z.object({
      language: z.string(),
      cookie: z.string().min(1),
      cookie_token: z.string().min(1),
      uid: z.string(),
    }),
  });

  schema.parse({ code, options });

  return true;
};

export const getMonthValidator = (
  uid: string,
  options?: Partial<MonthDiaryOptions>,
): options is Required<MonthDiaryOptions> => {
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
  options?: FetchClaimHistoryOption,
): options is RequiredFetchOptions & FetchClaimHistoryOption => {
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
