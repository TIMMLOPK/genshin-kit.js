import { z } from "zod";

export const validate = <K, T>(key: K, options: T): options is T => {
  if (typeof key === "number") {
    const numberSchema = z.object({
      key: z.number(),
      options: z.object({
        language: z.string(),
        cookie: z.string().min(1),
      }),
    });
    numberSchema.parse({ key, options });
    return true;
  }
  if (typeof key === "string") {
    let schema;
    if ("previous" in options) {
      schema = z.object({
        key: z.string(),
        options: z.object({
          language: z.string(),
          cookie: z.string().min(1),
          previous: z.boolean(),
        }),
      });
    } else {
      schema = z.object({
        key: z.string(),
        options: z.object({
          language: z.string(),
          cookie: z.string().min(1),
        }),
      });

      schema.parse({ key, options });
    }
  }
  return true;
};
