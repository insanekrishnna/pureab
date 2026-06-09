import { uint8ArrayToBlob } from "@/lib/utils/blob";

interface WatermarkOptions {
  text: string;
  opacity: number;
  fontSize: number;
  color: string;
  rotation: number;
  position: "center" | "tile";
}

function parseColor(color: string) {
  const hex = color.replace("#", "");
  const normalized = hex.length === 3
    ? hex
        .split("")
        .map((char) => `${char}${char}`)
        .join("")
    : hex.padEnd(6, "0").slice(0, 6);

  return {
    r: parseInt(normalized.slice(0, 2), 16) / 255,
    g: parseInt(normalized.slice(2, 4), 16) / 255,
    b: parseInt(normalized.slice(4, 6), 16) / 255,
  };
}

export async function addWatermark(
  file: File,
  options: WatermarkOptions,
): Promise<Blob> {
  const { PDFDocument, StandardFonts, degrees, rgb } = await import("pdf-lib");
  const pdf = await PDFDocument.load(await file.arrayBuffer(), {
    ignoreEncryption: true,
  });
  const font = await pdf.embedFont(StandardFonts.HelveticaBold);
  const color = parseColor(options.color);

  for (const page of pdf.getPages()) {
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(options.text, options.fontSize);
    const textHeight = options.fontSize;
    const draw = (x: number, y: number) => {
      page.drawText(options.text, {
        x,
        y,
        size: options.fontSize,
        font,
        color: rgb(color.r, color.g, color.b),
        opacity: options.opacity,
        rotate: degrees(options.rotation),
      });
    };

    if (options.position === "tile") {
      const gapX = Math.max(textWidth + 80, 180);
      const gapY = Math.max(textHeight + 80, 140);

      for (let x = -textWidth; x < width + textWidth; x += gapX) {
        for (let y = -textHeight; y < height + textHeight; y += gapY) {
          draw(x, y);
        }
      }
    } else {
      draw((width - textWidth) / 2, (height - textHeight) / 2);
    }
  }

  const bytes = await pdf.save();
  return uint8ArrayToBlob(bytes, "application/pdf");
}
