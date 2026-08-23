import Link from "next/link";

import { AppShell } from "~/features/dashboard/components/AppShell";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { Panel } from "~/features/dashboard/components/Panel";
import { ProductionPreviewNotice } from "~/features/dashboard/components/ProductionPreviewNotice";
import { listProductionPreviewProjects } from "~/server/localizer/preview/listProductionPreviewProjects";

export function ProductionPreviewProjectsPage() {
  const projects = listProductionPreviewProjects();

  return (
    <AppShell dashboardMode="public-preview">
      <PageHeader
        title="Projects"
        description="See the text and translations Localizer found in a sample iOS app."
      />
      <ProductionPreviewNotice />
      <div className="grid gap-4 xl:grid-cols-2">
        {projects.map((project) => (
          <Panel key={project.id} title={project.name}>
            <p className="text-sm text-[#6B7280]">
              {project.strings.length} app strings ·{" "}
              {project.locales.length - 1} translation languages
            </p>
            <Link
              href={`/projects/${project.id}/overview`}
              className="mt-4 inline-block text-sm font-semibold text-[#08766F]"
            >
              Open sample project
            </Link>
          </Panel>
        ))}
      </div>
    </AppShell>
  );
}
