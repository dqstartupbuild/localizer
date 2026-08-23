import { LegalArticle } from "~/features/marketing/components/LegalArticle";
import { PublicPageShell } from "~/features/marketing/components/PublicPageShell";

export function LicensePage() {
  return (
    <PublicPageShell>
      <LegalArticle
        title="MIT License"
        description="Localizer is free to use, change, copy, and share under the MIT License."
      >
        <section>
          <h2>You can use the code</h2>
          <p>
            You can use, copy, change, publish, and share Localizer. You can
            also add it to another project. Keep the copyright and license
            notice with any substantial copy of the code.
          </p>
        </section>
        <section>
          <h2>There is no warranty</h2>
          <p>
            Localizer is provided as-is. There is no promise that it will work
            for every project or be free of problems.
          </p>
        </section>
        <section>
          <h2>Read the license</h2>
          <p>
            Read the full{" "}
            <a href="https://github.com/dqstartupbuild/localizer/blob/main/LICENSE">
              LICENSE file on GitHub
            </a>{" "}
            or the{" "}
            <a href="https://opensource.org/license/mit">
              Open Source Initiative&apos;s MIT License page
            </a>
            .
          </p>
        </section>
      </LegalArticle>
    </PublicPageShell>
  );
}
