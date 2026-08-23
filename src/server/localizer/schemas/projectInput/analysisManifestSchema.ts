import { z } from "zod";

export const analysisManifestSchema = z
  .object({
    schemaVersion: z.literal(1),
    projectId: z.string().regex(/^proj_[a-z0-9]+$/),
    runId: z.string().min(1).max(120),
    sourceHash: z.string().regex(/^sha256:[a-f0-9]{64}$/),
    environment: z
      .object({
        cliVersion: z.string().min(1).max(50),
        xcodeVersion: z.string().max(100).nullable(),
        swiftVersion: z.string().max(100).nullable(),
      })
      .strict(),
    strings: z
      .array(
        z
          .object({
            stableKey: z
              .string()
              .regex(/^[a-z0-9_./-]+$/i)
              .max(200),
            sourceText: z.string().min(1).max(10_000),
            developerComment: z.string().max(1_000).nullable(),
            occurrences: z
              .array(
                z
                  .object({
                    file: z
                      .string()
                      .max(500)
                      .refine(
                        (value) =>
                          !value.includes("..") && !value.startsWith("/"),
                      ),
                    line: z.number().int().positive(),
                    symbol: z.string().max(200).nullable(),
                  })
                  .strict(),
              )
              .min(1)
              .max(1_000),
          })
          .strict(),
      )
      .max(10_000)
      .superRefine((strings, context) => {
        const keys = new Set<string>();
        for (const source of strings) {
          if (keys.has(source.stableKey)) {
            context.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Analysis strings must not repeat a stable key.",
            });
          }
          keys.add(source.stableKey);
        }
      }),
  })
  .strict();
