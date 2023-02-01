import issues from "../data/issues.json";

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
  preScript: string;
  postScript: string;
  pages: IPage[];
}

export type IEpisode = IComic[];

export interface IIssue {
  id: number;
  title: string;
  cover: string;
  editorial: string;
  date: string;
  stringDate: string;
  comics: IComic[];
}

/**
 * Get issue (episode) by number, and default tu most recent issue
 * @param id
 * @returns IIssue
 */
export const getIssue = async (id: number = issues.length): Promise<IIssue> => {
  const issue = issues.find((i) => i.id === id) as IIssue;
  if (!issue) {
    throw new Error("Issue not found");
  }
  for (const comic of issue.comics) {
    const pages = await import(
      `../data/episodes/${comic.slug}/${comic.episode}.json`
    );
    comic.pages = pages?.default || [];
  }
  return issue;
};
