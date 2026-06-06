import {
  type ScreenCandidate,
  type ScreenDiscoveryStat,
} from "~/features/dashboard/types/dashboardData";
import { Panel } from "~/features/dashboard/components/Panel";
import { ScreenCandidateRow } from "~/features/dashboard/components/ScreenCandidateRow";

type ScreenDiscoveryPanelProps = {
  stats: ScreenDiscoveryStat[];
  screens: ScreenCandidate[];
};

export function ScreenDiscoveryPanel({
  stats,
  screens,
}: ScreenDiscoveryPanelProps) {
  return (
    <Panel
      title="Screen Discovery"
      eyebrow="Calisthenics Guppy / Screen Discovery"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-5 border-b border-[#E5E7EB]">
          <button
            type="button"
            className="h-9 border-b-2 border-[#0F8F86] text-xs font-medium text-[#0F8F86]"
          >
            Screens
          </button>
          <button
            type="button"
            className="h-9 border-b-2 border-transparent text-xs font-medium text-[#6B7280]"
          >
            States
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-md bg-[#F7F9F8] px-3 py-2">
              <p className="truncate text-[11px] text-[#6B7280]">
                {stat.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-[#111827]">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-[#E5E7EB] px-3">
          {screens.map((screen) => (
            <ScreenCandidateRow key={screen.id} screen={screen} />
          ))}
        </div>
        <button
          type="button"
          className="h-10 w-full rounded-md bg-[#0F8F86] text-xs font-semibold text-white transition hover:bg-[#0D7D75]"
        >
          Review & Continue to States
        </button>
      </div>
    </Panel>
  );
}
