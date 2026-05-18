import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const fontData = await readFile(
    path.join(process.cwd(), "public", "fonts", "syne-800.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#080604",
          borderRadius: 6,
          fontFamily: "Syne",
          fontWeight: 800,
          fontSize: 16,
          color: "#f97316",
          letterSpacing: "-0.04em",
        }}
      >
        JQ
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Syne", data: fontData, style: "normal", weight: 800 }],
    }
  );
}
