import Link from "next/link";
import { PublicPageShell } from "~/features/marketing/components/PublicPageShell";

export function NotFoundPage() {
  return (
    <PublicPageShell>
      <main className="not-found-page">
        <p>404</p>
        <h1>We could not find that page.</h1>
        <p>Go back to the home page and try another link.</p>
        <Link href="/">
          Go home <span aria-hidden="true">↗</span>
        </Link>
      </main>
    </PublicPageShell>
  );
}
