import { LegalArticle } from "~/features/marketing/components/LegalArticle";
import { PublicPageShell } from "~/features/marketing/components/PublicPageShell";

export function PrivacyPage() {
  return (
    <PublicPageShell>
      <LegalArticle
        title="Privacy"
        description="What Localizer handles today, written for the local development workflow that currently exists. Last updated: August 23, 2026."
      >
        <section>
          <h2>The short version</h2>
          <p>
            Localizer does not currently require an account, publish a hosted
            sync service, or include Localizer analytics or advertising cookies.
            In development, project data stays on the machine running the
            Next.js app unless you choose to share it yourself.
          </p>
        </section>
        <section>
          <h2>Local development data</h2>
          <p>
            The local dashboard stores one project state file per project in{" "}
            <code>.localizer-dev/</code>, or in the folder named by{" "}
            <code>LOCALIZER_DATA_DIR</code>. The CLI stores its project
            configuration and translation cache in the target repository. Those
            files are local development data; they are not sent to a
            Localizer-hosted account service because one is not implemented.
          </p>
        </section>
        <section>
          <h2>What moves between the CLI and dashboard</h2>
          <p>
            The local CLI sends normalized localization metadata to the local
            dashboard API and receives reviewed translation data. The CLI
            retains control of source files and writes generated catalog output
            inside the target repository. The browser is not given unrestricted
            access to your filesystem.
          </p>
        </section>
        <section>
          <h2>Public production preview</h2>
          <p>
            The hosted dashboard shows bundled read-only sample data so you can
            explore the interface without an account. It does not accept
            projects, translations, or CLI requests, and it does not save work
            entered through the preview because editing is unavailable there.
          </p>
        </section>
        <section>
          <h2>If you host Localizer</h2>
          <p>
            A hosting provider may create standard server, security, or access
            logs while serving a hosted instance. Those practices depend on the
            provider and configuration you choose. Review your provider’s
            privacy documentation before exposing an instance to other people.
          </p>
        </section>
        <section>
          <h2>Third-party sites</h2>
          <p>
            GitHub links are provided for source code, issues, and private
            security reports. GitHub handles information you submit there under
            its own policies.
          </p>
        </section>
        <section>
          <h2>Changes</h2>
          <p>
            When the implemented data model changes, this page should change
            with it. The source repository is the current record of the
            application’s behavior.
          </p>
        </section>
        <section>
          <h2>Control or delete local data</h2>
          <p>
            You control local development data on your machine. Stop the local
            server, then remove the relevant project folder from
            <code>.localizer-dev/projects/</code> or the folder configured by
            <code>LOCALIZER_DATA_DIR</code>. In a target repository, review and
            remove <code>.localizer/</code> and generated Localizer files if
            they are no longer wanted. Keep a backup if you may need the data.
          </p>
        </section>
        <section>
          <h2>Questions and reports</h2>
          <p>
            Ask implementation questions in the{" "}
            <a href="https://github.com/dqstartupbuild/localizer/issues">
              GitHub issue tracker
            </a>
            . For a privacy or security concern that should not be public, use{" "}
            <a href="https://github.com/dqstartupbuild/localizer/security/advisories/new">
              GitHub private vulnerability reporting
            </a>
            .
          </p>
        </section>
      </LegalArticle>
    </PublicPageShell>
  );
}
