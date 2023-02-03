// consts
const DEV_IMAGE_CDN = "http://localhost:3001";
const PROD_IMAGE_CDN = "https://cdn.example.com";
const DEFAULT_COMIC_WIDTH = 900;
//#region navigation settings
const DEBOUNCE_SCROLL = 25;
const ALWAYS_SHOW_AREA = 500;
const TRANSPARENT_NAV_TIMEOUT = 2000;
//#endregion

// texts
interface ITitles {
  [key: string]: string;
}
const titles: ITitles = {
  titlePage: "Naslovnica",
  archive: "Stariji brojevi",
  about: "O nama",
  contact: "Kontakt",
};

export interface INavigationConsts {
  debounceScroll: number;
  alwaysShowArea: number;
  transparentNavTimeout: number;
}

export interface ISettings {
  imagesServer: string;
  viewStyle: string;
  defaultComicWidth: number;
  navigation: INavigationConsts;
}

const settings: ISettings = {
  imagesServer: "",
  viewStyle: "default",
  defaultComicWidth: DEFAULT_COMIC_WIDTH,
  navigation: {
    debounceScroll: DEBOUNCE_SCROLL,
    alwaysShowArea: ALWAYS_SHOW_AREA,
    transparentNavTimeout: TRANSPARENT_NAV_TIMEOUT,
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

export const getComicViewStyle = () => settings.viewStyle;

export const getDefaultComicWidth = () => settings.defaultComicWidth;

export const getNavigationConsts = (): INavigationConsts => settings.navigation;

export const getTitleText = (key: string): string => titles[key] ?? "";
