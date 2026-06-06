import { ProjectOverviewPage } from "~/features/dashboard/pages/ProjectOverviewPage";
import { api, HydrateClient } from "~/trpc/server";

export default async function ProjectOverviewRoute() {
  const dashboard = await api.dashboard.summary();

  return (
    <HydrateClient>
      <ProjectOverviewPage dashboard={dashboard} />
    </HydrateClient>
  );
}
