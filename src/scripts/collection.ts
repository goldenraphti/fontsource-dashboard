import { Signal } from "signal-polyfill";
import { effect } from "./signal-effect.js";
import {
  listCollections,
  getCollectionsFromDBAndUpdateSignalsState,
} from "./collections.js";

export const listFonts: Signal.State<string[]> = new Signal.State([]);

const collectionID: string =
  document.getElementsByTagName("h1")[0].dataset.id || "";

function findMatchingCollection(collections: any[], id: string) {
  return collections.find((collection) => collection.id === id);
}

export const isInCollectionPage =
  window.location.href.includes("/collections/");

export let fontsPreviewList = undefined;
export let matchedCollection = undefined;

if (isInCollectionPage) {
  if (!collectionID) {
    throw new Error("No collection id found in h1 dataset");
  }

  await getCollectionsFromDBAndUpdateSignalsState();

  matchedCollection = findMatchingCollection(
    listCollections.get(),
    collectionID,
  );

  if (!matchedCollection) {
    throw new Error(`No collection found with id: ${collectionID}`);
  }

  const collectionTitleElement = document.querySelector("h1");

  if (collectionTitleElement) {
    collectionTitleElement.textContent = matchedCollection.title;
  }

  listFonts.set([...matchedCollection.fonts]);

  effect(() => {
    const noFontEl = document.querySelector("[data-no-font-in-collection]");
    const fontsListEl = document.querySelector(
      "[data-filtered-fonts-list-collection]",
    );
    if (matchedCollection.fonts.length === 0) {
      console.log("⏰ NOFonts in collection:", matchedCollection.fonts);
      if (noFontEl) noFontEl.removeAttribute("hidden");
      if (fontsListEl) fontsListEl.setAttribute("hidden", "true");
      return;
    } else {
      console.log(
        "✍️Fonts in collection:",
        matchedCollection.fonts,
        noFontEl,
        fontsListEl,
      );
      if (noFontEl) noFontEl.setAttribute("hidden", "true");
      if (fontsListEl) fontsListEl.removeAttribute("hidden");
    }
  });

  // in each collection can rename or delete collection

  fontsPreviewList = document.getElementById("fonts-preview-list");

  function filterFontsListToShowCollectionOnly() {
    const savedFontsList = listFonts.get();
    fontsPreviewList?.querySelectorAll("details").forEach((fontDetail) => {
      const fontName = fontDetail.getAttribute("font-name");
      if (!fontName) return;
      if (savedFontsList.includes(fontName)) {
        console.log("🔍 Checking font:", fontDetail);
        fontDetail.hidden = false;
      } else {
        fontDetail.hidden = true;
      }
    });
  }
  effect(() => {
    filterFontsListToShowCollectionOnly();
  });
}
