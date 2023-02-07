import classnames from "classnames";
import Head from "next/head";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ToggleDark from "../../components/ToggleDark";
import Issue from "../../components/Issue";
import { useDarkMode } from "../../svc/service";
import { getArchiveIssues, IArchiveIssue } from "../../svc/episodes";
import { setEnvironment } from "../../lib/settings";

interface IInitialProps {
  env: string;
  slug: string;
}

// Generates a page for each blog post
// Called on build time 1st
export async function getStaticPaths() {
  const issues = getArchiveIssues();
  const paths = issues.map((i: IArchiveIssue) => ({
    params: { slug: String(i.id) },
  }));

  return {
    paths,
    fallback: false,
  };
}

// `getStaticPaths` requires using `getStaticProps`
// Called on build time 2nd
export async function getStaticProps({ params }: { params: { slug: string } }) {
  return {
    // Passed to the page component as props
    props: { slug: params.slug },
  };
}

export default function ArchiveIssue({ slug, env }: IInitialProps) {
  const { colorMode, toggleDarkMode, isMounted } = useDarkMode();
  setEnvironment(env);
  return (
    <>
      <Head>
        <title>MojStrip</title>
        <meta name="description" content="Strip časopis" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
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
