import { NewProjectPage } from "~/features/dashboard/pages/NewProjectPage";
import { api, HydrateClient } from "~/trpc/server";

export default async function NewProjectRoute() {
  const dashboard = await api.dashboard.summary();

  return (
    <HydrateClient>
      <NewProjectPage dashboard={dashboard} />
    </HydrateClient>
  );
}
