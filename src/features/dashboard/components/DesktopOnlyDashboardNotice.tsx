import { BrandMark } from "~/features/dashboard/components/BrandMark";
import type { DashboardMode } from "~/features/dashboard/types/DashboardMode";

type DesktopOnlyDashboardNoticeProps = { dashboardMode: DashboardMode };

export function DesktopOnlyDashboardNotice({
  dashboardMode,
}: DesktopOnlyDashboardNoticeProps) {
  return (
    <section
      aria-labelledby="desktop-only-title"
      className="flex min-h-screen flex-col bg-[#F7F9F8] p-6 text-[#111827] lg:hidden"
    >
      <BrandMark />
      <div className="flex flex-1 items-center py-16">
        <div className="max-w-md">
          <h1
            id="desktop-only-title"
            className="max-w-sm text-4xl font-semibold tracking-[-0.035em]"
          >
            Open this page on a computer.
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-[#4B5563]">
            The dashboard has tables that do not fit on a phone. Open this same
            page on a desktop or laptop.
          </p>
        </div>
      </div>
      <p className="text-sm text-[#4B5563]">
        {dashboardMode === "public-preview"
          ? "This demo uses sample data."
          : "Your work is saved on this computer."}
      </p>
    </section>
  );
}
