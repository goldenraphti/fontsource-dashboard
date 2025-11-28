import { effect } from "./signal-effect.js";
import {
  db,
  listFavourites,
  fontsPreviewList,
} from "./fonts-collections-favourites.js";

const eraseFavouritesListButton = document.querySelector<HTMLButtonElement>(
  "[data-erase-favourites-list]"
);
export function eraseFavouritesListButtonHandler() {
  if (!eraseFavouritesListButton) return;

  eraseFavouritesListButton.addEventListener("click", async () => {
    await db.clear("favourites");

    const favourites = await db.getAll("favourites");
    listFavourites.set([...favourites]);
  });
}
eraseFavouritesListButtonHandler();

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
    if (listFavourites.get().length === 0) {
      document
        .querySelector("[data-no-favourites-saved]")
        ?.removeAttribute("hidden");
      eraseFavouritesListButton?.setAttribute("hidden", "true");
    } else {
      document
        .querySelector("[data-no-favourites-saved]")
        ?.setAttribute("hidden", "true");
      eraseFavouritesListButton?.removeAttribute("hidden");
    }
  });
  document
    .querySelector("[data-filtered-fonts-list-favourites]")
    ?.removeAttribute("hidden");
}
