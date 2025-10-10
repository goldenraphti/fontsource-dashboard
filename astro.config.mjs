// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import { fontsList } from "./src/content/fonts-list";

// https://astro.build/config
export default defineConfig({
  experimental: {
    fonts: fontsList.map((font) => ({
      provider: fontProviders.fontsource(),
      name: font.fontName,
      cssVariable: font.cssVariable,
    })),
  },
});
