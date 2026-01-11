import { ImageResponse } from "next/og";
import content from "@/lib/content";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const backgrounds: Record<string, string> = {
  offWhite: "#f8fafc",
  ink: "#0b1021",
  sand: "#f5f1e8",
};

export default function Image() {
  const bg = backgrounds[content.og.bg ?? "offWhite"] ?? backgrounds.offWhite;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          backgroundColor: bg,
          color: bg === "#0b1021" ? "#e8edf6" : "#0b1224",
          fontFamily: "'Inter', 'Noto Sans SC', sans-serif",
        }}
      >
        <div style={{ fontSize: 20, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.7 }}>
          {content.person.handle}
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>{content.og.title}</div>
        <div style={{ fontSize: 28, maxWidth: "22ch", marginTop: 18, opacity: 0.8 }}>{content.og.subtitle}</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
