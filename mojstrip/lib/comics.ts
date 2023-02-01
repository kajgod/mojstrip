import { IIssue, IComic, IPage } from "../svc/episodes";
import { getDefaultComicWidth } from "./settings";

export const getMaxWidth = (issue: IIssue): number => {
  const { comics } = issue;
  if (!comics || !Array.isArray(comics)) {
    throw new Error("Comics is not iterable, error finding max width");
  }
  const allPages = comics
    .reduce((acc: IPage[], comic) => {
      const { pages } = comic;
      console.log(comic);
      return [...acc, ...pages];
    }, [])
    .reduce((acc: number, page) => {
      if (page.width > acc) return page.width;
      return acc;
    }, 0);
  return allPages || getDefaultComicWidth();
};
