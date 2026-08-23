import Link from "next/link";
import { BrandMark } from "~/features/marketing/components/BrandMark";

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="public-footer__inner">
        <div>
          <BrandMark />
          <p className="public-footer__statement">
            Check iOS app translations and sync them back to Xcode.
          </p>
        </div>
        <div className="public-footer__links" aria-label="Project links">
          <Link href="/support">Support</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/license">MIT license</Link>
          <a href="https://github.com/dqstartupbuild/localizer">GitHub</a>
        </div>
      </div>
      <p className="public-footer__copyright">
        Free and open source under the MIT License.
      </p>
    </footer>
  );
}
