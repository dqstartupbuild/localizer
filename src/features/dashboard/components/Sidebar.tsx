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

const activeProjectId = "calisthenics-guppy";

const navigationItems = [
  {
    label: "Projects",
    icon: "folder",
    href: "/projects",
    matchPaths: ["/projects", "/projects/new"],
  },
  {
    label: "Overview",
    icon: "overview",
    href: `/projects/${activeProjectId}/overview`,
  },
  {
    label: "Localizations",
    icon: "languages",
    href: `/projects/${activeProjectId}/localizations`,
  },
  {
    label: "Screen Discovery",
    icon: "scan",
    href: `/projects/${activeProjectId}/screen-discovery`,
  },
  {
    label: "Screenshots",
    icon: "camera",
    href: `/projects/${activeProjectId}/screenshots`,
  },
  {
    label: "Metadata",
    icon: "file",
    href: `/projects/${activeProjectId}/metadata`,
  },
  {
    label: "Activity",
    icon: "activity",
    href: `/projects/${activeProjectId}/activity`,
  },
  { label: "Settings", icon: "settings", href: "/settings" },
] as const;

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
            href={item.href}
            matchPaths={"matchPaths" in item ? item.matchPaths : undefined}
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
