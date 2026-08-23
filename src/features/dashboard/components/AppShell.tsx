import { type ReactNode } from "react";
import { DesktopOnlyDashboardNotice } from "~/features/dashboard/components/DesktopOnlyDashboardNotice";
import { Sidebar } from "~/features/dashboard/components/Sidebar";
import type { DashboardMode } from "~/features/dashboard/types/DashboardMode";

type AppShellProps = {
  children: ReactNode;
  activeProjectId?: string;
  dashboardMode: DashboardMode;
};

export function AppShell({
  children,
  activeProjectId,
  dashboardMode,
}: AppShellProps) {
  return (
    <main className="min-h-screen bg-[#F7F9F8] text-[#111827]">
      <DesktopOnlyDashboardNotice dashboardMode={dashboardMode} />
      <div className="hidden min-h-screen lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar
          activeProjectId={activeProjectId}
          dashboardMode={dashboardMode}
        />
        <div className="min-w-0 p-4 lg:p-6">{children}</div>
      </div>
    </main>
  );
}
