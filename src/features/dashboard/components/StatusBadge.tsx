type StatusBadgeProps = {
  status: "Approved" | "Edited" | "Selected" | "Excluded";
};

const statusClasses = {
  Approved: "bg-[#DDF8EE] text-[#0F8F86]",
  Edited: "bg-[#EEF2FF] text-[#4F46E5]",
  Selected: "bg-[#DDF8EE] text-[#0F8F86]",
  Excluded: "bg-[#F3F4F6] text-[#6B7280]",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full px-2.5 text-[11px] font-medium ${statusClasses[status]}`}
    >
      {status}
    </span>
  );
}
