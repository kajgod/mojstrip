// consts
const DEV_IMAGE_CDN = "http://localhost:3001";
const PROD_IMAGE_CDN = "https://cdn.example.com";
const DEFAULT_COMIC_WIDTH = 900;
//#region navigation
const DEBOUNCE_SCROLL = 25;
const ALWAYS_SHOW_AREA = 500;
//#endregion

const settings = {
  imagesServer: "",
  vieswStyle: "default",
  defaultComicWidth: DEFAULT_COMIC_WIDTH,
  navigation: {
    debounceScroll: DEBOUNCE_SCROLL,
    alwaysShowArea: ALWAYS_SHOW_AREA,
  },
};

// methods
export const setEnvironment = (env: string) => {
  switch (env) {
    case "development":
      settings.imagesServer = DEV_IMAGE_CDN;
      break;
    default:
      settings.imagesServer = PROD_IMAGE_CDN;
      break;
  }
};

export const getImagesCDN = () => settings.imagesServer;

export const getComicViewStyle = () => settings.vieswStyle;

export const getDefaultComicWidth = () => settings.defaultComicWidth;

interface INavigationConsts {
  debounceScroll: number;
  alwaysShowArea: number;
}
export const getNavigationConsts = (): INavigationConsts => settings.navigation;
