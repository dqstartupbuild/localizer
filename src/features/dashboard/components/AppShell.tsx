import { type ReactNode } from "react";
import { type DashboardData } from "~/features/dashboard/types/dashboardData";
import { Sidebar } from "~/features/dashboard/components/Sidebar";

type AppShellProps = {
  dashboard: DashboardData;
  children: ReactNode;
};

export function AppShell({ dashboard, children }: AppShellProps) {
  return (
    <main className="min-h-screen bg-[#F7F9F8] text-[#111827]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar planUsages={dashboard.planUsages} user={dashboard.user} />
        <div className="min-w-0 p-4 lg:p-6">{children}</div>
      </div>
    </main>
  );
}
