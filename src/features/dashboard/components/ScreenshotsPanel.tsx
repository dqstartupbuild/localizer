import { Filter, Grid2X2, RefreshCw, Table2 } from "lucide-react";
import { type ScreenshotGroup } from "~/features/dashboard/types/dashboardData";
import { Panel } from "~/features/dashboard/components/Panel";
import { ScreenshotTile } from "~/features/dashboard/components/ScreenshotTile";
import { ToolbarButton } from "~/features/dashboard/components/ToolbarButton";

type ScreenshotsPanelProps = {
  groups: ScreenshotGroup[];
};

export function ScreenshotsPanel({ groups }: ScreenshotsPanelProps) {
  return (
    <Panel
      title="Screenshots"
      eyebrow="Calisthenics Guppy / Screenshots"
      toolbar={
        <div className="flex items-center gap-2">
          <ToolbarButton icon={<Filter size={14} />}>Filters</ToolbarButton>
          <select className="h-9 rounded-md border border-[#E5E7EB] bg-white px-3 text-xs font-medium text-[#374151]">
            <option>Spanish (es)</option>
            <option>French (fr)</option>
          </select>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-5">
            {[
              "All Screens",
              "Home",
              "Workout Detail",
              "Progress",
              "Settings",
            ].map((tab, index) => (
              <button
                key={tab}
                type="button"
                className={`h-8 border-b-2 text-xs font-medium ${
                  index === 0
                    ? "border-[#0F8F86] text-[#0F8F86]"
                    : "border-transparent text-[#6B7280]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-md border border-[#E5E7EB] p-1">
            <button
              type="button"
              aria-label="Grid screenshot view"
              className="flex size-7 items-center justify-center rounded bg-[#E8F6F3] text-[#0F8F86]"
            >
              <Grid2X2 size={15} />
            </button>
            <button
              type="button"
              aria-label="Table screenshot view"
              className="flex size-7 items-center justify-center rounded text-[#6B7280]"
            >
              <Table2 size={15} />
            </button>
          </div>
        </div>
        <div className="space-y-5">
          {groups.map((group) => (
            <section key={group.title}>
              <h3 className="mb-3 text-sm font-semibold text-[#111827]">
                {group.title}
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {group.tiles.map((tile) => (
                  <ScreenshotTile key={tile.id} tile={tile} />
                ))}
              </div>
            </section>
          ))}
        </div>
        <button
          type="button"
          className="mx-auto flex h-10 items-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-4 text-xs font-semibold text-[#374151] transition hover:bg-[#F7F9F8]"
        >
          <RefreshCw size={14} />
          Regenerate Screenshots
        </button>
      </div>
    </Panel>
  );
}
