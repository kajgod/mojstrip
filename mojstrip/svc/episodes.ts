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

/**
 * Get issue (episode) by number, and default tu most recent issue
 * @param id
 * @returns IEpisode
 */
export const getEpisode = async (
  id: number = episodes.length
): Promise<IEpisode> => {
  const episode = await import(`../data/episodes/${id}.json`);
  console.log("episode", episode);
  return episode;
};
