import { type Metadata } from "next";

import { LandingPage } from "~/features/marketing/pages/LandingPage";
import { createPageMetadata } from "~/features/marketing/site/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Localizer | Keep the words close to the work",
  description:
    "A local-first, open-source localization workflow for iOS projects.",
  path: "/",
});

export default function Home() {
  return <LandingPage />;
}
