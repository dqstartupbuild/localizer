import { Download, Filter, Search } from "lucide-react";
import {
  type LocalizationRow,
  type LocalizationTab,
} from "~/features/dashboard/types/dashboardData";
import { LocalizationTable } from "~/features/dashboard/components/LocalizationTable";
import { LocalizationTabs } from "~/features/dashboard/components/LocalizationTabs";
import { Panel } from "~/features/dashboard/components/Panel";
import { ToolbarButton } from "~/features/dashboard/components/ToolbarButton";

type LocalizationsPanelProps = {
  tabs: LocalizationTab[];
  rows: LocalizationRow[];
};

export function LocalizationsPanel({ tabs, rows }: LocalizationsPanelProps) {
  return (
    <Panel
      title="Localizations"
      eyebrow="Calisthenics Guppy / Localizations"
      toolbar={
        <div className="flex items-center gap-2">
          <ToolbarButton icon={<Filter size={14} />}>Filter</ToolbarButton>
          <select className="h-9 rounded-md border border-[#E5E7EB] bg-white px-3 text-xs font-medium text-[#374151]">
            <option>Spanish (es)</option>
            <option>French (fr)</option>
            <option>German (de)</option>
          </select>
          <ToolbarButton icon={<Download size={14} />} variant="dark">
            Export
          </ToolbarButton>
        </div>
      }
    >
      <div className="space-y-4">
        <LocalizationTabs tabs={tabs} />
        <div className="flex items-center justify-between gap-4">
          <label className="relative block min-w-0 flex-1">
            <Search
              size={15}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#9CA3AF]"
            />
            <input
              className="h-9 w-full rounded-md border border-[#E5E7EB] bg-white pr-3 pl-9 text-xs text-[#111827] transition outline-none placeholder:text-[#9CA3AF] focus:border-[#08766F]"
              placeholder="Search translations..."
            />
          </label>
          <span className="shrink-0 text-xs font-medium text-[#374151]">
            1,234 strings
          </span>
        </div>
        <LocalizationTable rows={rows} />
        <div className="flex items-center justify-end gap-4 text-xs text-[#6B7280]">
          <span>Rows per page:</span>
          <select className="h-8 rounded-md border border-[#E5E7EB] bg-white px-2 text-xs text-[#111827]">
            <option>20</option>
          </select>
          <span className="text-[#111827]">1</span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>60</span>
        </div>
      </div>
    </Panel>
  );
}
