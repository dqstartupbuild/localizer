import { type ReactNode } from "react";
import { type DashboardData } from "~/features/dashboard/types/dashboardData";
import { DesktopOnlyDashboardNotice } from "~/features/dashboard/components/DesktopOnlyDashboardNotice";
import { Sidebar } from "~/features/dashboard/components/Sidebar";

type AppShellProps = {
  dashboard: DashboardData;
  children: ReactNode;
  activeProjectId?: string;
};

export function AppShell({
  dashboard,
  children,
  activeProjectId,
}: AppShellProps) {
  return (
    <main className="min-h-screen bg-[#F7F9F8] text-[#111827]">
      <DesktopOnlyDashboardNotice />
      <div className="hidden min-h-screen lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar
          planUsages={dashboard.planUsages}
          user={dashboard.user}
          activeProjectId={activeProjectId}
        />
        <div className="min-w-0 p-4 lg:p-6">{children}</div>
      </div>
    </main>
  );
}
