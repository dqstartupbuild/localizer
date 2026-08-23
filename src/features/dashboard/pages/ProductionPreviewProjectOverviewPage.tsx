import Link from "next/link";

import { AppShell } from "~/features/dashboard/components/AppShell";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { Panel } from "~/features/dashboard/components/Panel";
import { ProductionPreviewNotice } from "~/features/dashboard/components/ProductionPreviewNotice";
import type { ProjectState } from "~/server/localizer/schemas/projectState/ProjectState";

type ProductionPreviewProjectOverviewPageProps = { project: ProjectState };

export function ProductionPreviewProjectOverviewPage({
  project,
}: ProductionPreviewProjectOverviewPageProps) {
  const translated = project.strings.filter(
    (source) => source.translations.length > 0,
  ).length;

  return (
    <AppShell dashboardMode="public-preview" activeProjectId={project.id}>
      <PageHeader
        title={project.name}
        description="This is a sample project. Nothing here is your data, and nothing can be changed."
      />
      <ProductionPreviewNotice />
      <div className="grid gap-4 md:grid-cols-3">
        <Panel title="App strings">
          <p className="text-3xl font-semibold">{project.strings.length}</p>
          <p className="mt-1 text-sm text-[#6B7280]">found in this app</p>
        </Panel>
        <Panel title="Translated strings">
          <p className="text-3xl font-semibold">{translated}</p>
          <p className="mt-1 text-sm text-[#6B7280]">
            with at least one translation
          </p>
        </Panel>
        <Panel title="Sample version">
          <p className="text-3xl font-semibold">{project.revision}</p>
          <p className="mt-1 text-sm text-[#6B7280]">
            version of this sample data
          </p>
        </Panel>
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Panel title="Languages">
          <p className="text-sm text-[#6B7280]">
            {project.locales.join(" · ")}
          </p>
        </Panel>
        <Panel title="More pages">
          <Link
            href={`/projects/${project.id}/localizations`}
            className="text-sm font-semibold text-[#08766F]"
          >
            View translations
          </Link>
          <Link
            href={`/projects/${project.id}/activity`}
            className="ml-5 text-sm font-semibold text-[#08766F]"
          >
            View activity
          </Link>
        </Panel>
      </div>
    </AppShell>
  );
}
