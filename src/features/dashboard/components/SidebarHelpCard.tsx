import { ArrowRight, LifeBuoy } from "lucide-react";

export function SidebarHelpCard() {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-lg bg-[#F7F9F8] p-3 text-left transition hover:bg-[#E8F6F3]"
    >
      <span className="flex items-center gap-3">
        <span className="flex size-8 items-center justify-center rounded-full bg-white text-[#6B7280]">
          <LifeBuoy size={16} />
        </span>
        <span>
          <span className="block text-xs font-semibold text-[#111827]">
            Need help?
          </span>
          <span className="text-[11px] text-[#6B7280]">
            View docs or contact support
          </span>
        </span>
      </span>
      <ArrowRight size={15} className="text-[#6B7280]" />
    </button>
  );
}
