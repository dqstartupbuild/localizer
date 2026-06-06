import { MetadataPage } from "~/features/dashboard/pages/MetadataPage";
import { api, HydrateClient } from "~/trpc/server";

export default async function MetadataRoute() {
  const dashboard = await api.dashboard.summary();

  return (
    <HydrateClient>
      <MetadataPage dashboard={dashboard} />
    </HydrateClient>
  );
}
