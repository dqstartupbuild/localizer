import Link from "next/link";
import { MoreVertical } from "lucide-react";
import { type ProjectSummary } from "~/features/dashboard/types/dashboardData";
import { ProjectLogo } from "~/features/dashboard/components/ProjectLogo";
import { ProjectMetric } from "~/features/dashboard/components/ProjectMetric";

type ProjectCardProps = {
  project: ProjectSummary;
  href?: string;
};

export function ProjectCard({ project, href }: ProjectCardProps) {
  return (
    <article
      className={`rounded-lg border bg-white p-4 ${
        project.selected ? "border-[#08766F]" : "border-[#E5E7EB]"
      }`}
    >
      <div className="flex items-start gap-4">
        <ProjectLogo variant={project.logoVariant} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-base font-semibold text-[#111827]">
                  {project.name}
                </h3>
                <span className="rounded bg-[#F3F4F6] px-2 py-1 text-[10px] font-medium text-[#374151]">
                  {project.appType}
                </span>
              </div>
              <p className="mt-1 text-xs text-[#6B7280]">
                {project.localeCount} Locales <span aria-hidden="true">.</span>{" "}
                Updated {project.updatedAgo}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {href ? (
                <Link
                  href={href}
                  className="rounded-md border border-[#E5E7EB] px-3 py-1.5 text-xs font-semibold text-[#08766F] transition hover:bg-[#E8F6F3]"
                >
                  Open
                </Link>
              ) : null}
              <button
                type="button"
                aria-label={`Open ${project.name} project actions`}
                className="rounded-md p-1 text-[#6B7280] transition hover:bg-[#F7F9F8]"
              >
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <ProjectMetric key={metric.label} metric={metric} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
