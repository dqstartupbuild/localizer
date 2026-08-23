import { ImageResponse } from "next/og";

export const alt = "Localizer translation catalog with reviewed locale rows";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#0c2924",
        color: "#f5faf5",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "72px 84px",
        width: "100%",
      }}
    >
      <div
        style={{
          color: "#9bc9bb",
          display: "flex",
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: 4,
        }}
      >
        LOCALIZER · OPEN-SOURCE IOS LOCALIZATION
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 48,
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", maxWidth: 540 }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: -5,
              lineHeight: 0.95,
            }}
          >
            Keep the words close to the work.
          </div>
          <div
            style={{
              color: "#c9d7d0",
              fontSize: 27,
              lineHeight: 1.35,
              marginTop: 30,
            }}
          >
            Review a local catalog. Sync approved language back to your iOS
            project.
          </div>
        </div>
        <div
          style={{
            background: "#f6faf5",
            color: "#10211e",
            display: "flex",
            flexDirection: "column",
            marginLeft: 52,
            padding: 28,
            transform: "rotate(2deg)",
            width: 410,
          }}
        >
          <div
            style={{
              borderBottom: "2px solid #aebfb8",
              color: "#57726a",
              display: "flex",
              fontSize: 16,
              justifyContent: "space-between",
              paddingBottom: 16,
            }}
          >
            <span>Localizer.xcstrings</span>
            <span>3 locales</span>
          </div>
          <div
            style={{
              background: "#dce8e0",
              display: "flex",
              flexDirection: "column",
              marginTop: 16,
              padding: 18,
            }}
          >
            <span style={{ color: "#57726a", fontSize: 14 }}>
              SOURCE STRING
            </span>
            <span style={{ fontSize: 26, fontWeight: 700, marginTop: 8 }}>
              Start your next habit
            </span>
          </div>
          <div
            style={{
              borderBottom: "1px solid #c7d5cd",
              display: "flex",
              fontSize: 17,
              justifyContent: "space-between",
              padding: "16px 0",
            }}
          >
            <span style={{ color: "#08766f", fontWeight: 700 }}>ES</span>
            <span>reviewed</span>
          </div>
          <div
            style={{
              borderBottom: "1px solid #c7d5cd",
              display: "flex",
              fontSize: 17,
              justifyContent: "space-between",
              padding: "16px 0",
            }}
          >
            <span style={{ color: "#08766f", fontWeight: 700 }}>JA</span>
            <span>ready</span>
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
