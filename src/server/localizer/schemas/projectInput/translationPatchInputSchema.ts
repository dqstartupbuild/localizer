import { z } from "zod";

export const translationPatchInputSchema = z
  .object({
    expectedRevision: z.number().int().nonnegative(),
    locale: z.string().min(2).max(35),
    value: z.string().trim().min(1).max(10_000),
  })
  .strict();
