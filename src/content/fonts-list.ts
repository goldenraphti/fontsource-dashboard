export type Font = {
  fontName: string;
  fontCategories: string[];
  urlPreview: string;
  urlCDN: string;
  isVariable?: boolean;
  tags?: string[];
};

// https://fontsource.org/fonts/space-grotesk/
// https://fontsource.org/fonts/geologica
// https://fontsource.org/fonts/lexend-deca
// https://fontsource.org/fonts/silkscreen
// https://fontsource.org/fonts/eb-garamond
// https://fontsource.org/fonts/crimson-pro
// https://fontsource.org/fonts/nunito
export const fontsList: Font[] = [
  {
    fontName: "Space Grotesk",
    fontCategories: ["sans-serif"],
    urlPreview: "https://fontsource.org/fonts/space-grotesk",
    urlCDN:
      "https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk:vf@latest/latin-wght-normal.woff2",
    isVariable: true,
  },
  {
    fontName: "Geologica",
    fontCategories: ["sans-serif"],
    urlPreview: "https://fontsource.org/fonts/geologica",
    urlCDN:
      "https://cdn.jsdelivr.net/fontsource/fonts/geologica:vf@latest/latin-wght-normal.woff2",
    isVariable: false,
  },
];
