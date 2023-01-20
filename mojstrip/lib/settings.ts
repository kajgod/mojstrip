// consts
const DEV_IMAGE_CDN = "http://localhost:3001";
const PROD_IMAGE_CDN = "https://cdn.example.com";

const settings = {
  imagesServer: "",
  vieswStyle: "default",
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
