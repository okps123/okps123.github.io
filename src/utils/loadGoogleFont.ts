import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

async function loadGoogleFonts(_text?: string): Promise<
  Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
> {
  const regularPath = resolve(
    process.cwd(),
    "node_modules/@fontsource/noto-sans-kr/files/noto-sans-kr-0-400-normal.woff"
  );
  const boldPath = resolve(
    process.cwd(),
    "node_modules/@fontsource/noto-sans-kr/files/noto-sans-kr-0-700-normal.woff"
  );

  const [regular, bold] = await Promise.all([
    readFile(regularPath),
    readFile(boldPath),
  ]);

  const toArrayBuffer = (buf: Buffer): ArrayBuffer => {
    const view = new Uint8Array(buf.byteLength);
    view.set(buf);
    return view.buffer;
  };

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
