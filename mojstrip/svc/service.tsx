import { useState, useEffect } from "react";
import { setSingleDataLine, getSingleDataLine } from "./user";

export function useDarkMode() {
  console.log("getSignleDataLine", getSingleDataLine("colorMode"));
  const [colorMode, setColorMode] = useState(getSingleDataLine("colorMode"));
  const [isMounted, setIsMounted] = useState(false);

  console.log("service!", colorMode);

  const setAndStoreColorMode = (mode: string) => {
    setSingleDataLine("colorMode", mode);
    setColorMode(mode);
  };

  useEffect(() => {
    // only if colorMode is not set
    if (colorMode === "") {
      // browser layer color mode
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? setColorMode("dark")
        : setColorMode("light");
      // on change
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) =>
          e.matches ? setColorMode("dark") : setColorMode("light")
        );
    }
    // show page
    setIsMounted(true);
  }, []);

  const toggleDarkMode = () =>
    ["dark", ""].includes(colorMode)
      ? setAndStoreColorMode("light")
      : setAndStoreColorMode("dark");

  return { colorMode, toggleDarkMode, isMounted };
}
