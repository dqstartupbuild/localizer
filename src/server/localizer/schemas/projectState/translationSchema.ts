import { z } from "zod";

export const translationSchema = z
  .object({
    locale: z.string().min(2).max(35),
    value: z.string().min(1).max(10_000),
    origin: z.literal("manual"),
    status: z.enum(["approved", "needs_review"]),
    updatedAt: z.string().datetime(),
    sourceTextHash: z.string(),
  })
  .strict();
