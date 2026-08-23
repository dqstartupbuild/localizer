import { RefreshCw } from "lucide-react";
import { type DashboardData } from "~/features/dashboard/types/dashboardData";
import { AppShell } from "~/features/dashboard/components/AppShell";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { Panel } from "~/features/dashboard/components/Panel";
import { ToolbarButton } from "~/features/dashboard/components/ToolbarButton";

type ActivityPageProps = {
  dashboard: DashboardData;
};

const statusClasses = {
  Complete: "bg-[#DDF8EE] text-[#08766F]",
  Running: "bg-[#E8F6F3] text-[#08766F]",
  Waiting: "bg-[#F3F4F6] text-[#6B7280]",
  Failed: "bg-[#FEE2E2] text-[#B91C1C]",
};

export function ActivityPage({ dashboard }: ActivityPageProps) {
  return (
    <AppShell dashboard={dashboard}>
      <PageHeader
        eyebrow="Calisthenics Guppy"
        title="Activity"
        description="Track analysis runs, translation jobs, metadata generation, screenshot work, and actions that are waiting for developer review."
        actions={
          <ToolbarButton icon={<RefreshCw size={14} />} variant="primary">
            Refresh Activity
          </ToolbarButton>
        }
      />
      <Panel title="Project Activity">
        <div className="space-y-3">
          {dashboard.activityEvents.map((event) => (
            <article
              key={event.id}
              className="rounded-lg border border-[#E5E7EB] bg-white p-4"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-[#111827]">
                    {event.title}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-[#6B7280]">
                    {event.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#6B7280]">
                    {event.timestamp}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses[event.status]}`}
                  >
                    {event.status}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}
