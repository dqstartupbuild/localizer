import { type LucideIcon } from "lucide-react";

type SidebarNavItemProps = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

export function SidebarNavItem({
  label,
  icon: Icon,
  active = false,
}: SidebarNavItemProps) {
  return (
    <button
      type="button"
      className={`flex h-10 w-full items-center gap-3 rounded-md px-3 text-sm font-medium transition ${
        active
          ? "bg-[#E8F6F3] text-[#0F8F86]"
          : "text-[#374151] hover:bg-[#F7F9F8]"
      }`}
    >
      <Icon size={17} strokeWidth={2} />
      <span>{label}</span>
    </button>
  );
}
