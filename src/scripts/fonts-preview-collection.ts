import { effect } from "./signal-effect.js";
import { listCollections } from "./collections.js";
import type { Collection } from "../types/types.js";

export function isTheFontSavedInSomeCollection(
  fontName: string,
  listOfCollections: Collection[],
): boolean {
  let isSaved = false;
  for (const collection of listOfCollections) {
    if (collection.fonts.includes(fontName)) {
      isSaved = true;
      break;
    }
  }
  return isSaved;
}

export async function styleBookmarkIconsOnPage() {
  const saveToCollectionButtonsList: HTMLButtonElement[] =
    document.querySelectorAll('button[data-action="add-to-collection"]');
  const collections = listCollections.get();

  saveToCollectionButtonsList.forEach((button: HTMLButtonElement) => {
    const detailsEl = button.closest("details");
    if (detailsEl && detailsEl.hidden) {
      // If the details element is hidden, skip processing this button
      return;
    }
    const fontName = detailsEl?.getAttribute("font-name");
    if (!fontName) return;
    const isSavedInSomeCollection = isTheFontSavedInSomeCollection(
      fontName,
      collections,
    );
    if (isSavedInSomeCollection) {
      button.setAttribute("data-is-saved-in-collections", "true");
    } else {
      button.setAttribute("data-is-saved-in-collections", "false");
    }
  });
}

effect(async () => {
  await styleBookmarkIconsOnPage();
});
