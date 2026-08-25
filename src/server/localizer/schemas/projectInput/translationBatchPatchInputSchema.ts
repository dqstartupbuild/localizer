import { z } from "zod";

export const translationBatchPatchInputSchema = z
  .object({
    expectedRevision: z.number().int().nonnegative(),
    translations: z
      .array(
        z
          .object({
            stableKey: z
              .string()
              .regex(/^[a-z0-9_./-]+$/i)
              .max(200),
            locale: z.string().min(2).max(35),
            value: z.string().trim().min(1).max(10_000),
          })
          .strict(),
      )
      .min(1)
      .max(1_000)
      .superRefine((translations, context) => {
        const identities = new Set<string>();
        for (const translation of translations) {
          const identity = `${translation.stableKey}:${translation.locale}`;
          if (identities.has(identity)) {
            context.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "Translations must be unique per source string and locale.",
            });
          }
          identities.add(identity);
        }
      }),
  })
  .strict();
