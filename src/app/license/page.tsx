import { type Metadata } from "next";
import { LicensePage } from "~/features/marketing/pages/LicensePage";
import { createPageMetadata } from "~/features/marketing/site/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "MIT License | Localizer",
  description: "A plain-language summary of the Localizer MIT License.",
  path: "/license",
});
export default function License() {
  return <LicensePage />;
}
