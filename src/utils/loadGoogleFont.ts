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

  return [
    {
      name: "Noto Sans KR",
      data: regular.buffer.slice(
        regular.byteOffset,
        regular.byteOffset + regular.byteLength
      ),
      weight: 400,
      style: "normal",
    },
    {
      name: "Noto Sans KR",
      data: bold.buffer.slice(bold.byteOffset, bold.byteOffset + bold.byteLength),
      weight: 700,
      style: "normal",
    },
  ];
}

export default loadGoogleFonts;
