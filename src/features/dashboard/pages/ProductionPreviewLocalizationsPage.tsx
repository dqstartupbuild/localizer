import { AppShell } from "~/features/dashboard/components/AppShell";
import { LocalizationStatus } from "~/features/dashboard/components/LocalizationStatus";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { Panel } from "~/features/dashboard/components/Panel";
import { ProductionPreviewNotice } from "~/features/dashboard/components/ProductionPreviewNotice";
import type { ProjectState } from "~/server/localizer/schemas/projectState/ProjectState";

type ProductionPreviewLocalizationsPageProps = { project: ProjectState };

export function ProductionPreviewLocalizationsPage({
  project,
}: ProductionPreviewLocalizationsPageProps) {
  return (
    <AppShell dashboardMode="public-preview" activeProjectId={project.id}>
      <PageHeader
        title="Translations"
        description="See the original app text and its example translations."
      />
      <ProductionPreviewNotice />
      <div className="space-y-4">
        {project.strings.map((source, index) => (
          <Panel key={source.stableKey} title={`App text ${index + 1}`}>
            <p className="text-sm font-semibold break-words text-[#111827]">
              {source.sourceText}
            </p>
            <p className="mt-2 text-xs text-[#6B7280]">
              Key: {source.stableKey}
            </p>
            <p className="mt-2 text-xs break-words text-[#6B7280]">
              Found in{" "}
              {source.occurrences
                .map((item) => `${item.file}:${item.line}`)
                .join(", ")}
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {source.translations.map((translation) => (
                <div
                  key={translation.locale}
                  className="rounded-lg bg-[#F7F9F8] p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[#111827]">
                      {translation.locale}
                    </p>
                    <LocalizationStatus status={translation.status} />
                  </div>
                  <p className="mt-2 text-sm text-[#4B5563]">
                    {translation.value}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </AppShell>
  );
}
