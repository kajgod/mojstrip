import classnames from "classnames";
import Meta from "../../components/Meta";
import Head from "next/head";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ToggleDark from "../../components/ToggleDark";
import Issue from "../../components/Issue";
import { useDarkMode } from "../../svc/service";
import {
  getArchiveIssues,
  getArchiveIssue,
  IArchiveIssue,
} from "../../svc/episodes";
import { setEnvironment } from "../../lib/settings";

interface IServerSideProps {
  date: string;
  title: string;
  description: string;
}

interface IInitialProps extends IServerSideProps {
  env: string;
  slug: string;
}

// Generates a page for each blog post
// Called on build time 1st
export async function getStaticPaths() {
  const issues = getArchiveIssues();
  const paths = issues.map((i: IArchiveIssue) => ({
    params: {
      slug: String(i.id),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

// `getStaticPaths` requires using `getStaticProps`
// Called on build time 2nd
export async function getStaticProps({ params }: { params: IInitialProps }) {
  const i = getArchiveIssue(params.slug) as IArchiveIssue;
  return {
    // Passed to the page component as props
    props: {
      slug: params.slug,
      date: i.date,
      title: i.title,
      description: i.editorial.replace(/(<([^>]+)>)/gi, ""),
    },
  };
}

export default function ArchiveIssue({
  slug,
  env,
  date,
  title,
  description,
}: IInitialProps) {
  const { colorMode, toggleDarkMode, isMounted } = useDarkMode();
  setEnvironment(env);
  return (
    <>
      <Head>
        <Meta
          title={`${title} - crtani romani i stripovi`}
          description={description}
          slug="https://www.mojstrip.com/arhiva/"
          timeString={date + " 08:00:00 +0000 UTC"}
        />
      </Head>
      <div
        id="mojstrip"
        className={classnames(colorMode, isMounted && "loaded")}
      >
        <Navigation
          Toggler={ToggleDark}
          colorMode={colorMode}
          toggleDarkMode={toggleDarkMode}
          isMounted={isMounted}
        />
        <Issue id={Number(slug)} />
        <Footer />
      </div>
    </>
  );
}
