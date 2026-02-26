import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

type SatoriFont = {
  name: string;
  data: ArrayBuffer;
  weight: number;
  style: string;
};

const toArrayBuffer = (buf: Buffer): ArrayBuffer => {
  const view = new Uint8Array(buf.byteLength);
  view.set(buf);
  return view.buffer;
};

async function loadGoogleFonts(_text: string): Promise<SatoriFont[]> {
  const regularPath = resolve(
    process.cwd(),
    "src/assets/fonts/NotoSansKR-Regular.otf"
  );
  const boldPath = resolve(
    process.cwd(),
    "src/assets/fonts/NotoSansKR-Bold.otf"
  );

  const [regular, bold] = await Promise.all([
    readFile(regularPath),
    readFile(boldPath),
  ]);

  return [
    {
      name: "Noto Sans KR",
      data: toArrayBuffer(regular),
      weight: 400,
      style: "normal",
    },
    {
      name: "Noto Sans KR",
      data: toArrayBuffer(bold),
      weight: 700,
      style: "normal",
    },
  ];
}

export default loadGoogleFonts;
