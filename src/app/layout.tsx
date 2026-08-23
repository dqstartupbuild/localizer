import "~/styles/globals.css";
import "~/features/marketing/styles/BrandMark.css";
import "~/features/marketing/styles/CatalogFlow.css";
import "~/features/marketing/styles/LandingPage.css";
import "~/features/marketing/styles/LegalArticle.css";
import "~/features/marketing/styles/LocalizationLedger.css";
import "~/features/marketing/styles/NotFoundPage.css";
import "~/features/marketing/styles/OpenSourceNote.css";
import "~/features/marketing/styles/PublicFooter.css";
import "~/features/marketing/styles/PublicHeader.css";
import "~/features/marketing/styles/PublicPageShell.css";
import "~/features/marketing/styles/SourceBoundary.css";
import "~/features/marketing/styles/SupportPage.css";

import { type Metadata } from "next";

import { getSiteUrl } from "~/features/marketing/site/getSiteUrl";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  ...(getSiteUrl() ? { metadataBase: getSiteUrl() } : {}),
  title: { default: "Localizer", template: "%s" },
  description:
    "A local-first, open-source localization workflow for iOS projects.",
  openGraph: { images: [] },
  twitter: { images: [] },
  icons: [{ rel: "icon", url: "/localizer-mark.svg", type: "image/svg+xml" }],
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
