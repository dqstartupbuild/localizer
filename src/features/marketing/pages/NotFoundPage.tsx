import Link from "next/link";
import { PublicPageShell } from "~/features/marketing/components/PublicPageShell";

export function NotFoundPage() {
  return (
    <PublicPageShell>
      <main className="not-found-page">
        <p>404</p>
        <h1>That page is not in this catalog.</h1>
        <p>
          Try the public site, open the local dashboard, or visit support for
          the current workflow.
        </p>
        <Link href="/">
          Return home <span aria-hidden="true">↗</span>
        </Link>
      </main>
    </PublicPageShell>
  );
}
