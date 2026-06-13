import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  const imagePath = join(process.cwd(), "public", "pure.png");
  const imageData = readFileSync(imagePath).toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={`data:image/png;base64,${imageData}`}
          style={{
            position: "absolute",
            width: 120,
            height: 70,
            
          }}
        />
      </div>
    ),
    { ...size }
  );
}
