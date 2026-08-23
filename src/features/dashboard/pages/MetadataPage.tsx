import { RefreshCw, WandSparkles } from "lucide-react";
import { type DashboardData } from "~/features/dashboard/types/dashboardData";
import { AppShell } from "~/features/dashboard/components/AppShell";
import { MetadataPanel } from "~/features/dashboard/components/MetadataPanel";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { Panel } from "~/features/dashboard/components/Panel";
import { ToolbarButton } from "~/features/dashboard/components/ToolbarButton";

type MetadataPageProps = {
  dashboard: DashboardData;
};

export function MetadataPage({ dashboard }: MetadataPageProps) {
  return (
    <AppShell dashboardMode="local">
      <PageHeader
        eyebrow="Calisthenics Guppy"
        title="App Store Metadata"
        description="Paste source App Store copy, generate App Store-quality localized metadata, and review field limits before export."
        actions={
          <div className="flex gap-2">
            <ToolbarButton icon={<RefreshCw size={14} />}>
              Re-run Metadata
            </ToolbarButton>
            <ToolbarButton icon={<WandSparkles size={14} />} variant="primary">
              Generate Locales
            </ToolbarButton>
          </div>
        }
      />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <MetadataPanel fields={dashboard.metadataFields} />
        <Panel title="Field Rules">
          <div className="space-y-3">
            {[
              "Subtitle and promotional text must stay concise.",
              "Keywords preserve comma-separated intent per locale.",
              "In-app purchase names and descriptions are handled separately.",
              "App Store Connect import and export are future work.",
            ].map((rule) => (
              <div
                key={rule}
                className="rounded-lg bg-[#F7F9F8] p-3 text-sm leading-6 text-[#374151]"
              >
                {rule}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
