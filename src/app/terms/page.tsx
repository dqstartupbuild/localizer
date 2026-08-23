import { type Metadata } from "next";
import { TermsPage } from "~/features/marketing/pages/TermsPage";
import { createPageMetadata } from "~/features/marketing/site/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Terms | Localizer",
  description: "Rules for using the Localizer website and source code.",
  path: "/terms",
});
export default function Terms() {
  return <TermsPage />;
}
