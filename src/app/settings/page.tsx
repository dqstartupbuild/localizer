import { SettingsPage } from "~/features/dashboard/pages/SettingsPage";
import { api, HydrateClient } from "~/trpc/server";

export default async function SettingsRoute() {
  const dashboard = await api.dashboard.summary();

  return (
    <HydrateClient>
      <SettingsPage dashboard={dashboard} />
    </HydrateClient>
  );
}
