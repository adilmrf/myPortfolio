/**
 * Source for the social share card (src/app/opengraph-image.png).
 *
 * This file is NOT part of the build — the card is committed as a static PNG so
 * that GitHub Pages serves it with a real `.png` extension and an `image/png`
 * Content-Type. Next.js's generated metadata route emits an extensionless file,
 * which static hosts serve as application/octet-stream and social scrapers reject.
 *
 * To regenerate after editing this file:
 *   cp scripts/og-image.source.tsx src/app/opengraph-image.tsx
 *   GITHUB_PAGES=true GITHUB_REPOSITORY=adilmrf/myPortfolio npm run build
 *   cp out/opengraph-image src/app/opengraph-image.png
 *   cp out/opengraph-image src/app/twitter-image.png
 *   rm src/app/opengraph-image.tsx
 *   # then copy your edits back into this file
 */
import { ImageResponse } from "next/og";

// Required by `output: "export"` — bakes the image at build time instead of
// serving it from a runtime route handler.
export const dynamic = "force-static";

export const alt = "Adil Mahroof — Aerospace Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#fafafa",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: 40, height: 4, background: "#f59e0b" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#a1a1aa",
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>
            Adil Mahroof
          </div>
          <div style={{ fontSize: 40, color: "#e4e4e7", marginTop: 20 }}>
            Aerospace Engineer
          </div>
          <div style={{ fontSize: 28, color: "#a1a1aa", marginTop: 14 }}>
            Rocket Propulsion · UAVs · Satellite AIT
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#71717a" }}>
          <div>Dubai, United Arab Emirates</div>
          <div>adilmrf.github.io/myPortfolio</div>
        </div>
      </div>
    ),
    size,
  );
}
