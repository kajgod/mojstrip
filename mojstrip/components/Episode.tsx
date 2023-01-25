import { useEffect, useState } from "react";
import classnames from "classnames";
import { getEpisode, IEpisode, IComic } from "../svc/episodes";
import { getImagesCDN, getComicViewStyle } from "../lib/settings";

interface IComicProps extends IComic {
  server: string;
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
}: ITitleAndPrefaceProps) => (
  <div className="preface">
    <div className="cover">
      <img className="cover-image" src={cover} alt={title} />
      <h1>{title}</h1>
    </div>
    <p>{description}</p>
  </div>
);

const Episode = ({ id }: { id?: number }) => {
  const [episode, setEpisode] = useState<IEpisode | null>(null);
  useEffect(() => {
    (async () => {
      const episode = await getEpisode(id);
      setEpisode(episode);
    })();
  }, [id]);
  const server = getImagesCDN();
  return (
    <div className={classnames("episode", getComicViewStyle())}>
      <h1>{episode?.title ?? ""}</h1>
      {episode?.comics.map((comic) => (
        <Comic key={comic.id} {...comic} server={server} />
      ))}
    </div>
  );
};

export default Episode;
