import { LegalArticle } from "~/features/marketing/components/LegalArticle";
import { PublicPageShell } from "~/features/marketing/components/PublicPageShell";

export function TermsPage() {
  return (
    <PublicPageShell>
      <LegalArticle
        title="Terms"
        description="Effective August 23, 2026. Plain-language terms for the Localizer website and the open-source project."
      >
        <section>
          <h2>Using the project</h2>
          <p>
            You may use, copy, modify, and distribute the Localizer source code
            under the terms of the MIT License included in this repository. The
            source license governs the code. This page does not replace or
            expand that license.
          </p>
        </section>
        <section>
          <h2>Website use</h2>
          <p>
            Please use the website, repository, and issue tracker lawfully and
            respectfully. Do not interfere with the service, misuse other
            people’s information, or submit harmful material.
          </p>
        </section>
        <section>
          <h2>Open-source, as-is</h2>
          <p>
            Localizer is provided as-is, without warranties or guarantees. The
            project is still developing, and features may change, be incomplete,
            or not fit your particular workflow. You are responsible for
            reviewing generated files and maintaining your own backups before
            using them in a release.
          </p>
        </section>
        <section>
          <h2>Third-party services</h2>
          <p>
            Links to GitHub and other third-party services are provided for
            convenience. Their terms and policies apply when you use them.
          </p>
        </section>
        <section>
          <h2>Updates</h2>
          <p>
            These terms may be updated as the project changes. Material updates
            will be reflected in the repository history and on this page.
          </p>
        </section>
        <section>
          <h2>Project contact</h2>
          <p>
            Use the{" "}
            <a href="https://github.com/dqstartupbuild/localizer/issues">
              GitHub issue tracker
            </a>{" "}
            for project questions. Do not post security details publicly; use{" "}
            <a href="https://github.com/dqstartupbuild/localizer/security/advisories/new">
              private vulnerability reporting
            </a>{" "}
            instead.
          </p>
        </section>
      </LegalArticle>
    </PublicPageShell>
  );
}
