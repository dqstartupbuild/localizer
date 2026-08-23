import { notFound } from "next/navigation";
import { SettingsPage } from "~/features/dashboard/pages/SettingsPage";
import { api, HydrateClient } from "~/trpc/server";
import { resolveDashboardWorkspace } from "~/server/localizer/workspace/resolveDashboardWorkspace";

export default async function SettingsRoute() {
  if (resolveDashboardWorkspace().mode === "public-preview") notFound();
  const dashboard = await api.dashboard.summary();

  return (
    <HydrateClient>
      <SettingsPage dashboard={dashboard} />
    </HydrateClient>
  );
}
