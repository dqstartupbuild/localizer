import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { AppShell } from "~/features/dashboard/components/AppShell";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { Panel } from "~/features/dashboard/components/Panel";
import { getProject } from "~/server/localizer/services/getProject";
import { requireDevelopmentWorkspace } from "~/server/localizer/services/requireDevelopmentWorkspace";
import { createTargetRepositoryInitCommand } from "~/server/localizer/cli/createTargetRepositoryInitCommand";
import { createTargetRepositorySyncCommand } from "~/server/localizer/cli/createTargetRepositorySyncCommand";
import { getLocalDashboardOrigin } from "~/server/localizer/cli/getLocalDashboardOrigin";
import { ProductionPreviewProjectOverviewPage } from "~/features/dashboard/pages/ProductionPreviewProjectOverviewPage";
import { getProductionPreviewProject } from "~/server/localizer/preview/getProductionPreviewProject";
import { resolveDashboardWorkspace } from "~/server/localizer/workspace/resolveDashboardWorkspace";

export const dynamic = "force-dynamic";

export default async function ProjectOverviewRoute({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const projectId = (await params).projectId;
  if (resolveDashboardWorkspace().mode === "public-preview") {
    const project = getProductionPreviewProject(projectId);
    if (!project) notFound();
    return <ProductionPreviewProjectOverviewPage project={project} />;
  }
  requireDevelopmentWorkspace();
  const project = await getProject(projectId);
  if (!project) notFound();
  const dashboardOrigin = getLocalDashboardOrigin(await headers());
  const command = createTargetRepositoryInitCommand(
    project.id,
    dashboardOrigin,
  );
  const syncCommand = createTargetRepositorySyncCommand();
  const activeCount = project.strings.filter((item) => !item.stale).length;
  const translated = project.strings.filter(
    (item) => !item.stale && item.translations.length > 0,
  ).length;
  return (
    <AppShell dashboardMode="local" activeProjectId={project.id}>
      <PageHeader
        eyebrow={project.name}
        title="Project overview"
        description={
          project.analysis
            ? "This project is connected. Review its latest extracted strings, save translations, then sync a native String Catalog."
            : "This project is waiting for its first analysis from the Localizer CLI."
        }
        actions={
          <Link
            href={`/projects/${project.id}/localizations`}
            className="rounded-md bg-[#08766F] px-4 py-2 text-sm font-semibold text-white"
          >
            Review strings
          </Link>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Panel title="Source strings">
          <p className="text-3xl font-semibold">{activeCount}</p>
          <p className="mt-1 text-sm text-[#6B7280]">
            from the latest accepted analysis
          </p>
        </Panel>
        <Panel title="Manual translations">
          <p className="text-3xl font-semibold">{translated}</p>
          <p className="mt-1 text-sm text-[#6B7280]">
            source strings with an approved value
          </p>
        </Panel>
        <Panel title="Revision">
          <p className="text-3xl font-semibold">{project.revision}</p>
          <p className="mt-1 text-sm text-[#6B7280]">
            changes are protected from stale edits
          </p>
        </Panel>
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(320px,.65fr)]">
        <Panel title="Connect your iOS repository">
          <p className="mb-3 text-sm leading-6 text-[#6B7280]">
            Run this from the repository root. It creates local configuration
            and uploads the first conservative SwiftUI scan.
          </p>
          <code className="block overflow-x-auto rounded-md bg-[#17201f] p-4 text-sm text-white">
            {command}
          </code>
          <p className="mt-3 text-xs text-[#6B7280]">
            Use <code>{syncCommand}</code> after saving translations to generate{" "}
            <code>Localizer/Generated/Localizer.xcstrings</code>.
          </p>
        </Panel>
        <Panel title="Latest analysis">
          {project.analysis ? (
            <div className="space-y-2 text-sm text-[#6B7280]">
              <p>
                <span className="font-semibold text-[#111827]">Run:</span>{" "}
                {project.analysis.runId}
              </p>
              <p>
                <span className="font-semibold text-[#111827]">CLI:</span>{" "}
                {project.analysis.cliVersion}
              </p>
              <p>
                <span className="font-semibold text-[#111827]">Received:</span>{" "}
                {new Date(project.analysis.receivedAt).toLocaleString()}
              </p>
            </div>
          ) : (
            <p className="text-sm leading-6 text-[#6B7280]">
              No analysis has arrived yet. The dashboard cannot scan your Mac by
              itself, so run the command shown here from the iOS repository.
            </p>
          )}
        </Panel>
      </div>
    </AppShell>
  );
}
