import { notFound } from "next/navigation";
import { ScreenDiscoveryPage } from "~/features/dashboard/pages/ScreenDiscoveryPage";
import { api, HydrateClient } from "~/trpc/server";
import { resolveDashboardWorkspace } from "~/server/localizer/workspace/resolveDashboardWorkspace";

export default async function ScreenDiscoveryRoute() {
  if (resolveDashboardWorkspace().mode === "public-preview") notFound();
  const dashboard = await api.dashboard.summary();

  return (
    <HydrateClient>
      <ScreenDiscoveryPage dashboard={dashboard} />
    </HydrateClient>
  );
}
