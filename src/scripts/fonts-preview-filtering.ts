import { Signal } from "signal-polyfill";
import { effect } from "./signal-effect.js";

const fontsPreviewList = document.getElementById("fonts-preview-list");

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

const fontsFilteringByNameInput = document.getElementById("font-name-filter");
fontsFilteringByNameInput?.addEventListener("input", (event) => {
  const filterValue = event?.target?.value.toLowerCase();
  const detailsList = Array.from(
    document.querySelectorAll("details[font-name]")
  );
  detailsList.forEach((detail) => {
    const fontName = detail.getAttribute("font-name")?.toLowerCase();
    detail.hidden = !fontName?.includes(filterValue);
  });
});
