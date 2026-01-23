import { openDB } from "idb";
import { Signal } from "signal-polyfill";
import { effect } from "./signal-effect.js";
import { db } from "./fonts-collections-favourites";
import { slugify } from "./helper-functions.js";

export const listCollections: Signal.State<any[]> = new Signal.State([]);

// in each collection populate list of fonts added to that collection

// in each collection can rename or delete collection

const formCreateNewCollection = document.getElementById(
  "create-new-collection",
);
if (formCreateNewCollection) {
  formCreateNewCollection.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.getElementById(
      "new-collection-name",
    ) as HTMLInputElement;
    const collectionName = input.value.trim();
    if (!collectionName) return;
    await db.put("collections", { id: collectionName, fonts: [] });
    const collections = await db.getAll("collections");
    listCollections.set([...collections]);
    input.value = "";
  });
}

const addToCollectionsButton = document.querySelectorAll(
  'button[data-action="add-to-collection"]',
);

if (addToCollectionsButton?.length) {
  for await (const btn of addToCollectionsButton) {
    btn.addEventListener("click", async () => {
      const fontFamilyClicked = btn
        .closest("details")
        ?.getAttribute("font-name");
      if (!fontFamilyClicked) return;

      await db.put("collections", { fontId: fontFamilyClicked });

      const collections = await db.getAll("collections");
      listCollections.set([...collections]);
    });
  }
}

effect(() => {
  populateCollectionsList();
});

function createDeleteCollectionButton(collectionToDelete: any) {
  const btn = document.createElement("button");
  btn.dataset.action = "delete-collection";
  btn.textContent = "🗑️";
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await db.delete("collections", collectionToDelete.id);
    const updatedCollections = await db.getAll("collections");
    listCollections.set([...updatedCollections]);
  });
  return btn;
}

export function populateCollectionsList() {
  const collectionsContainer = document.querySelector(
    "[data-collections-container]",
  ) as HTMLUListElement;
  if (!collectionsContainer) return;
  collectionsContainer.innerHTML = "";
  const collections = listCollections.get();
  collections.forEach((collection) => {
    const li = document.createElement("li");
    li.classList.add("collection-item");
    const collectionLinkEl = document.createElement("a");
    collectionLinkEl.href = `/collections/${slugify(collection.id)}`;
    collectionLinkEl.textContent = collection.id;
    li.appendChild(collectionLinkEl);
    collectionsContainer.appendChild(li);
    const btn = createDeleteCollectionButton(collection);
    collectionLinkEl.appendChild(btn);
  });
}

async function getCollectionsFromDBAndUpdateSignalsState() {
  const collectionsFromDB = await db.getAll("collections");
  listCollections.set([...collectionsFromDB]);
}
getCollectionsFromDBAndUpdateSignalsState();

populateCollectionsList();
