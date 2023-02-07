import { useEffect, useState } from "react";
import classnames from "classnames";
import { getIssue, IIssue, IComic } from "../svc/episodes";
import {
  getImagesCDN,
  getComicViewStyle,
  getDefaultComicWidth,
} from "../lib/settings";
import { getMaxWidth } from "../lib/comics";
import Link from "next/link";

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

const Comic = ({ title, author, pages, server, slug }: IComicProps) => (
  <section className="comic">
    <div className="title">
      <h2>
        <Link href={`strip/${slug}`}>{title}</Link>
      </h2>
      <h3 className="author">{author}</h3>
    </div>
    <div className="pages">
      {pages.map((page) => (
        <Page
          key={page.url}
          src={server + page.url}
          alt={page.alt}
          width={page.width}
          height={page.height}
        />
      ))}
    </div>
  </section>
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
      <summary>${description}</summary>
   `,
  };
  return <div className="preface" dangerouslySetInnerHTML={html} />;
};

const Issue = ({ id }: { id?: number }) => {
  const [issue, setIssue] = useState<IIssue | null>(null);
  const [maxWidth, setMaxWidth] = useState<number>(getDefaultComicWidth());
  useEffect(() => {
    (async () => {
      const issue = await getIssue(id);
      setIssue(issue);
      const maxWidth = getMaxWidth(issue);
      setMaxWidth(maxWidth);
    })();
  }, [id]);
  const server = getImagesCDN();
  return (
    <main
      className={classnames("episode", getComicViewStyle())}
      style={{ width: maxWidth }}
    >
      {issue && (
        <TitleAndPreface
          title={issue.title}
          cover={issue.cover}
          description={issue.editorial}
        />
      )}
      {issue?.comics.map((comic) => (
        <Comic key={comic.id} {...comic} maxWidth={maxWidth} server={server} />
      ))}
    </main>
  );
};

export default Issue;
