import { PublicPageShell } from "~/features/marketing/components/PublicPageShell";

export function SupportPage() {
  return (
    <PublicPageShell>
      <main className="support-page">
        <header>
          <h1>How to run Localizer</h1>
          <p>
            Run the dashboard on your computer and create a project. Copy its
            command, then run it from your iOS project folder. The hosted
            dashboard only shows sample data.
          </p>
        </header>
        <section>
          <h2>Set up a project</h2>
          <ol>
            <li>
              <a href="https://github.com/dqstartupbuild/localizer">
                Download Localizer from GitHub
              </a>
              . In the Localizer folder, run <code>npm install</code>, then{" "}
              <code>npm run dev</code>.
            </li>
            <li>
              Open <code>/projects</code> in a desktop browser.
            </li>
            <li>Create a project and copy the command it gives you.</li>
            <li>
              Run that command inside the iOS project you want to translate.
            </li>
            <li>
              After you check the translations, run <code>sync</code> to write
              them back to Xcode.
            </li>
          </ol>
        </section>
        <section>
          <h2>CLI commands</h2>
          <p>
            Run these commands inside the iOS project you want to translate. Use
            the exact Localizer path and project ID shown in your dashboard.
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
          <h2>What works today</h2>
          <p>
            Localizer can find common SwiftUI text. If it misses something, you
            can give the CLI a manifest file. Localizer does not yet translate
            text automatically, import GitHub projects, open pull requests, or
            sync through the hosted website.
          </p>
        </section>
        <section>
          <h2>Need help?</h2>
          <p>
            <a href="https://github.com/dqstartupbuild/localizer/issues">
              Open a GitHub issue
            </a>{" "}
            for bugs, feature ideas, or documentation problems. For a security
            problem, do not post the details publicly. Use{" "}
            <a href="https://github.com/dqstartupbuild/localizer/security/advisories/new">
              GitHub&apos;s private security form
            </a>{" "}
            instead.
          </p>
          <p>
            Localizer is an open-source project, so help is not guaranteed and
            may take time.
          </p>
        </section>
      </main>
    </PublicPageShell>
  );
}
