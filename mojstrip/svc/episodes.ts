import episodes from "../data/episodes.json";

export interface IPage {
  page: number;
  url: string;
  title: string;
  alt: string;
  description: string;
  tags: string[];
  width: number;
  height: number;
}

export interface IComic {
  id?: number;
  title: string;
  author: string;
  pages: IPage[];
}

export interface IEpisode {
  id: number;
  title: string;
  comics: IComic[];
}

const ep = episodes as IEpisode[];

/**
 * Get issue (episode) by number, and default tu most recent issue
 * @param id
 * @returns IEpisode
 */
export const getEpisode = (id: number = episodes.length): IEpisode => {
  return ep.find((episode) => episode.id === id) as IEpisode;;
};
