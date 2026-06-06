import { ActivityPage } from "~/features/dashboard/pages/ActivityPage";
import { api, HydrateClient } from "~/trpc/server";

export default async function ActivityRoute() {
  const dashboard = await api.dashboard.summary();

  return (
    <HydrateClient>
      <ActivityPage dashboard={dashboard} />
    </HydrateClient>
  );
}
