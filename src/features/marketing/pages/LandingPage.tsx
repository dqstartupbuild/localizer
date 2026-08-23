import { CatalogFlow } from "~/features/marketing/components/CatalogFlow";
import { LocalizationLedger } from "~/features/marketing/components/LocalizationLedger";
import { OpenSourceNote } from "~/features/marketing/components/OpenSourceNote";
import { PublicAction } from "~/features/marketing/components/PublicAction";
import { PublicPageShell } from "~/features/marketing/components/PublicPageShell";
import { SourceBoundary } from "~/features/marketing/components/SourceBoundary";
import { SoftwareApplicationSchema } from "~/features/marketing/components/SoftwareApplicationSchema";

export function LandingPage() {
  return (
    <PublicPageShell>
      <main>
        <SoftwareApplicationSchema />
        <section className="marketing-hero">
          <p className="marketing-hero__side-copy">
            The CLI finds text in your SwiftUI app. Check each translation in
            the dashboard, then sync an Xcode String Catalog back to your
            project.
          </p>
          <h1>Review your iOS app translations.</h1>
          <div className="marketing-hero__artifact">
            <LocalizationLedger />
          </div>
          <div className="marketing-hero__edge-action">
            <PublicAction />
          </div>
        </section>
        <SourceBoundary />
        <section className="workflow-section" aria-labelledby="workflow-title">
          <header>
            <h2 id="workflow-title">How it works</h2>
          </header>
          <CatalogFlow />
        </section>
        <OpenSourceNote />
      </main>
    </PublicPageShell>
  );
}
