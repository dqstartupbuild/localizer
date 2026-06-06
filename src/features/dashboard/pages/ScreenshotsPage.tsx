import { Camera, RefreshCw } from "lucide-react";
import { type DashboardData } from "~/features/dashboard/types/dashboardData";
import { AppShell } from "~/features/dashboard/components/AppShell";
import { OverviewStatCard } from "~/features/dashboard/components/OverviewStatCard";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { Panel } from "~/features/dashboard/components/Panel";
import { ScreenshotsPanel } from "~/features/dashboard/components/ScreenshotsPanel";
import { ToolbarButton } from "~/features/dashboard/components/ToolbarButton";

type ScreenshotsPageProps = {
  dashboard: DashboardData;
};

export function ScreenshotsPage({ dashboard }: ScreenshotsPageProps) {
  return (
    <AppShell dashboard={dashboard}>
      <PageHeader
        eyebrow="Calisthenics Guppy"
        title="Screenshots"
        description="Generate and review localized in-app screenshots captured through generated XCUITests, simulator automation, and selected screen states."
        actions={
          <div className="flex gap-2">
            <ToolbarButton icon={<RefreshCw size={14} />}>
              Re-run Failed
            </ToolbarButton>
            <ToolbarButton icon={<Camera size={14} />} variant="primary">
              Generate Screenshots
            </ToolbarButton>
          </div>
        }
      />
      <div className="mb-4 grid gap-4 lg:grid-cols-4">
        {dashboard.overviewStats.map((stat) => (
          <OverviewStatCard key={stat.label} stat={stat} />
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <ScreenshotsPanel groups={dashboard.screenshotGroups} />
        <Panel title="Run Details">
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-xs font-medium text-[#6B7280]">Device</p>
              <p className="mt-1 font-semibold text-[#111827]">iPhone 16 Pro</p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6B7280]">Matrix</p>
              <p className="mt-1 font-semibold text-[#111827]">
                9 locales x 10 screens
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6B7280]">Capture Mode</p>
              <p className="mt-1 font-semibold text-[#111827]">
                XCUITest attachments
              </p>
            </div>
            <div className="rounded-lg bg-[#F7F9F8] p-3 text-xs leading-5 text-[#6B7280]">
              MVP screenshots are raw in-app captures. Device frames and App
              Store marketing layouts are intentionally excluded.
            </div>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
