import { AppShell } from "~/features/dashboard/components/AppShell";
import { CreateProjectForm } from "~/features/dashboard/components/CreateProjectForm";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { Panel } from "~/features/dashboard/components/Panel";
import { ProductionPreviewNewProjectPage } from "~/features/dashboard/pages/ProductionPreviewNewProjectPage";
import { resolveDashboardWorkspace } from "~/server/localizer/workspace/resolveDashboardWorkspace";

export const dynamic = "force-dynamic";

export default async function NewProjectRoute() {
  if (resolveDashboardWorkspace().mode === "public-preview")
    return <ProductionPreviewNewProjectPage />;
  return (
    <AppShell dashboardMode="local">
      <PageHeader
        title="Create project"
        description="Start here. Localizer will keep this project in your local workspace, with no sign-in required during development."
      />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,.8fr)_minmax(320px,.55fr)]">
        <Panel title="Project details">
          <CreateProjectForm />
        </Panel>
        <Panel title="What happens next">
          <ol className="space-y-3 text-sm leading-6 text-[#6B7280]">
            <li>1. Create the project.</li>
            <li>2. Copy the project command from its overview.</li>
            <li>3. Run it inside your iOS repository.</li>
            <li>
              4. Review source strings here and sync the generated catalog back.
            </li>
          </ol>
        </Panel>
      </div>
    </AppShell>
  );
}
