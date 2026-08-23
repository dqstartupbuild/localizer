import { type Metadata } from "next";

import { LandingPage } from "~/features/marketing/pages/LandingPage";
import { createPageMetadata } from "~/features/marketing/site/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Localizer | Review iOS app translations",
  description: "Check translations for an iOS app and sync them back to Xcode.",
  path: "/",
});

export default function Home() {
  return <LandingPage />;
}
