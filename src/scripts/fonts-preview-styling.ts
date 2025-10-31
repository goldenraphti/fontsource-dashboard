import { Signal } from "signal-polyfill";
import { effect } from "./signal-effect.js";

const fontsPreviewList = document.getElementById("fonts-preview-list");

// font-size input
const fontPreviewSizeInput = document.getElementById("font-preview-size");
fontPreviewSizeInput?.addEventListener("input", (event) => {
  const fontSize = event?.target?.value;
  fontsPreviewList?.style.setProperty("--font-size-preview", `${fontSize}rem`);
});

// font-weight input
const fontPreviewWeightInput = document.getElementById("font-preview-weight");
fontPreviewWeightInput?.addEventListener("input", (event) => {
  const fontWeight = event?.target?.value;
  fontsPreviewList?.style.setProperty("--font-weight-preview", fontWeight);
});

// font italic input
const fontPreviewItalicInput = document.getElementById("font-preview-italic");
fontPreviewItalicInput?.addEventListener("change", (event) => {
  const isItalic = event?.target?.checked;
  fontsPreviewList?.style.setProperty(
    "--font-italic-preview",
    isItalic ? "italic" : "normal"
  );
});
