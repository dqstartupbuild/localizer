import { type LocalizationTab } from "~/features/dashboard/types/dashboardData";

type LocalizationTabsProps = {
  tabs: LocalizationTab[];
};

export function LocalizationTabs({ tabs }: LocalizationTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-5 border-b border-[#E5E7EB]">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          type="button"
          className={`flex h-10 items-center gap-2 border-b-2 text-xs font-medium transition ${
            tab.active
              ? "border-[#08766F] text-[#08766F]"
              : "border-transparent text-[#6B7280] hover:text-[#111827]"
          }`}
        >
          <span>{tab.label}</span>
          {typeof tab.count === "number" ? (
            <span className="rounded-full bg-[#F3F4F6] px-2 py-0.5 text-[10px] text-[#374151]">
              {tab.count}
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}
