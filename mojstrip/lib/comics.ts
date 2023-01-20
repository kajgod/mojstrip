import { IEpisode, IComic, IPage } from "../svc/episodes";
export const getMaxWidth = (episode: IEpisode) => {
  const {comics} = episode;
  const allPages: IPage[] = comics.reduce((acc: IPage[], comic: IPage[]) => {
    const {pages} = comic;
    return [...acc, ...pages];
  }, []);
};
