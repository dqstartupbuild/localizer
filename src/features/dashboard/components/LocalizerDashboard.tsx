import { type DashboardData } from "~/features/dashboard/types/dashboardData";
import { LocalizationsPanel } from "~/features/dashboard/components/LocalizationsPanel";
import { MetadataPanel } from "~/features/dashboard/components/MetadataPanel";
import { ProjectsPanel } from "~/features/dashboard/components/ProjectsPanel";
import { ScreenDiscoveryPanel } from "~/features/dashboard/components/ScreenDiscoveryPanel";
import { ScreenshotsPanel } from "~/features/dashboard/components/ScreenshotsPanel";
import { Sidebar } from "~/features/dashboard/components/Sidebar";
import { WorkflowStrip } from "~/features/dashboard/components/WorkflowStrip";

type LocalizerDashboardProps = {
  dashboard: DashboardData;
};

export function LocalizerDashboard({ dashboard }: LocalizerDashboardProps) {
  return (
    <main className="min-h-screen bg-[#F7F9F8] text-[#111827]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar planUsages={dashboard.planUsages} user={dashboard.user} />
        <div className="min-w-0 space-y-4 p-4 lg:p-5">
          <div className="grid gap-4 xl:grid-cols-[minmax(360px,0.92fr)_minmax(560px,1.45fr)]">
            <ProjectsPanel projects={dashboard.projects} />
            <LocalizationsPanel
              tabs={dashboard.localizationTabs}
              rows={dashboard.localizationRows}
            />
          </div>
          <div className="grid gap-4 xl:grid-cols-[minmax(300px,0.82fr)_minmax(360px,1fr)_minmax(380px,1.05fr)]">
            <ScreenDiscoveryPanel
              stats={dashboard.screenStats}
              screens={dashboard.screenCandidates}
            />
            <ScreenshotsPanel groups={dashboard.screenshotGroups} />
            <MetadataPanel fields={dashboard.metadataFields} />
          </div>
          <WorkflowStrip steps={dashboard.workflowSteps} />
        </div>
      </div>
    </main>
  );
}
