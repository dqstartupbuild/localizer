import { type MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Localizer",
    short_name: "Localizer",
    description:
      "Check translations for an iOS app and sync them back to Xcode.",
    start_url: "/",
    display: "standalone",
    background_color: "#eef3ed",
    theme_color: "#0c2924",
    icons: [
      { src: "/localizer-mark.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
