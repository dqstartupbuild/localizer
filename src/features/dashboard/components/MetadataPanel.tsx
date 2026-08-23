import { Download } from "lucide-react";
import { type MetadataField } from "~/features/dashboard/types/dashboardData";
import { MetadataFieldRow } from "~/features/dashboard/components/MetadataFieldRow";
import { Panel } from "~/features/dashboard/components/Panel";
import { ToolbarButton } from "~/features/dashboard/components/ToolbarButton";

type MetadataPanelProps = {
  fields: MetadataField[];
};

export function MetadataPanel({ fields }: MetadataPanelProps) {
  return (
    <Panel
      title="Metadata"
      eyebrow="Calisthenics Guppy / Metadata"
      toolbar={
        <div className="flex items-center gap-2">
          <select className="h-9 rounded-md border border-[#E5E7EB] bg-white px-3 text-xs font-medium text-[#374151]">
            <option>French (fr)</option>
            <option>Spanish (es)</option>
          </select>
          <ToolbarButton icon={<Download size={14} />} variant="dark">
            Export
          </ToolbarButton>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center gap-5 border-b border-[#E5E7EB]">
          <button
            type="button"
            className="h-9 border-b-2 border-[#08766F] text-xs font-medium text-[#08766F]"
          >
            App Store
          </button>
          <button
            type="button"
            className="h-9 border-b-2 border-transparent text-xs font-medium text-[#6B7280]"
          >
            In-App Purchases
          </button>
        </div>
        <div className="rounded-lg border border-[#E5E7EB] px-3">
          {fields.map((field) => (
            <MetadataFieldRow key={field.label} field={field} />
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="h-10 rounded-md bg-[#08766F] px-4 text-xs font-semibold text-white transition hover:bg-[#0D7D75]"
          >
            Save Changes
          </button>
          <p className="text-xs text-[#6B7280]">
            All changes are automatically saved
          </p>
        </div>
      </div>
    </Panel>
  );
}
