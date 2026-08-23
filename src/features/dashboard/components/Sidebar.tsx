import { type DashboardData } from "~/features/dashboard/types/dashboardData";
import { BrandMark } from "~/features/dashboard/components/BrandMark";
import { SidebarNavItem } from "~/features/dashboard/components/SidebarNavItem";
import { createSidebarNavigationItems } from "~/features/dashboard/components/createSidebarNavigationItems";

type SidebarProps = {
  planUsages: DashboardData["planUsages"];
  user: DashboardData["user"];
  activeProjectId?: string;
};

export function Sidebar({ planUsages, user, activeProjectId }: SidebarProps) {
  const isLocalWorkspace = user.name === "Local workspace";
  return (
    <aside className="flex flex-col border-b border-[#E5E7EB] bg-white p-5 lg:min-h-screen lg:border-r lg:border-b-0">
      <BrandMark />
      <nav className="mt-8 grid grid-cols-2 gap-2 lg:block lg:space-y-1">
        {createSidebarNavigationItems(activeProjectId, isLocalWorkspace).map(
          (item) => (
            <SidebarNavItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              href={item.href}
              matchPaths={"matchPaths" in item ? item.matchPaths : undefined}
            />
          ),
        )}
      </nav>
      {isLocalWorkspace ? (
        <p className="mt-auto hidden pt-8 text-xs leading-5 text-[#6B7280] lg:block">
          Local workspace
          <br />
          Saved on this machine
        </p>
      ) : (
        <div className="mt-8 hidden lg:block">
          {planUsages.length > 0 ? (
            <p className="text-xs text-[#6B7280]">Dashboard preview</p>
          ) : null}
        </div>
      )}
    </aside>
  );
}
