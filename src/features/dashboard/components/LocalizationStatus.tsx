type LocalizationStatusProps = {
  status: "approved" | "missing" | "needs_review" | "stale";
};

const labels = {
  approved: "Ready",
  missing: "Missing",
  needs_review: "Needs review",
  stale: "No longer in app",
} as const;

const colors = {
  approved: "text-[#0E716A]",
  missing: "text-[#6B7280]",
  needs_review: "text-[#8A5A13]",
  stale: "text-[#7A596B]",
} as const;

export function LocalizationStatus({ status }: LocalizationStatusProps) {
  return (
    <span className={`text-xs font-semibold ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}
