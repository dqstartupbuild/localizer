import { MoreVertical } from "lucide-react";
import { type LocalizationRow } from "~/features/dashboard/types/dashboardData";
import { StatusBadge } from "~/features/dashboard/components/StatusBadge";

type LocalizationTableProps = {
  rows: LocalizationRow[];
};

export function LocalizationTable({ rows }: LocalizationTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#E5E7EB]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-xs">
          <thead className="bg-[#F7F9F8] text-[#6B7280]">
            <tr>
              <th className="px-4 py-3 font-medium">Key</th>
              <th className="px-4 py-3 font-medium">English (en)</th>
              <th className="px-4 py-3 font-medium">Spanish (es)</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="w-10 px-2 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB] bg-white text-[#111827]">
            {rows.map((row) => (
              <tr key={row.keyName}>
                <td className="px-4 py-3 font-medium">{row.keyName}</td>
                <td className="px-4 py-3">{row.sourceText}</td>
                <td className="px-4 py-3">{row.translatedText}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-4 py-3 text-[#6B7280]">{row.source}</td>
                <td className="px-2 py-3">
                  <button
                    type="button"
                    aria-label={`Open ${row.keyName} row actions`}
                    className="rounded-md p-1 text-[#6B7280] transition hover:bg-[#F7F9F8]"
                  >
                    <MoreVertical size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
