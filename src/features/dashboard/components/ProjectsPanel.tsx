import { Plus } from "lucide-react";
import { type ProjectSummary } from "~/features/dashboard/types/dashboardData";
import { Panel } from "~/features/dashboard/components/Panel";
import { ProjectCard } from "~/features/dashboard/components/ProjectCard";
import { ToolbarButton } from "~/features/dashboard/components/ToolbarButton";

type ProjectsPanelProps = {
  projects: ProjectSummary[];
};

export function ProjectsPanel({ projects }: ProjectsPanelProps) {
  return (
    <Panel
      title="Projects"
      toolbar={
        <ToolbarButton icon={<Plus size={14} />} variant="primary">
          New Project
        </ToolbarButton>
      }
    >
      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <button
          type="button"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#D1D5DB] text-xs font-medium text-[#0F8F86] transition hover:bg-[#E8F6F3]"
        >
          <Plus size={14} />
          Add New Project
        </button>
      </div>
    </Panel>
  );
}
