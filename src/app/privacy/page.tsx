import { type Metadata } from "next";
import { PrivacyPage } from "~/features/marketing/pages/PrivacyPage";
import { createPageMetadata } from "~/features/marketing/site/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy | Localizer",
  description:
    "What Localizer stores, where it is saved, and how to delete it.",
  path: "/privacy",
});
export default function Privacy() {
  return <PrivacyPage />;
}
