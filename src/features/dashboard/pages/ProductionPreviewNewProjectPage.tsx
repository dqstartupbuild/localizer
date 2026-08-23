import Link from "next/link";

import { AppShell } from "~/features/dashboard/components/AppShell";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { Panel } from "~/features/dashboard/components/Panel";
import { ProductionPreviewNotice } from "~/features/dashboard/components/ProductionPreviewNotice";

export function ProductionPreviewNewProjectPage() {
  return (
    <AppShell dashboardMode="public-preview">
      <PageHeader
        title="Create a project on your computer"
        description="The hosted demo cannot create or save projects."
      />
      <ProductionPreviewNotice />
      <Panel title="Run Localizer on your computer">
        <p className="max-w-2xl text-sm leading-6 text-[#6B7280]">
          Download Localizer, run <code>npm run dev</code>, and open the
          dashboard on a desktop. Your projects and translations are saved on
          that computer.
        </p>
        <Link
          href="/support"
          className="mt-4 inline-block text-sm font-semibold text-[#08766F]"
        >
          View setup steps
        </Link>
      </Panel>
    </AppShell>
  );
}
