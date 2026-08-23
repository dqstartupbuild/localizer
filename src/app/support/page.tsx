import { type Metadata } from "next";
import { SupportPage } from "~/features/marketing/pages/SupportPage";
import { createPageMetadata } from "~/features/marketing/site/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Support | Localizer",
  description: "How to set up Localizer, run the CLI, and get help.",
  path: "/support",
});
export default function Support() {
  return <SupportPage />;
}
