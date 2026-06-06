import { type ProjectMetric as ProjectMetricType } from "~/features/dashboard/types/dashboardData";
import { ProgressBar } from "~/features/dashboard/components/ProgressBar";

type ProjectMetricProps = {
  metric: ProjectMetricType;
};

export function ProjectMetric({ metric }: ProjectMetricProps) {
  return (
    <div className="min-w-0 border-t border-[#E5E7EB] pt-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="truncate text-[11px] text-[#6B7280]">
          {metric.label}
        </span>
        <span className="text-xs font-semibold text-[#111827]">
          {metric.value}%
        </span>
      </div>
      <ProgressBar value={metric.value} tone={metric.tone} />
    </div>
  );
}
