import {
  Activity,
  Camera,
  FilePenLine,
  Folder,
  Languages,
  Settings,
} from "lucide-react";
import { type DashboardData } from "~/features/dashboard/types/dashboardData";
import { BrandMark } from "~/features/dashboard/components/BrandMark";
import { SidebarHelpCard } from "~/features/dashboard/components/SidebarHelpCard";
import { SidebarNavItem } from "~/features/dashboard/components/SidebarNavItem";
import { SidebarPlanCard } from "~/features/dashboard/components/SidebarPlanCard";
import { SidebarUserCard } from "~/features/dashboard/components/SidebarUserCard";

type SidebarProps = {
  planUsages: DashboardData["planUsages"];
  user: DashboardData["user"];
};

const navigationItems = [
  { label: "Projects", icon: Folder, active: true },
  { label: "Localizations", icon: Languages, active: false },
  { label: "Screenshots", icon: Camera, active: false },
  { label: "Metadata", icon: FilePenLine, active: false },
  { label: "Activity", icon: Activity, active: false },
  { label: "Settings", icon: Settings, active: false },
];

export function Sidebar({ planUsages, user }: SidebarProps) {
  return (
    <aside className="flex flex-col border-b border-[#E5E7EB] bg-white p-5 lg:min-h-screen lg:border-r lg:border-b-0">
      <BrandMark />
      <nav className="mt-8 grid grid-cols-2 gap-2 lg:block lg:space-y-1">
        {navigationItems.map((item) => (
          <SidebarNavItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            active={item.active}
          />
        ))}
      </nav>
      <div className="mt-8 hidden lg:block">
        <SidebarPlanCard usages={planUsages} />
      </div>
      <div className="hidden space-y-5 pt-8 lg:mt-auto lg:block">
        <SidebarHelpCard />
        <SidebarUserCard user={user} />
      </div>
    </aside>
  );
}
