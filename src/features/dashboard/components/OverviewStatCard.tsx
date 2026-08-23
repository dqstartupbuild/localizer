import { type OverviewStat } from "~/features/dashboard/types/dashboardData";

type OverviewStatCardProps = {
  stat: OverviewStat;
};

const toneClasses = {
  teal: "border-[#08766F] bg-[#E8F6F3] text-[#08766F]",
  gold: "border-[#F2C94C] bg-[#FFF7D6] text-[#8A6400]",
  slate: "border-[#E5E7EB] bg-[#F7F9F8] text-[#374151]",
};

export function OverviewStatCard({ stat }: OverviewStatCardProps) {
  return (
    <article className="rounded-lg border border-[#E5E7EB] bg-white p-4">
      <div
        className={`mb-4 inline-flex rounded-md border px-2.5 py-1 text-xs font-medium ${toneClasses[stat.tone]}`}
      >
        {stat.label}
      </div>
      <p className="text-2xl font-semibold text-[#111827]">{stat.value}</p>
      <p className="mt-2 text-xs leading-5 text-[#6B7280]">{stat.detail}</p>
    </article>
  );
}
