import classnames from "classnames";
import Meta from "../components/Meta";
import Head from "next/head";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ToggleDark from "../components/ToggleDark";
import Archive from "../components/Archive";
import { useDarkMode } from "../svc/service";
import { getCurrentIssue } from "../svc/episodes";
import { setEnvironment } from "../lib/settings";

interface IServerSideProps {
  date: string;
  title: string;
  description: string;
}

interface IInitialProps extends IServerSideProps {
  env: string;
}

export const getStaticProps = async () => {
  const issue = getCurrentIssue();
  return {
    props: {
      date: issue.date,
      title: "Arhiva stripova - MojStrip časopisa",
      description: issue.editorial.replace(/(<([^>]+)>)/gi, ""),
    },
  };
};

export default function Home({ env, date, title, description }: IInitialProps) {
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
        <Archive />
        <Footer />
      </div>
    </>
  );
}
