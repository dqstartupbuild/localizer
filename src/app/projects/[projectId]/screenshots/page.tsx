import { ScreenshotsPage } from "~/features/dashboard/pages/ScreenshotsPage";
import { api, HydrateClient } from "~/trpc/server";

export default async function ScreenshotsRoute() {
  const dashboard = await api.dashboard.summary();

  return (
    <HydrateClient>
      <ScreenshotsPage dashboard={dashboard} />
    </HydrateClient>
  );
}
