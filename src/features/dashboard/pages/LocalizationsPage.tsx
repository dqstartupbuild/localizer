import { RefreshCw, WandSparkles } from "lucide-react";
import { type DashboardData } from "~/features/dashboard/types/dashboardData";
import { AppShell } from "~/features/dashboard/components/AppShell";
import { LocalizationsPanel } from "~/features/dashboard/components/LocalizationsPanel";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { Panel } from "~/features/dashboard/components/Panel";
import { StatusBadge } from "~/features/dashboard/components/StatusBadge";
import { ToolbarButton } from "~/features/dashboard/components/ToolbarButton";

type LocalizationsPageProps = {
  dashboard: DashboardData;
};

export function LocalizationsPage({ dashboard }: LocalizationsPageProps) {
  return (
    <AppShell dashboard={dashboard}>
      <PageHeader
        eyebrow="Calisthenics Guppy"
        title="Localizations"
        description="Review source strings, machine translations, approvals, and manual overrides. User-edited translations stay protected during future scans."
        actions={
          <div className="flex gap-2">
            <ToolbarButton icon={<RefreshCw size={14} />}>
              Re-run Extraction
            </ToolbarButton>
            <ToolbarButton icon={<WandSparkles size={14} />} variant="primary">
              Translate Missing
            </ToolbarButton>
          </div>
        }
      />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <LocalizationsPanel
          tabs={dashboard.localizationTabs}
          rows={dashboard.localizationRows}
        />
        <Panel title="Selected String">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-[#6B7280]">Key</p>
              <p className="mt-1 text-sm font-semibold text-[#111827]">
                welcome_back_title
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6B7280]">Source</p>
              <p className="mt-1 text-sm text-[#111827]">Welcome back</p>
            </div>
            <label className="block">
              <span className="text-xs font-medium text-[#6B7280]">
                Spanish Override
              </span>
              <textarea
                defaultValue="Bienvenido de nuevo"
                rows={4}
                className="mt-2 w-full resize-none rounded-md border border-[#E5E7EB] bg-white p-3 text-sm leading-6 text-[#111827] outline-none focus:border-[#08766F]"
              />
            </label>
            <div className="flex items-center justify-between rounded-lg bg-[#F7F9F8] p-3">
              <span className="text-xs text-[#6B7280]">Current status</span>
              <StatusBadge status="Approved" />
            </div>
            <ToolbarButton variant="primary">Save Override</ToolbarButton>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
