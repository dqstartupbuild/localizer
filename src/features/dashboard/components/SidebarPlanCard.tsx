import { type PlanUsage } from "~/features/dashboard/types/dashboardData";
import { ProgressBar } from "~/features/dashboard/components/ProgressBar";

type SidebarPlanCardProps = {
  usages: PlanUsage[];
};

export function SidebarPlanCard({ usages }: SidebarPlanCardProps) {
  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#111827]">Current Plan</h3>
        <span className="rounded-md bg-[#DDF8EE] px-2 py-1 text-[11px] font-semibold text-[#08766F]">
          Pro
        </span>
      </div>
      <div className="space-y-4">
        {usages.map((usage) => (
          <div key={usage.label} className="space-y-2">
            <div>
              <p className="text-[11px] text-[#6B7280]">{usage.label}</p>
              <p className="mt-1 text-xs font-semibold text-[#111827]">
                {usage.value}
              </p>
            </div>
            <ProgressBar value={usage.percentage} />
          </div>
        ))}
      </div>
    </div>
  );
}
