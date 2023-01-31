import { IIssue, IComic, IPage } from "../svc/episodes";
import { getDefaultComicWidth } from "./settings";

export const getMaxWidth = (episode: IIssue): number => {
  const { comics } = episode;
  const allPages = comics
    .reduce((acc: IPage[], comic) => {
      const { pages } = comic;
      return [...acc, ...pages];
    }, [])
    .reduce((acc: number, page) => {
      if (page.width > acc) return page.width;
      return acc;
    }, 0);
  return allPages || getDefaultComicWidth();
};
