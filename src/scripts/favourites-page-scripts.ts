import { db } from "./fonts-collections-favourites.js";
import { listFavourites } from "./fonts-collections-favourites.js";

export function eraseFavouritesListButtonHandler() {
  console.log("eraseFavouritesListButtonHandler loaded");

  const eraseFavouritesListButton = document.querySelector<HTMLButtonElement>(
    "[data-erase-favourites-list]"
  );
  if (!eraseFavouritesListButton) return;

  eraseFavouritesListButton.addEventListener("click", async () => {
    await db.clear("favourites");

    const favourites = await db.getAll("favourites");
    listFavourites.set([...favourites]);
  });
}
eraseFavouritesListButtonHandler();
