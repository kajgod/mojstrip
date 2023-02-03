import Link from "next/link";
import { getArchiveIssues } from "../svc/episodes";
import { getTitleText } from "../lib/settings";
const Archive = () => {
  const issues = getArchiveIssues();
  const title = getTitleText("archive");
  return (
    <div className="archive">
      <h1>{title}</h1>
      {issues.map((issue) => (
        <Link
          className="single-issue-link"
          href={`arhiva/${issue.id}`}
          key={issue.id}
        >
          <h2>{issue.title}</h2>
          <h3>{issue.stringDate}</h3>
        </Link>
      ))}
    </div>
  );
};

export default Archive;
