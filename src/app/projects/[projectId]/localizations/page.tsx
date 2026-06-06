import { LocalizationsPage } from "~/features/dashboard/pages/LocalizationsPage";
import { api, HydrateClient } from "~/trpc/server";

export default async function LocalizationsRoute() {
  const dashboard = await api.dashboard.summary();

  return (
    <HydrateClient>
      <LocalizationsPage dashboard={dashboard} />
    </HydrateClient>
  );
}
