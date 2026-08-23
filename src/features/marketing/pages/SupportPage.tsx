import { PublicPageShell } from "~/features/marketing/components/PublicPageShell";

export function SupportPage() {
  return (
    <PublicPageShell>
      <main className="support-page">
        <header>
          <h1>Start with the project in front of you.</h1>
          <p>
            Localizer is early, local-first software. The support path is the
            repository, the local dashboard, and a short set of commands you can
            inspect.
          </p>
        </header>
        <section>
          <h2>Set up a project</h2>
          <ol>
            <li>
              Run <code>npm run dev</code> from this Localizer checkout.
            </li>
            <li>
              Open the dashboard on a desktop browser and create a project.
            </li>
            <li>
              Copy the project command from its overview into the target iOS
              repository.
            </li>
            <li>
              Run the same CLI path with <code>sync</code> after you have
              reviewed translations in the dashboard.
            </li>
          </ol>
        </section>
        <section>
          <h2>Run commands from the target repository</h2>
          <p>
            The dashboard gives each project its own copyable command. Replace
            the example project ID only when the dashboard gives you a different
            one. These are not bare commands installed in your iOS repository.
          </p>
          <dl>
            <div>
              <dt>
                <code>init</code>
              </dt>
              <dd>
                <code>
                  node
                  &apos;/absolute/path/to/localizer-main/packages/localizer-cli/src/index.mjs&apos;
                  init --project proj_example --api http://127.0.0.1:3000
                </code>
              </dd>
            </div>
            <div>
              <dt>
                <code>analyze</code>
              </dt>
              <dd>
                <code>
                  node
                  &apos;/absolute/path/to/localizer-main/packages/localizer-cli/src/index.mjs&apos;
                  analyze
                </code>
              </dd>
            </div>
            <div>
              <dt>
                <code>sync</code>
              </dt>
              <dd>
                <code>
                  node
                  &apos;/absolute/path/to/localizer-main/packages/localizer-cli/src/index.mjs&apos;
                  sync
                </code>
              </dd>
            </div>
            <div>
              <dt>
                <code>status</code>
              </dt>
              <dd>
                <code>
                  node
                  &apos;/absolute/path/to/localizer-main/packages/localizer-cli/src/index.mjs&apos;
                  status
                </code>
              </dd>
            </div>
          </dl>
        </section>
        <section>
          <h2>Known boundaries</h2>
          <p>
            The current scanner intentionally covers common SwiftUI literal
            calls. For more complex source or context-specific strings, use a
            normalized manifest. Hosted sync, account access, automatic
            translation, remote repository import, and pull-request automation
            are not part of the implemented workflow.
          </p>
        </section>
        <section>
          <h2>Get help or report a problem</h2>
          <p>
            <a href="https://github.com/dqstartupbuild/localizer/issues">
              Open a GitHub issue
            </a>{" "}
            for reproducible bugs, feature ideas, or documentation fixes. Do not
            include vulnerabilities in public issues. Use{" "}
            <a href="https://github.com/dqstartupbuild/localizer/security/advisories/new">
              GitHub private vulnerability reporting
            </a>{" "}
            for security concerns.
          </p>
          <p>
            Localizer is an open-source project and does not offer a guaranteed
            response time or support SLA.
          </p>
        </section>
      </main>
    </PublicPageShell>
  );
}
