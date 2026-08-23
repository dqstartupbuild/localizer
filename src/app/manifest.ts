import { type MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Localizer",
    short_name: "Localizer",
    description:
      "A local-first, open-source localization workflow for iOS projects.",
    start_url: "/",
    display: "standalone",
    background_color: "#eef3ed",
    theme_color: "#0c2924",
    icons: [
      { src: "/localizer-mark.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
