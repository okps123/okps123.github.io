async function loadGoogleFont(
  font: string,
  text: string,
  weight: number
): Promise<ArrayBuffer> {
  const API = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`;

  const css = await (
    await fetch(API, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      },
    })
  ).text();

  const resource = css.match(
    /src:\s*url\((.+?)\)\s*format\('(opentype|truetype|woff)'\)/
  );

  const fallbackMap: Record<string, string> = {
    "Noto+Sans+KR-400":
      "https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/OTF/Korean/NotoSansCJKkr-Regular.otf",
    "Noto+Sans+KR-700":
      "https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/OTF/Korean/NotoSansCJKkr-Bold.otf",
    "Noto+Sans-400":
      "https://raw.githubusercontent.com/googlefonts/noto-fonts/main/hinted/ttf/NotoSans/NotoSans-Regular.ttf",
    "Noto+Sans-700":
      "https://raw.githubusercontent.com/googlefonts/noto-fonts/main/hinted/ttf/NotoSans/NotoSans-Bold.ttf",
  };

  const fontUrl = resource?.[1] ?? fallbackMap[`${font}-${weight}`];
  if (!fontUrl) throw new Error("Failed to download dynamic font");

  const res = await fetch(fontUrl);

  if (!res.ok) {
    throw new Error("Failed to download dynamic font. Status: " + res.status);
  }

  return res.arrayBuffer();
}

async function loadGoogleFonts(
  text: string
): Promise<
  Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
> {
  const fontsConfig = [
    {
      name: "Noto Sans KR",
      font: "Noto+Sans+KR",
      weight: 400,
      style: "normal",
    },
    {
      name: "Noto Sans KR",
      font: "Noto+Sans+KR",
      weight: 700,
      style: "normal",
    },
    {
      name: "Noto Sans",
      font: "Noto+Sans",
      weight: 400,
      style: "normal",
    },
    {
      name: "Noto Sans",
      font: "Noto+Sans",
      weight: 700,
      style: "normal",
    },
  ];

  const fonts = await Promise.all(
    fontsConfig.map(async ({ name, font, weight, style }) => {
      const data = await loadGoogleFont(font, text, weight);
      return { name, data, weight, style };
    })
  );

  return fonts;
}

export default loadGoogleFonts;
