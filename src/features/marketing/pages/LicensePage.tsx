import { LegalArticle } from "~/features/marketing/components/LegalArticle";
import { PublicPageShell } from "~/features/marketing/components/PublicPageShell";

export function LicensePage() {
  return (
    <PublicPageShell>
      <LegalArticle
        title="MIT License"
        description="Localizer is open-source software released under the MIT License."
      >
        <section>
          <h2>What that means</h2>
          <p>
            The MIT License permits broad use of the code: you can use it, copy
            it, modify it, merge it into other projects, publish it, and
            distribute it. Keep the copyright and license notice with
            substantial copies.
          </p>
        </section>
        <section>
          <h2>The important limit</h2>
          <p>
            The license provides the software as-is, without warranty. It does
            not promise that Localizer will work for every purpose or protect
            against every problem.
          </p>
        </section>
        <section>
          <h2>Read the full text</h2>
          <p>
            Read the canonical{" "}
            <a href="https://github.com/dqstartupbuild/localizer/blob/main/LICENSE">
              LICENSE file in the repository
            </a>{" "}
            or the{" "}
            <a href="https://opensource.org/license/mit">
              Open Source Initiative’s MIT License page
            </a>
            .
          </p>
        </section>
      </LegalArticle>
    </PublicPageShell>
  );
}
