import classnames from "classnames";
import Meta from "../../components/Meta";
import Head from "next/head";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ToggleDark from "../../components/ToggleDark";
import { useDarkMode } from "../../svc/service";
import { getComicsList, getComic, IComicItem } from "../../svc/episodes";
import { setEnvironment } from "../../lib/settings";

interface IServerSideProps {
  pages: IComicItem[];
}

interface IInitialProps extends IServerSideProps {
  env: string;
  slug: string;
}

// Generates a page for each blog post
// Called on build time 1st
export async function getStaticPaths() {
  const comics = await getComicsList();
  const paths = comics.map((i: IComicItem) => ({
    params: {
      slug: i.slug,
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
  const i = await getComic(params.slug);
  return {
    // Passed to the page component as props
    props: {
      slug: params.slug,
      pages: i.pages,
    },
  };
}

export default function CompleteComic({ slug, env, pages }: IInitialProps) {
  const { colorMode, toggleDarkMode, isMounted } = useDarkMode();
  setEnvironment(env);
  return (
    <>
      <Head>
        <Meta
          title="todo"
          description="todo"
          slug={`todo`}
          timeString={"todo" + " 08:00:00 +0000 UTC"}
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
        <div style={{ margin: "400px" }}>{slug}</div>
        {JSON.stringify(pages)}
        <Footer />
      </div>
    </>
  );
}
