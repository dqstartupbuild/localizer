import { notFound } from "next/navigation";
import { MetadataPage } from "~/features/dashboard/pages/MetadataPage";
import { api, HydrateClient } from "~/trpc/server";
import { resolveDashboardWorkspace } from "~/server/localizer/workspace/resolveDashboardWorkspace";

export default async function MetadataRoute() {
  if (resolveDashboardWorkspace().mode === "public-preview") notFound();
  const dashboard = await api.dashboard.summary();

  return (
    <HydrateClient>
      <MetadataPage dashboard={dashboard} />
    </HydrateClient>
  );
}
