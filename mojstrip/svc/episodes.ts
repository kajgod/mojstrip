import issues from "../data/issues.json";
import authors from "../data/authors.json";

export interface IAuthors {
  [key: string]: {
    name: string;
    image: string;
    bio: string;
  };
}

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

interface IComicMeta {
  slug: string;
  title: string;
  author: string;
  authorName: string;
}

export interface IComic extends IComicMeta {
  id?: number;
  episode: number;
  preScript: string;
  postScript: string;
  pages: IPage[];
}

export type IEpisode = IComic[];

interface IIssueMeta {
  id: number;
  title: string;
  cover: string;
  editorial: string;
  date: string;
  stringDate: string;
}

export interface IIssue extends IIssueMeta {
  comics: IComic[];
}

export interface IArchiveIssue extends IIssueMeta {
  comics: IComicMeta[];
}

/**
 * Get issue (episode) by number, and default tu most recent issue
 * @param id
 * @returns IIssue
 */
export const getIssue = async (id: number = issues.length): Promise<IIssue> => {
  const issue = structuredClone(issues.find((i) => i.id === id)) as IIssue; // clone to avoid mutation
  if (!issue) {
    throw new Error("Issue not found");
  }
  for (const comic of issue.comics) {
    const pages = await import(
      `../data/episodes/${comic.slug}/${comic.episode}.json`
    );
    comic.pages = pages?.default || [];
    comic.authorName = (authors as IAuthors)[comic.author]?.name || "";
  }
  return issue;
};

export const getArchiveIssues = () => {
  const archiveIssues = structuredClone(issues) as unknown;
  (archiveIssues as IArchiveIssue[]).forEach((issue) => {
    (issue.comics as unknown) = issue.comics.map((comic) => {
      return {
        slug: comic.slug,
        title: comic.title,
        author: comic.author,
        authorName: (authors as IAuthors)[comic.author]?.name || "",
      } as IComicMeta;
    });
  });
  return archiveIssues as IArchiveIssue[];
};
