import { type ReactNode } from "react";
import { PublicFooter } from "~/features/marketing/components/PublicFooter";
import { PublicHeader } from "~/features/marketing/components/PublicHeader";

type PublicPageShellProps = { children: ReactNode };

export function PublicPageShell({ children }: PublicPageShellProps) {
  return (
    <div className="public-site">
      <PublicHeader />
      {children}
      <PublicFooter />
    </div>
  );
}
