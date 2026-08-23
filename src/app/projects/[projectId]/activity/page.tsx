import { notFound } from "next/navigation";
import { AppShell } from "~/features/dashboard/components/AppShell";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { Panel } from "~/features/dashboard/components/Panel";
import { getProject } from "~/server/localizer/services/getProject";
import { requireDevelopmentWorkspace } from "~/server/localizer/services/requireDevelopmentWorkspace";
import { ProductionPreviewActivityPage } from "~/features/dashboard/pages/ProductionPreviewActivityPage";
import { getProductionPreviewProject } from "~/server/localizer/preview/getProductionPreviewProject";
import { resolveDashboardWorkspace } from "~/server/localizer/workspace/resolveDashboardWorkspace";

export const dynamic = "force-dynamic";

export default async function ActivityRoute({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const projectId = (await params).projectId;
  if (resolveDashboardWorkspace().mode === "public-preview") {
    const project = getProductionPreviewProject(projectId);
    if (!project) notFound();
    return <ProductionPreviewActivityPage project={project} />;
  }
  requireDevelopmentWorkspace();
  const project = await getProject(projectId);
  if (!project) notFound();
  const translations = project.strings
    .flatMap((source) =>
      source.translations.map((translation) => ({
        stableKey: source.stableKey,
        stale: source.stale,
        ...translation,
      })),
    )
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  return (
    <AppShell dashboardMode="local" activeProjectId={project.id}>
      <PageHeader
        eyebrow={project.name}
        title="Activity"
        description="See when the CLI scanned this app and when translations were saved."
      />
      <div className="space-y-4">
        {project.analysis ? (
          <Panel title="Latest CLI scan">
            <p className="text-sm text-[#111827]">
              Completed {project.analysis.runId}
            </p>
            <p className="mt-1 text-sm text-[#6B7280]">
              {new Date(project.analysis.receivedAt).toLocaleString()} ·{" "}
              {project.strings.filter((item) => !item.stale).length} current
              strings · CLI {project.analysis.cliVersion}
            </p>
          </Panel>
        ) : (
          <Panel title="No CLI activity yet">
            <p className="text-sm text-[#6B7280]">
              Run the project&apos;s setup command from the overview to scan the
              app.
            </p>
          </Panel>
        )}
        {translations.map((translation) => (
          <Panel
            key={`${translation.stableKey}-${translation.locale}`}
            title={
              translation.stale
                ? `${translation.locale} text is no longer in the app`
                : translation.status === "needs_review"
                  ? `${translation.locale} translation needs review`
                  : `Saved ${translation.locale} translation`
            }
          >
            <p className="text-sm text-[#111827]">
              {translation.stableKey}: {translation.value}
            </p>
            <p className="mt-1 text-xs text-[#6B7280]">
              {new Date(translation.updatedAt).toLocaleString()} ·{" "}
              {translation.stale
                ? "this text is no longer in the latest scan"
                : translation.status === "needs_review"
                  ? "check this translation again"
                  : "ready to sync"}
            </p>
          </Panel>
        ))}
      </div>
    </AppShell>
  );
}
