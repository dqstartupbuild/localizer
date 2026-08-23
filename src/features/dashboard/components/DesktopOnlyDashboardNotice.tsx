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
            Open Localizer on a desktop.
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-[#4B5563]">
            This dashboard needs a wider screen for reviewing strings and
            working with project files. Visit this page from a desktop browser
            to continue.
          </p>
        </div>
      </div>
      <p className="text-sm text-[#4B5563]">
        {dashboardMode === "public-preview"
          ? "The public preview uses read-only sample data."
          : "Your local work stays saved."}
      </p>
    </section>
  );
}
