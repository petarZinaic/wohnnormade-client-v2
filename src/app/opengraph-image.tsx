import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Wohnnomade";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#1b2327",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Orange accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "#ff725e",
          }}
        />

        {/* Brand name */}
        <div
          style={{
            display: "flex",
            fontSize: 90,
            fontWeight: 700,
            letterSpacing: "-2px",
            color: "#ffffff",
            marginBottom: 20,
          }}
        >
          Wohn
          <span style={{ color: "#ff725e" }}>nomade</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "rgba(255,255,255,0.65)",
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          Mieter bewerten. Erfahrungen teilen. Sicher vermieten.
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 44,
            display: "flex",
            fontSize: 22,
            color: "#ff725e",
          }}
        >
          wohnnomade.com
        </div>
      </div>
    ),
    size
  );
}
