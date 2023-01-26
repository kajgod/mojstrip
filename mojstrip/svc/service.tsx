import { useState, useEffect, useCallback } from "react";
import { setSingleDataLine, getSingleDataLine } from "./user";

export function useDarkMode() {
  const [colorMode, setColorMode] = useState(getSingleDataLine("colorMode"));
  const [isMounted, setIsMounted] = useState(false);

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
  }, [colorMode]);

  const toggleDarkMode = () =>
    ["dark", ""].includes(colorMode)
      ? setAndStoreColorMode("light")
      : setAndStoreColorMode("dark");

  return { colorMode, toggleDarkMode, isMounted };
}

export function useHideNavigation() {
  const [scrollDirection, setScrollDirection] = useState<"hide" | "show">(
    "show"
  );

  const can = useCallback(
    (direction: "hide" | "show") => scrollDirection !== direction,
    [scrollDirection]
  );
  const show = () => setScrollDirection("show");
  const hide = () => setScrollDirection("hide");

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let t: NodeJS.Timeout;
    const setStateAndReset = (state: "up" | "down", scrollY: number) => {
      if (scrollY < 300 && can("show")) {
        show();
        return;
      }
      if (state === "up") {
        if (t) clearTimeout(t);
        can("hide") && hide();
        return;
      }
      can("show") && show();
    };
    const listener = () => {
      const scrollY = window.pageYOffset;
      if (scrollY > lastScrollY) {
        setStateAndReset("down", scrollY);
      } else if (scrollY < lastScrollY) {
        setStateAndReset("up", scrollY);
      }
      lastScrollY = scrollY;
    };
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [can]);

  return scrollDirection;
}
