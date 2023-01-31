import episodes from "../data/issues.json";

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
  slug: string;
  title: string;
  author: string;
  episode: number;
}

export type IEpisode = IComic[];

export interface IIssue {
  id: number;
  title: string;
  cover: string;
  editorial: string;
  date: string;
  stringDate: string;
  episode: number;
}

/**
 * Get issue (episode) by number, and default tu most recent issue
 * @param id
 * @returns IIssue
 */
export const getIssue = async (
  id: number = episodes.length
): Promise<IIssue> => {
  const episode = await import(`../data/episodes/${id}.json`);
  return episode;
};
