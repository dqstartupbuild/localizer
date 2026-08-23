import { BrandMark } from "~/features/dashboard/components/BrandMark";
import { SidebarNavItem } from "~/features/dashboard/components/SidebarNavItem";
import { createSidebarNavigationItems } from "~/features/dashboard/components/createSidebarNavigationItems";
import type { DashboardMode } from "~/features/dashboard/types/DashboardMode";

type SidebarProps = {
  activeProjectId?: string;
  dashboardMode: DashboardMode;
};

export function Sidebar({ activeProjectId, dashboardMode }: SidebarProps) {
  return (
    <aside className="flex flex-col border-b border-[#E5E7EB] bg-white p-5 lg:min-h-screen lg:border-r lg:border-b-0">
      <BrandMark />
      <nav className="mt-8 grid grid-cols-2 gap-2 lg:block lg:space-y-1">
        {createSidebarNavigationItems(activeProjectId).map((item) => (
          <SidebarNavItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            href={item.href}
            matchPaths={"matchPaths" in item ? item.matchPaths : undefined}
          />
        ))}
      </nav>
      {dashboardMode === "local" ? (
        <p className="mt-auto hidden pt-8 text-xs leading-5 text-[#6B7280] lg:block">
          Local workspace
          <br />
          Saved on this machine
        </p>
      ) : (
        <div className="mt-8 hidden lg:block">
          <p className="text-xs leading-5 text-[#6B7280]">
            Public preview
            <br />
            Read-only sample data
          </p>
        </div>
      )}
    </aside>
  );
}
