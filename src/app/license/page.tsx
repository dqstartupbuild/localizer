import { type Metadata } from "next";
import { LicensePage } from "~/features/marketing/pages/LicensePage";
import { createPageMetadata } from "~/features/marketing/site/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "MIT License | Localizer",
  description: "What the MIT License lets you do with Localizer.",
  path: "/license",
});
export default function License() {
  return <LicensePage />;
}
