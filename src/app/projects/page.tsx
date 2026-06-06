import { ProjectsPage } from "~/features/dashboard/pages/ProjectsPage";
import { api, HydrateClient } from "~/trpc/server";

export default async function ProjectsRoute() {
  const dashboard = await api.dashboard.summary();

  return (
    <HydrateClient>
      <ProjectsPage dashboard={dashboard} />
    </HydrateClient>
  );
}
