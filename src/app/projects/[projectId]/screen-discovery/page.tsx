import { ScreenDiscoveryPage } from "~/features/dashboard/pages/ScreenDiscoveryPage";
import { api, HydrateClient } from "~/trpc/server";

export default async function ScreenDiscoveryRoute() {
  const dashboard = await api.dashboard.summary();

  return (
    <HydrateClient>
      <ScreenDiscoveryPage dashboard={dashboard} />
    </HydrateClient>
  );
}
