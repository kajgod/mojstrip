// consts
const DEV_IMAGE_CDN = "http://localhost:3001";
const PROD_IMAGE_CDN = "https://cdn.example.com";

const settings = {
  imagesServer: "",
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
