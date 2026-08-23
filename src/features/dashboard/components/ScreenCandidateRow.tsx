import { Check, MoreVertical } from "lucide-react";
import { type ScreenCandidate } from "~/features/dashboard/types/dashboardData";
import { ScreenThumb } from "~/features/dashboard/components/ScreenThumb";
import { StatusBadge } from "~/features/dashboard/components/StatusBadge";

type ScreenCandidateRowProps = {
  screen: ScreenCandidate;
};

export function ScreenCandidateRow({ screen }: ScreenCandidateRowProps) {
  return (
    <div className="grid grid-cols-[22px_40px_minmax(0,1fr)_auto] items-center gap-3 border-b border-[#E5E7EB] py-3 last:border-b-0">
      <button
        type="button"
        aria-label={`${screen.selected ? "Deselect" : "Select"} ${screen.name}`}
        className={`flex size-5 items-center justify-center rounded border ${
          screen.selected
            ? "border-[#08766F] bg-[#08766F] text-white"
            : "border-[#D1D5DB] bg-white text-transparent"
        }`}
      >
        <Check size={13} strokeWidth={3} />
      </button>
      <ScreenThumb variant={screen.previewVariant} />
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-xs font-semibold text-[#111827]">
            {screen.name}
          </h3>
          <a className="text-[11px] font-medium text-[#08766F]" href="#">
            View
          </a>
        </div>
        <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-[#6B7280]">
          {screen.description}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <StatusBadge status={screen.status} />
          <p className="mt-2 text-xs font-semibold text-[#111827]">
            {screen.confidence}%
          </p>
        </div>
        <button
          type="button"
          aria-label={`Open ${screen.name} actions`}
          className="rounded-md p-1 text-[#6B7280] transition hover:bg-[#F7F9F8]"
        >
          <MoreVertical size={15} />
        </button>
      </div>
    </div>
  );
}
