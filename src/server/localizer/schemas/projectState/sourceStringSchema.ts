import { z } from "zod";
import { translationSchema } from "~/server/localizer/schemas/projectState/translationSchema";

export const sourceStringSchema = z
  .object({
    stableKey: z
      .string()
      .regex(/^[a-z0-9_./-]+$/i)
      .max(200),
    sourceText: z.string().min(1).max(10_000),
    sourceTextHash: z.string(),
    developerComment: z.string().max(1_000).nullable(),
    occurrences: z
      .array(
        z
          .object({
            file: z
              .string()
              .max(500)
              .refine(
                (value) => !value.includes("..") && !value.startsWith("/"),
              ),
            line: z.number().int().positive(),
            symbol: z.string().max(200).nullable(),
          })
          .strict(),
      )
      .min(1)
      .max(1_000),
    stale: z.boolean(),
    translations: z
      .array(translationSchema)
      .superRefine((translations, context) => {
        const locales = new Set<string>();
        for (const translation of translations) {
          if (locales.has(translation.locale)) {
            context.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Translations must be unique per locale.",
            });
          }
          locales.add(translation.locale);
        }
      }),
  })
  .strict();
