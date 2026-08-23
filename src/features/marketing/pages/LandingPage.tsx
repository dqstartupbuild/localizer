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
            Localizer turns a local iOS project into a reviewable translation
            catalog, then writes approved language back where your app lives.
          </p>
          <h1>Keep the words close to the work.</h1>
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
            <h2 id="workflow-title">Read. Review. Return.</h2>
          </header>
          <CatalogFlow />
        </section>
        <OpenSourceNote />
      </main>
    </PublicPageShell>
  );
}
