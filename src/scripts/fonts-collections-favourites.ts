import { openDB } from "idb";
import { Signal } from "signal-polyfill";
import { effect } from "./signal-effect.js";

const listFavourites: Signal.State<any[]> = new Signal.State([]);

/* prepare IndexDB database for favourites and collections */

const db = await openDB("FontsDashboard", 1, {
  upgrade(db) {
    db.createObjectStore("collections", { keyPath: "id" });
    db.createObjectStore("favourites", { keyPath: "fontId" });
  },
});

async function getFavouritesFromDBAndUpdateSignalsState() {
  const favouritesFromDB = await db.getAll("favourites");
  listFavourites.set([...favouritesFromDB]);
}
getFavouritesFromDBAndUpdateSignalsState();

/* add listeners to DOM */

const fontsPreviewList = document.getElementById("fonts-preview-list");

const addToFavouritesButton = fontsPreviewList?.querySelectorAll(
  'button[data-action="add-to-favourites"]'
);

if (addToFavouritesButton?.length) {
  for await (const btn of addToFavouritesButton) {
    btn.addEventListener("click", async () => {
      const fontFamilyClicked = btn
        .closest("details")
        ?.getAttribute("font-name");

      if (!fontFamilyClicked) return;
      if (
        listFavourites
          .get()
          .map((fav) => fav.fontId)
          .includes(fontFamilyClicked)
      ) {
        await db.delete("favourites", fontFamilyClicked);
      } else {
        await db.put("favourites", { fontId: fontFamilyClicked });
      }
      const favourites = await db.getAll("favourites");
      listFavourites.set([...favourites]);
    });
  }
}

function updateFavouritesBtnsUI(favouritesList: any[]) {
  [...addToFavouritesButton].forEach((btn) => {
    if (
      favouritesList
        .map((fav) => fav.fontId)
        .includes(btn.closest("details")?.getAttribute("font-name"))
    ) {
      btn.dataset.isFavourite = true;
    } else {
      btn.dataset.isFavourite = false;
    }
  });
}

effect(() => {
  updateFavouritesBtnsUI(listFavourites.get());
});

function filterFontsListToShowFavouritesOnly() {
  const favouritesList = listFavourites.get();
  fontsPreviewList?.querySelectorAll("details").forEach((fontDetail) => {
    const fontName = fontDetail.getAttribute("font-name");
    if (!fontName) return;
    if (favouritesList.map((fav) => fav.fontId).includes(fontName)) {
      fontDetail.hidden = false;
    } else {
      fontDetail.hidden = true;
    }
  });
}

if (document.querySelector("[data-filtered-fonts-list-favourites]")) {
  effect(() => {
    filterFontsListToShowFavouritesOnly();
  });
}
