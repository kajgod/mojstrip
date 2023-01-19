import { getEpisode, IComic } from "../svc/episodes";

const Comic = ({ title, author, pages }: IComic) => (
  <div className="comic">
    <h2>{title}</h2>
    <h3>{author}</h3>
    <div className="pages">
      {pages.map((page, index) => (
        <img key={index} src={page.url} alt={page.alt} />
      ))}
    </div>
  </div>
);

const Episode = ({ id }: { id?: number }) => {
  const episode = getEpisode(id);
  return (
    <div className="episode">
      <h1>{episode.title}</h1>
      {episode.comics.map((comic) => (
        <Comic key={comic.id} {...comic} />
      ))}
    </div>
  );
};

export default Episode;
