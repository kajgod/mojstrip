import Link from "next/link";
import { IComicItem } from "../svc/episodes";
const Comics = ({ comics }: { comics: IComicItem[] }) => (
  <div className="comics-list">
    <ul>
      {comics.map((comic) => (
        <li key={comic.slug}>
          <Link className="comic-item" href={`/strip/${comic.slug}`}>
            <h2>{comic.title}</h2>
            <h3>{comic.authorName}</h3>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Comics;
