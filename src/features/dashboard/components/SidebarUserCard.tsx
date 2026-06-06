import { ChevronDown } from "lucide-react";
import { type UserSummary } from "~/features/dashboard/types/dashboardData";

type SidebarUserCardProps = {
  user: UserSummary;
};

export function SidebarUserCard({ user }: SidebarUserCardProps) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-lg p-2 text-left transition hover:bg-[#F7F9F8]"
    >
      <span className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-[#E5E7EB] text-sm font-semibold text-[#374151]">
          {user.initials}
        </span>
        <span>
          <span className="block text-sm font-semibold text-[#111827]">
            {user.name}
          </span>
          <span className="text-xs text-[#6B7280]">{user.email}</span>
        </span>
      </span>
      <ChevronDown size={16} className="text-[#6B7280]" />
    </button>
  );
}
