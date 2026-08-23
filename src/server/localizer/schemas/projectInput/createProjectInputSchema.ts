import { z } from "zod";

export const createProjectInputSchema = z
  .object({
    name: z.string().trim().min(1).max(120),
    sourceLocale: z.string().min(2).max(35).default("en-US"),
    locales: z
      .array(z.string().min(2).max(35))
      .min(1)
      .max(30)
      .default(["es-ES"]),
  })
  .strict();
