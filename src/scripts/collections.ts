import { Signal } from "signal-polyfill";
import { effect } from "./signal-effect.js";
import { db } from "./fonts-collections-favourites";
import { slugify } from "./helper-functions.js";
import type { Collection } from "../types/types.js";

export const listCollections: Signal.State<Collection[]> = new Signal.State([]);

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
    await db.put("collections", {
      title: collectionName,
      fonts: [],
      id: slugify(collectionName),
    });
    const collections = await db.getAll("collections");
    listCollections.set([...collections]);
    input.value = "";
  });
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
    collectionLinkEl.href = `/collections/${collection.id}`;
    collectionLinkEl.textContent = collection.title;
    collectionLinkEl.setAttribute("transition:name", collection.id);
    li.appendChild(collectionLinkEl);
    collectionsContainer.appendChild(li);
    const btn = createDeleteCollectionButton(collection);
    collectionLinkEl.appendChild(btn);
  });
}

export async function getCollectionsFromDBAndUpdateSignalsState() {
  const collectionsFromDB = await db.getAll("collections");
  listCollections.set([...collectionsFromDB]);
  console.log(
    "📥 Fetching collections from IndexedDB",
    collectionsFromDB,
    listCollections,
  );
}
getCollectionsFromDBAndUpdateSignalsState();

populateCollectionsList();
