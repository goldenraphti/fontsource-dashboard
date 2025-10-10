const fontsPreviewList = document.getElementById("fonts-preview-list");

// font-size input
const fontPreviewSizeInput = document.getElementById("font-preview-size");
fontPreviewSizeInput.addEventListener("input", (event) => {
  const fontSize = event.target.value;
  fontsPreviewList.style.setProperty("--font-size-preview", `${fontSize}rem`);
});

// font-weight input
const fontPreviewWeightInput = document.getElementById("font-preview-weight");
fontPreviewWeightInput.addEventListener("input", (event) => {
  const fontWeight = event.target.value;
  fontsPreviewList.style.setProperty("--font-weight-preview", fontWeight);
});

// font italic input
const fontPreviewItalicInput = document.getElementById("font-preview-italic");
fontPreviewItalicInput.addEventListener("change", (event) => {
  const isItalic = event.target.checked;
  fontsPreviewList.style.setProperty(
    "--font-italic-preview",
    isItalic ? "italic" : "normal"
  );
});

// font categories input
const fontPreviewCategoriesDiv = document.getElementById(
  "font-preview-categories"
);
if (fontPreviewCategoriesDiv) {
  fontPreviewCategoriesDiv.addEventListener("change", () => {
    // Get all checked checkboxes inside the categories div
    const checkedBoxes = fontPreviewCategoriesDiv.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const selectedCategories = Array.from(checkedBoxes)
      .map((checkbox) => {
        if (checkbox instanceof HTMLInputElement) {
          return checkbox.value;
        }
        return "";
      })
      .filter(Boolean);

    // if NO checkbox is selected THEN all are displayed
    const detailsList = Array.from(
      document.querySelectorAll("details[font-categories]")
    );
    if (selectedCategories.length === 0) {
      detailsList.forEach((detail) => {
        detail.removeAttribute("hidden");
      });
      return;
    }

    // if some are selected then hidden all EXCEPT the ones with corresponding category
    detailsList.forEach((detail) => {
      const attr = detail.getAttribute("font-categories");
      const fontCategories = attr ? attr.split(", ") : [];
      const isVisible = selectedCategories.some((category) =>
        fontCategories.includes(category)
      );
      (detail as HTMLElement).hidden = !isVisible;
    });
  });
}
