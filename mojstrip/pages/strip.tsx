import Link from "next/link";
import classnames from "classnames";
import Meta from "../components/Meta";
import Head from "next/head";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ToggleDark from "../components/ToggleDark";
import { useDarkMode } from "../svc/service";
import { getCurrentIssue, getComicsList, IComicItem } from "../svc/episodes";
import { setEnvironment } from "../lib/settings";

interface IServerSideProps {
  date: string;
  title: string;
  description: string;
  comics: IComicItem[];
}

interface IInitialProps extends IServerSideProps {
  env: string;
}

export const getStaticProps = async () => {
  const issue = getCurrentIssue();
  const comics = await getComicsList();
  return {
    props: {
      date: issue.date,
      title: "Arhiva stripova - MojStrip časopis",
      description:
        "Najbolji stripovi najboljih autora za najbolje čitatelje! To može biti samo MojStrip :-)",
      comics,
    },
  };
};

export default function Home({
  env,
  date,
  title,
  description,
  comics,
}: IInitialProps) {
  const { colorMode, toggleDarkMode, isMounted } = useDarkMode();
  setEnvironment(env);
  return (
    <>
      <Head>
        <Meta
          title={title}
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
        {comics.map((comic) => (
          <Link
            className="comic-item"
            key={comic.slug}
            href={`/strip/${comic.slug}`}
          >
            {comic.title}
          </Link>
        ))}
        <Footer />
      </div>
    </>
  );
}
