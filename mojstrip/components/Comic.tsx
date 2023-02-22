import Link from "next/link";
import { IComic } from "../svc/episodes";
import { getImagesCDN } from "../lib/settings";
import Page from "./Page";

interface IComicProps extends IComic {
  maxWidth: number;
}

const Comic = ({ title, author, pages, slug }: IComicProps) => {
  const server = getImagesCDN();
  return (
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
};

export default Comic;
