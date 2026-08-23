import { AppShell } from "~/features/dashboard/components/AppShell";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { Panel } from "~/features/dashboard/components/Panel";
import { ProductionPreviewNotice } from "~/features/dashboard/components/ProductionPreviewNotice";
import type { ProjectState } from "~/server/localizer/schemas/projectState/ProjectState";

type ProductionPreviewActivityPageProps = { project: ProjectState };

export function ProductionPreviewActivityPage({
  project,
}: ProductionPreviewActivityPageProps) {
  return (
    <AppShell dashboardMode="public-preview" activeProjectId={project.id}>
      <PageHeader
        title="Activity"
        description="These are example events. They are not your project history."
      />
      <ProductionPreviewNotice />
      <div className="space-y-4">
        <Panel title="Sample scan completed">
          <p className="text-sm text-[#111827]">{project.analysis?.runId}</p>
          <p className="mt-1 text-sm text-[#6B7280]">
            CLI {project.analysis?.cliVersion} found {project.strings.length}{" "}
            app strings
          </p>
        </Panel>
        {project.strings.flatMap((source) =>
          source.translations.map((translation) => (
            <Panel
              key={`${source.stableKey}-${translation.locale}`}
              title={`${translation.locale} translation saved`}
            >
              <p className="text-sm text-[#111827]">
                {source.stableKey}: {translation.value}
              </p>
              <p className="mt-1 text-xs text-[#6B7280]">Example event</p>
            </Panel>
          )),
        )}
      </div>
    </AppShell>
  );
}
