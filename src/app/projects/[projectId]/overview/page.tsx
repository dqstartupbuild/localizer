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
            ? "Localizer found text in this app. Check the translations, then run sync to write them back to Xcode."
            : "Run the CLI command below so Localizer can find text in this app."
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
        <Panel title="App strings">
          <p className="text-3xl font-semibold">{activeCount}</p>
          <p className="mt-1 text-sm text-[#6B7280]">
            found by the latest scan
          </p>
        </Panel>
        <Panel title="Translated strings">
          <p className="text-3xl font-semibold">{translated}</p>
          <p className="mt-1 text-sm text-[#6B7280]">
            with a saved translation
          </p>
        </Panel>
        <Panel title="Project version">
          <p className="text-3xl font-semibold">{project.revision}</p>
          <p className="mt-1 text-sm text-[#6B7280]">number of saved changes</p>
        </Panel>
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(320px,.65fr)]">
        <Panel title="Connect your iOS project">
          <p className="mb-3 text-sm leading-6 text-[#6B7280]">
            Run this command from the top folder of your iOS project. It saves
            the Localizer setup and sends the app text to this dashboard.
          </p>
          <code className="block overflow-x-auto rounded-md bg-[#17201f] p-4 text-sm text-white">
            {command}
          </code>
          <p className="mt-3 text-xs text-[#6B7280]">
            After you save translations, run <code>{syncCommand}</code> to
            create <code>Localizer/Generated/Localizable.xcstrings</code>.
          </p>
        </Panel>
        <Panel title="Latest scan">
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
              The CLI has not scanned this app yet. Run the command shown here
              inside your iOS project.
            </p>
          )}
        </Panel>
      </div>
    </AppShell>
  );
}
