import { z } from "zod";
import { sourceStringSchema } from "~/server/localizer/schemas/projectState/sourceStringSchema";

export const projectStateSchema = z
  .object({
    schemaVersion: z.literal(1),
    id: z.string().regex(/^proj_[a-z0-9]+$/),
    name: z.string().min(1).max(120),
    sourceLocale: z.string().min(2).max(35),
    locales: z.array(z.string().min(2).max(35)).min(1).max(30),
    revision: z.number().int().nonnegative(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    analysis: z
      .object({
        runId: z.string().min(1).max(120),
        sourceHash: z.string().regex(/^sha256:[a-f0-9]{64}$/),
        receivedAt: z.string().datetime(),
        cliVersion: z.string().max(50),
      })
      .strict()
      .nullable(),
    strings: z.array(sourceStringSchema).superRefine((strings, context) => {
      const keys = new Set<string>();
      for (const source of strings) {
        if (keys.has(source.stableKey)) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Source string keys must be unique.",
          });
        }
        keys.add(source.stableKey);
      }
    }),
  })
  .strict();
