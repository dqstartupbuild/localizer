import { RefreshCw, ScanSearch } from "lucide-react";
import { type DashboardData } from "~/features/dashboard/types/dashboardData";
import { AppShell } from "~/features/dashboard/components/AppShell";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { Panel } from "~/features/dashboard/components/Panel";
import { ScreenDiscoveryPanel } from "~/features/dashboard/components/ScreenDiscoveryPanel";
import { ToolbarButton } from "~/features/dashboard/components/ToolbarButton";

type ScreenDiscoveryPageProps = {
  dashboard: DashboardData;
};

export function ScreenDiscoveryPage({ dashboard }: ScreenDiscoveryPageProps) {
  return (
    <AppShell dashboardMode="local">
      <PageHeader
        eyebrow="Calisthenics Guppy"
        title="Screen Discovery"
        description="Review the screens and meaningful states Localizer found through Swift parsing, navigation graph analysis, and AI-assisted classification."
        actions={
          <div className="flex gap-2">
            <ToolbarButton icon={<RefreshCw size={14} />}>
              Re-analyze
            </ToolbarButton>
            <ToolbarButton icon={<ScanSearch size={14} />} variant="primary">
              Confirm Selection
            </ToolbarButton>
          </div>
        }
      />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,0.8fr)_minmax(420px,0.7fr)]">
        <ScreenDiscoveryPanel
          stats={dashboard.screenStats}
          screens={dashboard.screenCandidates}
        />
        <Panel title="State Candidates" eyebrow="Suggested screenshot states">
          <div className="space-y-3">
            {dashboard.stateCandidates.map((state) => (
              <div
                key={state.id}
                className="rounded-lg border border-[#E5E7EB] bg-white p-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-[#111827]">
                      {state.stateName}
                    </h3>
                    <p className="mt-1 text-xs text-[#6B7280]">
                      {state.screenName} / {state.setupStrategy}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      state.selected
                        ? "bg-[#DDF8EE] text-[#08766F]"
                        : "bg-[#F3F4F6] text-[#6B7280]"
                    }`}
                  >
                    {state.selected ? "Selected" : "Excluded"}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-[#6B7280]">Confidence</span>
                  <span className="font-semibold text-[#111827]">
                    {state.confidence}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
