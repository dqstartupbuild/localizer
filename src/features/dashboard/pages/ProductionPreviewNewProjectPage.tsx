import Link from "next/link";

import { AppShell } from "~/features/dashboard/components/AppShell";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { Panel } from "~/features/dashboard/components/Panel";
import { ProductionPreviewNotice } from "~/features/dashboard/components/ProductionPreviewNotice";

export function ProductionPreviewNewProjectPage() {
  return (
    <AppShell dashboardMode="public-preview">
      <PageHeader
        title="Create a project locally"
        description="Project creation needs the Localizer server running on your own machine."
      />
      <ProductionPreviewNotice />
      <Panel title="Start on your machine">
        <p className="max-w-2xl text-sm leading-6 text-[#6B7280]">
          Clone Localizer, start its local dashboard, and open that dashboard in
          your desktop browser. Your projects and translations stay on that
          machine until you choose to connect a hosted service.
        </p>
        <Link
          href="/support"
          className="mt-4 inline-block text-sm font-semibold text-[#08766F]"
        >
          View local setup help
        </Link>
      </Panel>
    </AppShell>
  );
}
