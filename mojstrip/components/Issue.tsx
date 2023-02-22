import { useEffect, useState } from "react";
import classnames from "classnames";
import { getIssue, IIssue } from "../svc/episodes";
import { getComicViewStyle, getDefaultComicWidth } from "../lib/settings";
import { getMaxWidth } from "../lib/comics";
import Comic from "./Comic";

interface ITitleAndPrefaceProps {
  title: string;
  cover: string;
  description: string;
}

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
        <Comic key={comic.id} {...comic} maxWidth={maxWidth} />
      ))}
    </main>
  );
};

export default Issue;
