import { getArchiveIssues, getTitleText } from "../svc/episodes";
const Archive = () => {
  const issues = getArchiveIssues();
  const title = getTitleText("archive");
  return (
    <div className="archive">
      <h1>{title}</h1>
      {issues.map((issue) => (
        <a className="single-issue-link" href={``} key={issue.id}>
          <h2>{issue.title}</h2>
          <h3>{issue.stringDate}</h3>
        </a>
      ))}
    </div>
  );
};

export default Archive;
