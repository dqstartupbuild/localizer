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
        description="A representative history for the bundled project, not a record of your work."
      />
      <ProductionPreviewNotice />
      <div className="space-y-4">
        <Panel title="Sample analysis accepted">
          <p className="text-sm text-[#111827]">{project.analysis?.runId}</p>
          <p className="mt-1 text-sm text-[#6B7280]">
            Sample CLI {project.analysis?.cliVersion} · {project.strings.length}{" "}
            source strings
          </p>
        </Panel>
        {project.strings.flatMap((source) =>
          source.translations.map((translation) => (
            <Panel
              key={`${source.stableKey}-${translation.locale}`}
              title={`Sample ${translation.locale} translation approved`}
            >
              <p className="text-sm text-[#111827]">
                {source.stableKey}: {translation.value}
              </p>
              <p className="mt-1 text-xs text-[#6B7280]">
                Bundled sample record
              </p>
            </Panel>
          )),
        )}
      </div>
    </AppShell>
  );
}
