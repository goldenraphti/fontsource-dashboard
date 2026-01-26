import { db } from "./fonts-collections-favourites";
import {
  listCollections,
  getCollectionsFromDBAndUpdateSignalsState,
} from "./collections.js";
import {
  isInCollectionPage,
  matchedCollection,
  listFonts,
} from "./collection.js";

const popoverEls = document.querySelectorAll("div[popover]");
const popoverForms = document.querySelectorAll("div[popover] form");

const hidePopoverButtons = document.querySelectorAll(
  "button[data-action='hide-popover']",
);

hidePopoverButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const popoverToHide = btn.closest("div[popover]") as HTMLDivElement;
    popoverToHide?.hidePopover();
  });
});

let fontName = undefined;

for (const el of popoverEls) {
  el.addEventListener("toggle", async (e) => {
    const addToCollectionPopoverDisplayed = e.target;
    if (!(addToCollectionPopoverDisplayed instanceof HTMLElement)) {
      return;
    }
    fontName = addToCollectionPopoverDisplayed.getAttribute("data-font-name");
    if (fontName) {
      const collectionsCheckboxesListContainer = el?.querySelector(
        "[data-add-to-collections-container]",
      );
      await populateCollectionsCheckboxesList(
        fontName,
        collectionsCheckboxesListContainer,
      );
    }
  });
}

for (const form of popoverForms) {
  form.addEventListener("submit", async (e) => {
    if (!(e.target instanceof HTMLFormElement)) return;
    const formElement = e.target;
    const formData = new FormData(formElement);
    const selectedCollections = formData.getAll("collection-checkbox");
    form.closest("div[popover]")?.hidePopover();
    if (fontName) {
      for (const collectionId of listCollections.get()) {
        if (selectedCollections.includes(collectionId.id)) {
          await addFontToCollection(collectionId.id, fontName);
        } else {
          // Remove font from collection if it exists
          const collection = await db.get("collections", collectionId.id);
          if (collection && collection.fonts.includes(fontName)) {
            collection.fonts = collection.fonts.filter(
              (fontId: string) => fontId !== fontName,
            );
            await db.put("collections", collection);
            await getCollectionsFromDBAndUpdateSignalsState();
          }
        }

        // update signals in case it's done in a collection page for example
        if (isInCollectionPage) {
          if (matchedCollection) {
            if (matchedCollection.id === collectionId.id) {
              const updatedCollection = await db.get(
                "collections",
                collectionId.id,
              );
              if (updatedCollection) {
                listFonts.set([...updatedCollection.fonts]);
              }
            }
          }
        }
      }
    }
  });
}

const fontNameToAdd: string =
  document
    .querySelector("[id^='add-to-collection']")
    ?.getAttribute("data-font-name") || "";

if (!fontNameToAdd) {
  throw new Error("No font name found to add to collections");
}

export function hideCheckboxesListAndDisplayEmptyCoollectionsText(
  collectionsCheckboxesListContainer: HTMLUListElement,
  emptyCollectionText: HTMLParagraphElement,
) {
  collectionsCheckboxesListContainer.hidden = true;
  emptyCollectionText.removeAttribute("hidden");
}

export function showCheckboxesListAndHideEmptyCollectionsText(
  collectionsCheckboxesListContainer: HTMLUListElement,
  emptyCollectionText: HTMLParagraphElement,
) {
  collectionsCheckboxesListContainer.removeAttribute("hidden");
  emptyCollectionText.hidden = true;
}

export function populateCollectionsCheckboxesList(
  fontName: string,
  collectionsCheckboxesListContainer: Element | null,
) {
  if (!collectionsCheckboxesListContainer) return;
  const emptyCollectionText =
    collectionsCheckboxesListContainer.parentElement?.querySelector(
      "p[data-empty-collection-message]",
    );
  collectionsCheckboxesListContainer.innerHTML = "";
  const collections = listCollections.get();

  if (collections.length === 0) {
    hideCheckboxesListAndDisplayEmptyCoollectionsText(
      collectionsCheckboxesListContainer,
      emptyCollectionText,
    );
    return;
  } else {
    showCheckboxesListAndHideEmptyCollectionsText(
      collectionsCheckboxesListContainer,
      emptyCollectionText,
    );
  }

  for (const collection of collections) {
    const label = document.createElement("label");
    label.classList.add("collection-checkbox-label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = collection.id;
    checkbox.name = "collection-checkbox";
    if (collection.fonts.includes(fontName)) {
      checkbox.checked = true;
    }
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(collection.title));
    collectionsCheckboxesListContainer.appendChild(label);
  }
}

await getCollectionsFromDBAndUpdateSignalsState();

async function addFontToCollection(collectionId: string, fontId: string) {
  const collection = await db.get("collections", collectionId);
  if (!collection) {
    throw new Error(`Collection with id ${collectionId} not found`);
  }
  if (!collection.fonts.includes(fontId)) {
    collection.fonts.push(fontId);
    await db.put("collections", collection);
    await getCollectionsFromDBAndUpdateSignalsState();
  }
}
