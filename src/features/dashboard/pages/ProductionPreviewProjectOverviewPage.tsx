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
        description="A read-only sample workspace using bundled, validated project data."
      />
      <ProductionPreviewNotice />
      <div className="grid gap-4 md:grid-cols-3">
        <Panel title="Source strings">
          <p className="text-3xl font-semibold">{project.strings.length}</p>
          <p className="mt-1 text-sm text-[#6B7280]">in this sample analysis</p>
        </Panel>
        <Panel title="Translated strings">
          <p className="text-3xl font-semibold">{translated}</p>
          <p className="mt-1 text-sm text-[#6B7280]">
            with a sample translation
          </p>
        </Panel>
        <Panel title="Revision">
          <p className="text-3xl font-semibold">{project.revision}</p>
          <p className="mt-1 text-sm text-[#6B7280]">
            bundled preview revision
          </p>
        </Panel>
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Panel title="Included locales">
          <p className="text-sm text-[#6B7280]">
            {project.locales.join(" · ")}
          </p>
        </Panel>
        <Panel title="Explore the sample">
          <Link
            href={`/projects/${project.id}/localizations`}
            className="text-sm font-semibold text-[#08766F]"
          >
            Review sample strings
          </Link>
          <Link
            href={`/projects/${project.id}/activity`}
            className="ml-5 text-sm font-semibold text-[#08766F]"
          >
            See activity
          </Link>
        </Panel>
      </div>
    </AppShell>
  );
}
