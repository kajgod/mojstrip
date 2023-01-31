import { useEffect, useState } from "react";
import classnames from "classnames";
import { getIssue, IIssue, IComic } from "../svc/episodes";
import {
  getImagesCDN,
  getComicViewStyle,
  getDefaultComicWidth,
} from "../lib/settings";
import { getMaxWidth } from "../lib/comics";

interface IComicProps extends IComic {
  server: string;
  maxWidth: number;
}

interface IPageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ITitleAndPrefaceProps {
  title: string;
  cover: string;
  description: string;
}

const Page = ({ src, alt, width, height }: IPageProps) => (
  <div className="comic-page">
    <img
      className="comic-image"
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  </div>
);

const Comic = ({ title, author, pages, server }: IComicProps) => (
  <div className="comic">
    <h2>{title}</h2>
    <h3>{author}</h3>
    <div className="pages">
      {pages.map((page, index) => (
        <Page
          key={index}
          src={server + page.url}
          alt={page.alt}
          width={page.width}
          height={page.height}
        />
      ))}
    </div>
  </div>
);

const TitleAndPreface = ({
  title,
  cover,
  description,
}: ITitleAndPrefaceProps) => {
  const html = {
    __html: `
      <div class="cover">
        <img class="cover-image" src="${cover}" alt="${title}" />
        <h1>${title}</h1>
      </div>
      <p>${description}</p>
   `,
  };
  return <div className="preface" dangerouslySetInnerHTML={html} />;
};

const Episode = ({ id }: { id?: number }) => {
  const [episode, setEpisode] = useState<IIssue | null>(null);
  const [maxWidth, setMaxWidth] = useState<number>(getDefaultComicWidth());
  useEffect(() => {
    (async () => {
      const episode = await getIssue(id);
      setEpisode(episode);
      const maxWidth = getMaxWidth(episode);
      setMaxWidth(maxWidth);
    })();
  }, [id]);
  const server = getImagesCDN();
  return (
    <div
      className={classnames("episode", getComicViewStyle())}
      style={{ width: maxWidth }}
    >
      {episode && (
        <TitleAndPreface
          title={episode.title}
          cover={episode.cover}
          description={episode.description}
        />
      )}
      {episode?.comics.map((comic) => (
        <Comic key={comic.id} {...comic} maxWidth={maxWidth} server={server} />
      ))}
    </div>
  );
};

export default Episode;
