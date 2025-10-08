export const websiteTitle: string = "Oslo Urban Zoo";
export const websiteTitleWithEmojis: string = "🦒Oslo🐊Urban🦏Zoo🦜";

// SEO
export const seoDescription: string =
  "template SEO description of the 🦒Oslo🐊Urban🦏Zoo🦜.";

// Map
export const initialMapCoordinates: [number, number] = [59.922893, 10.75819]; // Oslo center
export const initialZoomLevel: number = 14;
export const minZoomLevel: number = 13;
export const maxZoomLevel: number = 17;

const mapTilesShortlist: Record<
  string,
  {
    name: string;
    tileUrl: string;
    attribution: string;
    ext: string;
    isDarkBG: boolean;
  }
> = {
  anthropologists: {
    name: "Anthropologists",
    tileUrl:
      "https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.{ext}",
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: "png",
    isDarkBG: false,
  },
  watercolor: {
    name: "Watercolor",
    tileUrl:
      "https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.{ext}",
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: "jpg",
    isDarkBG: true,
  },
};

export const mapTileStyle = mapTilesShortlist.watercolor;
