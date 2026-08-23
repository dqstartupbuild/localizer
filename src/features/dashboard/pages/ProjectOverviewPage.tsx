import { Play, RefreshCw, Terminal } from "lucide-react";
import { type DashboardData } from "~/features/dashboard/types/dashboardData";
import { AppShell } from "~/features/dashboard/components/AppShell";
import { OverviewStatCard } from "~/features/dashboard/components/OverviewStatCard";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { Panel } from "~/features/dashboard/components/Panel";
import { ProgressBar } from "~/features/dashboard/components/ProgressBar";
import { ToolbarButton } from "~/features/dashboard/components/ToolbarButton";
import { ToolbarLink } from "~/features/dashboard/components/ToolbarLink";
import { WorkflowStrip } from "~/features/dashboard/components/WorkflowStrip";

type ProjectOverviewPageProps = {
  dashboard: DashboardData;
};

export function ProjectOverviewPage({ dashboard }: ProjectOverviewPageProps) {
  return (
    <AppShell dashboardMode="local">
      <PageHeader
        eyebrow="Calisthenics Guppy"
        title="Project Overview"
        description="Track localization readiness, CLI setup, selected locales, and the next actions needed before generating resources and screenshots."
        actions={
          <div className="flex gap-2">
            <ToolbarButton icon={<RefreshCw size={14} />}>
              Re-run Analysis
            </ToolbarButton>
            <ToolbarButton icon={<Play size={14} />} variant="primary">
              Generate
            </ToolbarButton>
          </div>
        }
      />
      <div className="grid gap-4 lg:grid-cols-4">
        {dashboard.overviewStats.map((stat) => (
          <OverviewStatCard key={stat.label} stat={stat} />
        ))}
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,0.85fr)_minmax(420px,0.55fr)]">
        <Panel title="Setup Workflow">
          <div className="space-y-3">
            {dashboard.setupSteps.map((step) => (
              <div
                key={step.title}
                className="flex items-start justify-between gap-4 rounded-lg border border-[#E5E7EB] p-3"
              >
                <div>
                  <h3 className="text-sm font-semibold text-[#111827]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                    {step.description}
                  </p>
                </div>
                <span className="rounded-full bg-[#E8F6F3] px-2.5 py-1 text-xs font-semibold text-[#08766F]">
                  {step.status}
                </span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Local CLI Command">
          <div className="rounded-lg bg-[#111827] p-4 text-white">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Terminal size={16} />
              Sync this project
            </div>
            <code className="block rounded-md bg-black/20 p-3 text-sm">
              npx localizer analyze
            </code>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <ToolbarLink
              href="/projects/calisthenics-guppy/screen-discovery"
              variant="primary"
            >
              Review Screens
            </ToolbarLink>
            <ToolbarLink href="/projects/calisthenics-guppy/localizations">
              Review Strings
            </ToolbarLink>
          </div>
        </Panel>
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,0.7fr)_minmax(0,0.7fr)]">
        <Panel title="Supported Locales">
          <div className="grid gap-3 md:grid-cols-2">
            {dashboard.supportedLocales.map((locale) => (
              <div
                key={locale.code}
                className="rounded-lg border border-[#E5E7EB] p-3"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">
                      {locale.name}
                    </p>
                    <p className="text-xs text-[#6B7280]">{locale.code}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#111827]">
                    {locale.enabled ? `${locale.completion}%` : "Off"}
                  </span>
                </div>
                <ProgressBar value={locale.enabled ? locale.completion : 0} />
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Recent Activity">
          <div className="space-y-3">
            {dashboard.activityEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="rounded-lg border border-[#E5E7EB] p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-[#111827]">
                    {event.title}
                  </h3>
                  <span className="text-xs text-[#6B7280]">
                    {event.timestamp}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <div className="mt-4">
        <WorkflowStrip steps={dashboard.workflowSteps} />
      </div>
    </AppShell>
  );
}
