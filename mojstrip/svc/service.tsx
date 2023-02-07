import { useState, useEffect, useCallback } from "react";
import meta from "../data/meta.json";
import { setSingleDataLine, getSingleDataLine } from "./user";
import { debounce } from "../lib/util";
import { getNavigationConsts } from "../lib/settings";
const { debounceScroll, alwaysShowArea, transparentNavTimeout } =
  getNavigationConsts();

interface IUseDarkMode {
  colorMode: string;
  toggleDarkMode: () => void;
  isMounted: boolean;
}

type VisibilityState = "show" | "hide" | "initial";
interface IUseHideNavigation {
  visibilityClass: VisibilityState;
  activitiyClass: "active" | "inactive";
}

/**
 * @description A hook that handles dark and light modes
 * @returns {object} { darkMode, setDarkMode }
 * @example
 * const { colorMode, toggleDarkMode, isMounted } = useDarkMode();
 */
export function useDarkMode(): IUseDarkMode {
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

/**
 * @description A hook that hides navigation bar on scroll down and shows it on scroll up
 * @returns {object} { scrollDirection }
 */
let t: NodeJS.Timeout | null = null;
export function useHideNavigation(): IUseHideNavigation {
  const [scrollDirection, setScrollDirection] =
    useState<VisibilityState>("initial");
  const [activitiyClass, setActivityClass] = useState<"active" | "inactive">(
    "active"
  );

  const setScrollDirectionMiddleware = useCallback(
    (direction: VisibilityState) => {
      t && clearTimeout(t);
      setScrollDirection(direction);
      setActivityClass("active");
      if (direction === "show") {
        t = setTimeout(
          () => setActivityClass("inactive"),
          transparentNavTimeout
        );
        return;
      }
    },
    []
  );
  const can = useCallback(
    (direction: VisibilityState) => scrollDirection !== direction,
    [scrollDirection]
  );
  const show = useCallback(
    () => setScrollDirectionMiddleware("show"),
    [setScrollDirectionMiddleware]
  );
  const hide = useCallback(
    () => setScrollDirectionMiddleware("hide"),
    [setScrollDirectionMiddleware]
  );
  const initial = useCallback(
    () => setScrollDirectionMiddleware("initial"),
    [setScrollDirectionMiddleware]
  );

  const setStateAndReset = useCallback(
    (state: "up" | "down", scrollY: number) => {
      switch (true) {
        case scrollY < alwaysShowArea:
          can("initial") && initial();
          break;
        case state === "down":
          can("hide") && hide();
          break;
        default:
          can("show") && show();
      }
    },
    [can, show, hide, initial]
  );

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let t: NodeJS.Timeout;
    const listener = () => {
      const scrollY = window.pageYOffset;
      if (scrollY > lastScrollY) {
        setStateAndReset("down", scrollY);
      } else if (scrollY < lastScrollY) {
        setStateAndReset("up", scrollY);
      }
      lastScrollY = scrollY;
    };
    const runListener = debounce(listener, debounceScroll);
    window.addEventListener("scroll", runListener);
    return () => {
      window.removeEventListener("scroll", listener);
      clearTimeout(t);
    };
  }, [setStateAndReset]);

  return { visibilityClass: scrollDirection, activitiyClass };
}

export const getVersionNumber = () => meta.version;
