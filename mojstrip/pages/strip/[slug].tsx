import classnames from "classnames";
import Meta from "../../components/Meta";
import Head from "next/head";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ToggleDark from "../../components/ToggleDark";
import { useDarkMode } from "../../svc/service";
import { getComicsList, getComic, IComicItem, IPage } from "../../svc/episodes";
import { setEnvironment } from "../../lib/settings";
import Comic from "../../components/Comic";

interface IServerSideProps {
  pages: IPage[];
  title: string;
  authorName: string;
  authorSlug: string;
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
      title: i.title,
      authorName: i.authorName,
      authorSlug: i.author,
      pages: i.pages,
    },
  };
}

export default function CompleteComic({
  slug,
  env,
  pages,
  title,
  authorName,
  authorSlug,
}: IInitialProps) {
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
        <Comic
          title={title}
          author={authorName}
          authorName={authorName}
          pages={pages}
          slug={slug}
          preScript=""
          postScript=""
          maxWidth={800}
          episode={0}
        />
        <Footer />
      </div>
    </>
  );
}
