import { api, HydrateClient } from "~/trpc/server";
import { LocalizerDashboard } from "~/features/dashboard/components/LocalizerDashboard";

export default async function Home() {
  const dashboard = await api.dashboard.summary();

  return (
    <HydrateClient>
      <LocalizerDashboard dashboard={dashboard} />
    </HydrateClient>
  );
}
