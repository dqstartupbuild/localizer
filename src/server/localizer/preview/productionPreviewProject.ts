import { projectStateSchema } from "~/server/localizer/schemas/projectState/projectStateSchema";

/**
 * Bundled, read-only sample data for the public production dashboard preview.
 * Parsing at module load makes malformed preview data fail safely during builds.
 */
export const productionPreviewProject = projectStateSchema.parse({
  schemaVersion: 1,
  id: "proj_preview",
  name: "Trail Notes",
  sourceLocale: "en-US",
  locales: ["en-US", "es-ES", "fr-FR"],
  revision: 7,
  createdAt: "2026-08-01T14:00:00.000Z",
  updatedAt: "2026-08-20T16:20:00.000Z",
  analysis: {
    runId: "preview-analysis-7",
    sourceHash:
      "sha256:9a4c2d5a7cd75fd87d49548da88a83c79bbdd419ec7d0cce57a28b39e4d4d938",
    receivedAt: "2026-08-20T16:20:00.000Z",
    cliVersion: "0.1.0",
  },
  strings: [
    {
      stableKey: "trail_start_title",
      sourceText: "Start a new trail",
      sourceTextHash:
        "sha256:d202341227e1ba326dc9e680c913a2db1e52dba6433d7739782ab6b0c4de4d9f",
      developerComment: "Shown before route tracking begins.",
      occurrences: [
        { file: "Trail/StartTrailView.swift", line: 24, symbol: "body" },
      ],
      stale: false,
      translations: [
        {
          locale: "es-ES",
          value: "Iniciar una ruta nueva",
          origin: "manual",
          status: "approved",
          updatedAt: "2026-08-20T16:20:00.000Z",
          sourceTextHash:
            "sha256:d202341227e1ba326dc9e680c913a2db1e52dba6433d7739782ab6b0c4de4d9f",
        },
        {
          locale: "fr-FR",
          value: "Commencer un nouveau sentier",
          origin: "manual",
          status: "approved",
          updatedAt: "2026-08-19T11:14:00.000Z",
          sourceTextHash:
            "sha256:d202341227e1ba326dc9e680c913a2db1e52dba6433d7739782ab6b0c4de4d9f",
        },
      ],
    },
    {
      stableKey: "trail_distance_label",
      sourceText: "Distance",
      sourceTextHash:
        "sha256:34afc2842b50f560b40de94f94c6686840a8b1b16b06ae56275d90a485fca30d",
      developerComment: null,
      occurrences: [
        { file: "Trail/TrailSummaryView.swift", line: 41, symbol: "summary" },
      ],
      stale: false,
      translations: [
        {
          locale: "es-ES",
          value: "Distancia",
          origin: "manual",
          status: "approved",
          updatedAt: "2026-08-18T09:30:00.000Z",
          sourceTextHash:
            "sha256:34afc2842b50f560b40de94f94c6686840a8b1b16b06ae56275d90a485fca30d",
        },
      ],
    },
  ],
});
