import { type Metadata } from "next";

import { LandingPage } from "~/features/marketing/pages/LandingPage";

export const metadata: Metadata = {
  title: "Localizer | Localize your app screenshots in 5 minutes",
  description:
    "Localizer helps indie app developers translate their app, screenshots, and App Store copy from one simple dashboard.",
};

export default function Home() {
  return <LandingPage />;
}
