import Link from "next/link";
import { AppShell } from "~/features/dashboard/components/AppShell";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { Panel } from "~/features/dashboard/components/Panel";
import { ProductionPreviewProjectsPage } from "~/features/dashboard/pages/ProductionPreviewProjectsPage";
import { listProjects } from "~/server/localizer/services/listProjects";
import { resolveDashboardWorkspace } from "~/server/localizer/workspace/resolveDashboardWorkspace";

export const dynamic = "force-dynamic";

export default async function ProjectsRoute() {
  if (resolveDashboardWorkspace().mode === "public-preview")
    return <ProductionPreviewProjectsPage />;
  const projects = await listProjects();
  return (
    <AppShell dashboardMode="local">
      <PageHeader
        title="Projects"
        description="Your projects are saved on this computer. Create one, then run its CLI command inside your iOS project."
        actions={
          <Link
            href="/projects/new"
            className="rounded-md bg-[#08766F] px-4 py-2 text-sm font-semibold text-white"
          >
            New project
          </Link>
        }
      />
      <div className="grid gap-4 xl:grid-cols-2">
        {projects.map((project) => (
          <Panel key={project.id} title={project.name}>
            <p className="text-sm text-[#6B7280]">
              {project.analysis
                ? `${project.strings.filter((item) => !item.stale).length} app strings · version ${project.revision}`
                : "Waiting for the CLI to scan this app"}
            </p>
            <Link
              href={`/projects/${project.id}/overview`}
              className="mt-4 inline-block text-sm font-semibold text-[#08766F]"
            >
              Open project
            </Link>
          </Panel>
        ))}
      </div>
      {projects.length === 0 ? (
        <div className="mt-4">
          <Panel title="No projects yet">
            <p className="text-sm text-[#6B7280]">
              Create a project, then run the command it gives you inside your
              iOS project.
            </p>
          </Panel>
        </div>
      ) : null}
    </AppShell>
  );
}
