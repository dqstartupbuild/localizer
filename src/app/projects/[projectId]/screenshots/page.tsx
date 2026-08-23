import { notFound } from "next/navigation";
import { ScreenshotsPage } from "~/features/dashboard/pages/ScreenshotsPage";
import { api, HydrateClient } from "~/trpc/server";
import { resolveDashboardWorkspace } from "~/server/localizer/workspace/resolveDashboardWorkspace";

export default async function ScreenshotsRoute() {
  if (resolveDashboardWorkspace().mode === "public-preview") notFound();
  const dashboard = await api.dashboard.summary();

  return (
    <HydrateClient>
      <ScreenshotsPage dashboard={dashboard} />
    </HydrateClient>
  );
}
