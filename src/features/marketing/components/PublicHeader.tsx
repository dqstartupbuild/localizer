import { BrandMark } from "~/features/marketing/components/BrandMark";
import { PublicAction } from "~/features/marketing/components/PublicAction";
import Link from "next/link";

export function PublicHeader() {
  return (
    <header className="public-header">
      <div className="public-header__inner">
        <BrandMark />
        <nav aria-label="Primary navigation" className="public-nav">
          <Link href="/support">Support</Link>
          <a href="https://github.com/dqstartupbuild/localizer">GitHub</a>
          <PublicAction />
        </nav>
      </div>
    </header>
  );
}
