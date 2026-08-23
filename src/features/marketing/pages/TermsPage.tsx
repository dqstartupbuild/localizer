import { LegalArticle } from "~/features/marketing/components/LegalArticle";
import { PublicPageShell } from "~/features/marketing/components/PublicPageShell";

export function TermsPage() {
  return (
    <PublicPageShell>
      <LegalArticle
        title="Terms"
        description="Rules for using the Localizer website and source code. Effective August 23, 2026."
      >
        <section>
          <h2>Use the code</h2>
          <p>
            You can use, copy, change, and share Localizer under the MIT License
            in this repository. The MIT License controls how the source code may
            be used. This page does not replace that license.
          </p>
        </section>
        <section>
          <h2>Use the site responsibly</h2>
          <p>
            Follow the law. Do not attack the website, misuse someone
            else&apos;s information, or post harmful material.
          </p>
        </section>
        <section>
          <h2>There is no warranty</h2>
          <p>
            Localizer is provided as-is. It may have bugs, change, or not work
            for your project. Check every generated file and keep your own
            backups before you ship an app.
          </p>
        </section>
        <section>
          <h2>Other websites</h2>
          <p>
            Localizer links to GitHub and other websites. Their own terms and
            privacy policies apply when you use them.
          </p>
        </section>
        <section>
          <h2>Changes to these terms</h2>
          <p>
            These terms may change as Localizer changes. You can see updates on
            this page and in the GitHub history.
          </p>
        </section>
        <section>
          <h2>Questions</h2>
          <p>
            Use the{" "}
            <a href="https://github.com/dqstartupbuild/localizer/issues">
              GitHub issue tracker
            </a>{" "}
            for questions. Do not post security details there. Use{" "}
            <a href="https://github.com/dqstartupbuild/localizer/security/advisories/new">
              GitHub&apos;s private security form
            </a>{" "}
            instead.
          </p>
        </section>
      </LegalArticle>
    </PublicPageShell>
  );
}
