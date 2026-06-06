import { type MetadataField } from "~/features/dashboard/types/dashboardData";
import { StatusBadge } from "~/features/dashboard/components/StatusBadge";

type MetadataFieldRowProps = {
  field: MetadataField;
};

export function MetadataFieldRow({ field }: MetadataFieldRowProps) {
  const textRows =
    field.label === "Subtitle" ? 2 : field.label === "Description" ? 6 : 5;

  return (
    <div className="grid grid-cols-1 gap-3 border-b border-[#E5E7EB] py-3 last:border-b-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
      <div>
        <h3 className="text-xs font-semibold text-[#111827]">{field.label}</h3>
        <p className="mt-1 text-[11px] text-[#6B7280]">{field.sourceLocale}</p>
        <textarea
          readOnly
          rows={textRows}
          value={field.sourceValue}
          className="mt-2 w-full resize-none rounded-md border border-[#E5E7EB] bg-white p-3 text-xs leading-5 text-[#111827]"
        />
      </div>
      <div>
        <h3 className="text-xs font-semibold text-[#111827]">&nbsp;</h3>
        <p className="mt-1 text-[11px] text-[#6B7280]">{field.targetLocale}</p>
        <textarea
          readOnly
          rows={textRows}
          value={field.targetValue}
          className="mt-2 w-full resize-none rounded-md border border-[#E5E7EB] bg-white p-3 text-xs leading-5 text-[#111827]"
        />
      </div>
      <div className="flex items-start lg:pt-8">
        <StatusBadge status={field.status} />
      </div>
    </div>
  );
}
