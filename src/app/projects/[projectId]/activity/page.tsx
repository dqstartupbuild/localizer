import { notFound } from "next/navigation";
import { AppShell } from "~/features/dashboard/components/AppShell";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { Panel } from "~/features/dashboard/components/Panel";
import { createLocalDashboard } from "~/features/dashboard/data/createLocalDashboard";
import { getProject } from "~/server/localizer/services/getProject";
import { requireDevelopmentWorkspace } from "~/server/localizer/services/requireDevelopmentWorkspace";

export const dynamic = "force-dynamic";

export default async function ActivityRoute({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  requireDevelopmentWorkspace();
  const project = await getProject((await params).projectId);
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
    <AppShell dashboard={createLocalDashboard()} activeProjectId={project.id}>
      <PageHeader
        eyebrow={project.name}
        title="Activity"
        description="A local record of accepted analyses and saved manual translations. Future hosted activity will include jobs, reviews, and pull requests."
      />
      <div className="space-y-4">
        {project.analysis ? (
          <Panel title="Latest CLI analysis">
            <p className="text-sm text-[#111827]">
              Accepted {project.analysis.runId}
            </p>
            <p className="mt-1 text-sm text-[#6B7280]">
              {new Date(project.analysis.receivedAt).toLocaleString()} ·{" "}
              {project.strings.filter((item) => !item.stale).length} active
              strings · CLI {project.analysis.cliVersion}
            </p>
          </Panel>
        ) : (
          <Panel title="No CLI activity yet">
            <p className="text-sm text-[#6B7280]">
              Run the project’s init command from the overview to send the first
              analysis.
            </p>
          </Panel>
        )}
        {translations.map((translation) => (
          <Panel
            key={`${translation.stableKey}-${translation.locale}`}
            title={
              translation.stale
                ? `${translation.locale} translation is stale`
                : translation.status === "needs_review"
                  ? `${translation.locale} translation needs review`
                  : `Saved ${translation.locale} translation`
            }
          >
            <p className="text-sm text-[#111827]">
              {translation.stableKey}: {translation.value}
            </p>
            <p className="mt-1 text-xs text-[#6B7280]">
              {new Date(translation.updatedAt).toLocaleString()} · manual ·{" "}
              {translation.stale
                ? "source is no longer in the latest analysis"
                : translation.status === "needs_review"
                  ? "waiting for source review"
                  : "approved for sync"}
            </p>
          </Panel>
        ))}
      </div>
    </AppShell>
  );
}
