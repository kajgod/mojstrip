import Link from "next/link";
import { IComicItem } from "../svc/episodes";
const Comics = ({ comics }: { comics: IComicItem[] }) => (
  <div className="comics-list">
    <ul>
      {comics.map((comic) => (
        <li key={comic.slug}>
          <Link className="comic-item" href={`/strip/${comic.slug}`}>
            {comic.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Comics;
