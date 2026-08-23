import { LegalArticle } from "~/features/marketing/components/LegalArticle";
import { PublicPageShell } from "~/features/marketing/components/PublicPageShell";

export function PrivacyPage() {
  return (
    <PublicPageShell>
      <LegalArticle
        title="Privacy"
        description="Localizer does not need an account. Here is what it stores and where. Last updated: August 23, 2026."
      >
        <section>
          <h2>No account and no Localizer tracking</h2>
          <p>
            Localizer does not require an account. It does not use Localizer
            analytics or advertising cookies. When you run Localizer yourself,
            your project data stays on that computer unless you share it.
          </p>
        </section>
        <section>
          <h2>Data saved on your computer</h2>
          <p>
            The dashboard saves each project in <code>.localizer-dev/</code>, or
            in the folder set by <code>LOCALIZER_DATA_DIR</code>. The CLI saves
            its settings and translation cache inside your iOS project.
            Localizer does not upload these files to an account service.
          </p>
        </section>
        <section>
          <h2>Data sent between the CLI and dashboard</h2>
          <p>
            The CLI sends the app text and related details to the dashboard. The
            dashboard sends your checked translations back to the CLI. The CLI
            writes the Xcode String Catalog inside your iOS project. The browser
            cannot browse the rest of your files.
          </p>
        </section>
        <section>
          <h2>Hosted dashboard</h2>
          <p>
            The hosted dashboard only shows sample data. You cannot upload,
            edit, or save a project there. It does not accept CLI requests.
          </p>
        </section>
        <section>
          <h2>If you host it yourself</h2>
          <p>
            Your hosting company may keep normal server, security, or access
            logs. Check that company&apos;s privacy policy before you let other
            people use your copy of Localizer.
          </p>
        </section>
        <section>
          <h2>GitHub</h2>
          <p>
            Localizer links to GitHub for the code, issues, and private security
            reports. GitHub uses its own privacy policy for anything you submit
            there.
          </p>
        </section>
        <section>
          <h2>Policy changes</h2>
          <p>
            This page will change if Localizer starts handling data differently.
            You can use the GitHub history to see what changed.
          </p>
        </section>
        <section>
          <h2>Delete local data</h2>
          <p>
            Stop Localizer, then delete the project folder from
            <code>.localizer-dev/projects/</code> or from the folder set by
            <code>LOCALIZER_DATA_DIR</code>. In your iOS project, delete
            <code>.localizer/</code> and the generated Localizer files if you no
            longer want them. Make a backup first if you may need the data
            later.
          </p>
        </section>
        <section>
          <h2>Questions</h2>
          <p>
            Ask questions in the{" "}
            <a href="https://github.com/dqstartupbuild/localizer/issues">
              GitHub issue tracker
            </a>
            . For a private privacy or security concern, use{" "}
            <a href="https://github.com/dqstartupbuild/localizer/security/advisories/new">
              GitHub&apos;s private security form
            </a>
            .
          </p>
        </section>
      </LegalArticle>
    </PublicPageShell>
  );
}
