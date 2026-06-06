import { type MetricTone } from "~/features/dashboard/types/dashboardData";

type ProgressBarProps = {
  value: number;
  tone?: MetricTone;
};

const toneClasses = {
  teal: "bg-[#0F8F86]",
  gold: "bg-[#F2C94C]",
};

export function ProgressBar({ value, tone = "teal" }: ProgressBarProps) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-[#E5E7EB]">
      <div
        className={`h-full rounded-full ${toneClasses[tone]}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
