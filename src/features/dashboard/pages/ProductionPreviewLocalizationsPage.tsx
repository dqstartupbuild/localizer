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
        title="Localizations"
        description="Read the source strings and approved example translations in this sample project."
      />
      <ProductionPreviewNotice />
      <div className="space-y-4">
        {project.strings.map((source) => (
          <Panel key={source.stableKey} title={source.stableKey}>
            <p className="text-sm font-semibold text-[#111827]">
              {source.sourceText}
            </p>
            <p className="mt-2 text-xs text-[#6B7280]">
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
