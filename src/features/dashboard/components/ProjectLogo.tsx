import { MessageCircle, MoonStar, Mountain } from "lucide-react";
import { type ProjectSummary } from "~/features/dashboard/types/dashboardData";

type ProjectLogoProps = {
  variant: ProjectSummary["logoVariant"];
};

const logoClasses = {
  calisthenics: "bg-[#0F8F86] text-white",
  tweet: "bg-[#F2C94C] text-[#111827]",
  sleep: "bg-[#111827] text-white",
};

export function ProjectLogo({ variant }: ProjectLogoProps) {
  const Icon =
    variant === "calisthenics"
      ? Mountain
      : variant === "tweet"
        ? MessageCircle
        : MoonStar;

  return (
    <div
      className={`flex size-14 shrink-0 items-center justify-center rounded-lg ${logoClasses[variant]}`}
    >
      <Icon size={27} strokeWidth={2.1} />
    </div>
  );
}
