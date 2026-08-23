import { Plus } from "lucide-react";
import { type DashboardData } from "~/features/dashboard/types/dashboardData";
import { AppShell } from "~/features/dashboard/components/AppShell";
import { EmptyStatePanel } from "~/features/dashboard/components/EmptyStatePanel";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { ProjectCard } from "~/features/dashboard/components/ProjectCard";
import { ToolbarLink } from "~/features/dashboard/components/ToolbarLink";

type ProjectsPageProps = {
  dashboard: DashboardData;
};

export function ProjectsPage({ dashboard }: ProjectsPageProps) {
  return (
    <AppShell dashboardMode="local">
      <PageHeader
        title="Projects"
        description="Create and manage the iOS apps connected to Localizer. Each project tracks locales, translations, screenshots, metadata, and the latest CLI analysis."
        actions={
          <ToolbarLink
            href="/projects/new"
            icon={<Plus size={14} />}
            variant="primary"
          >
            New Project
          </ToolbarLink>
        }
      />
      <div className="grid gap-4 xl:grid-cols-2">
        {dashboard.projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            href={`/projects/${project.id}/overview`}
          />
        ))}
      </div>
      <div className="mt-4">
        <EmptyStatePanel
          title="Connect another app"
          description="Start with the app name, then Localizer will provide the CLI command to run inside the iOS project."
          action={
            <ToolbarLink
              href="/projects/new"
              icon={<Plus size={14} />}
              variant="primary"
            >
              Create Project
            </ToolbarLink>
          }
        />
      </div>
    </AppShell>
  );
}
