import { type ScreenCandidate } from "~/features/dashboard/types/dashboardData";

type ScreenThumbProps = {
  variant: ScreenCandidate["previewVariant"];
};

const accentClasses = {
  home: "bg-[#08766F]",
  workout: "bg-[#F2C94C]",
  onboarding: "bg-[#60A5FA]",
  progress: "bg-[#34D399]",
  debug: "bg-[#6B7280]",
};

export function ScreenThumb({ variant }: ScreenThumbProps) {
  return (
    <div className="flex h-16 w-10 shrink-0 flex-col rounded-md bg-[#111827] p-1">
      <div className="mb-1 h-1 w-4 rounded-full bg-[#374151]" />
      <div className="grid flex-1 grid-cols-2 gap-1">
        <span className={`rounded-sm ${accentClasses[variant]}`} />
        <span className="rounded-sm bg-[#374151]" />
        <span className="rounded-sm bg-[#374151]" />
        <span className={`rounded-sm ${accentClasses[variant]}`} />
      </div>
      <div className="mt-1 h-1 rounded-full bg-[#374151]" />
    </div>
  );
}
