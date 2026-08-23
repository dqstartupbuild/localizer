import { type Metadata } from "next";
import { SupportPage } from "~/features/marketing/pages/SupportPage";
import { createPageMetadata } from "~/features/marketing/site/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Support | Localizer",
  description:
    "Current Localizer setup steps, commands, limits, and open-source support paths.",
  path: "/support",
});
export default function Support() {
  return <SupportPage />;
}
