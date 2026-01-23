import { Signal } from "signal-polyfill";
import { effect } from "./signal-effect.js";
import { db } from "./fonts-collections-favourites";
import {
  listCollections,
  getCollectionsFromDBAndUpdateSignalsState,
} from "./collections.js";

const collectionID: string =
  document.getElementsByTagName("h1")[0].dataset.id || "";

const fontsListContainer = document.getElementById("collection-fonts");

function findMatchingCollection(collections: any[], id: string) {
  return collections.find((collection) => collection.id === id);
}

function populateFontsListInCollection(fontsArray: string[]) {
  for (const fontId of fontsArray) {
    const li = document.createElement("li");
    li.textContent = fontId;
    fontsListContainer?.appendChild(li);
  }
}

function displayEmptyFontsList() {
  if (!fontsListContainer) return;
  const emptyMessage = document.createElement("p");
  const linkToAddFonts = document.createElement("a");
  linkToAddFonts.href = "/";
  linkToAddFonts.textContent = "main fonts list";
  linkToAddFonts.setAttribute("transition:name", "fonts-list");
  emptyMessage.textContent = "This collection has no fonts yet. Go to the ";
  emptyMessage.appendChild(linkToAddFonts);
  fontsListContainer.appendChild(emptyMessage);
}

if (!collectionID) {
  throw new Error("No collection id found in dataset");
}

await getCollectionsFromDBAndUpdateSignalsState();

const matchedCollection = findMatchingCollection(
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

effect(() => {
  if (!fontsListContainer) return;
  fontsListContainer.innerHTML = "";
  if (matchedCollection.fonts.length === 0) {
    displayEmptyFontsList();
    return;
  } else {
    populateFontsListInCollection(matchedCollection.fonts);
  }
});

// on page load get list of fonts for this collection from db

// in each collection populate list of fonts added to that collection

// in each collection can rename or delete collection
