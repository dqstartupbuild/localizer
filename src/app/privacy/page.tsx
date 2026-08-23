import { type Metadata } from "next";
import { PrivacyPage } from "~/features/marketing/pages/PrivacyPage";
import { createPageMetadata } from "~/features/marketing/site/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy | Localizer",
  description:
    "How Localizer handles local development data and the public site today.",
  path: "/privacy",
});
export default function Privacy() {
  return <PrivacyPage />;
}
