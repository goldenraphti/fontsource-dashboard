export type FontType = {
  fontName: string;
  fontCategories: string[];
  urlPreview: string;
  isVariable?: boolean;
  tags?: string[];
  fontFamily: string;
  cssVariable: string;
};

// https://fontsource.org/fonts/eb-garamond
// https://fontsource.org/fonts/crimson-pro
// https://fontsource.org/fonts/nunito
export const fontsList: FontType[] = [
  {
    fontName: "Silkscreen",
    fontCategories: ["display"],
    urlPreview: "https://fontsource.org/fonts/silkscreen",
    fontFamily: "'Silkscreen', system-ui",
    cssVariable: "--font-silkscreen",
  },
  {
    fontName: "Space Grotesk",
    fontCategories: ["sans-serif"],
    urlPreview: "https://fontsource.org/fonts/space-grotesk",
    isVariable: true,
    fontFamily: "'Space Grotesk Variable', sans-serif",
    cssVariable: "--font-space-grotesk",
  },
  {
    fontName: "Geologica",
    fontCategories: ["sans-serif"],
    urlPreview: "https://fontsource.org/fonts/geologica",
    isVariable: false,
    fontFamily: "'Geologica Variable', sans-serif",
    cssVariable: "--font-geologica",
  },
  {
    fontName: "Lexend Deca",
    fontCategories: ["sans-serif"],
    urlPreview: "https://fontsource.org/fonts/lexend-deca",
    isVariable: true,
    fontFamily: "'Lexend Deca Variable', sans-serif",
    cssVariable: "--font-lexend-deca",
  },
  {
    fontName: "EB Garamond",
    fontCategories: ["serif"],
    urlPreview: "https://fontsource.org/fonts/eb-garamond",
    isVariable: true,
    fontFamily: "'EB Garamond Variable', serif",
    cssVariable: "--font-eb-garamond",
  },
  {
    fontName: "Crimson Pro",
    fontCategories: ["serif"],
    urlPreview: "https://fontsource.org/fonts/crimson-pro",
    isVariable: true,
    fontFamily: "'Crimson Pro Variable', serif",
    cssVariable: "--font-crimson-pro",
  },
  {
    fontName: "Nunito",
    fontCategories: ["sans-serif"],
    urlPreview: "https://fontsource.org/fonts/nunito",
    isVariable: true,
    fontFamily: "'Nunito Variable', sans-serif",
    cssVariable: "--font-nunito",
  },
];
