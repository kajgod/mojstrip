import classnames from "classnames";
import Head from "next/head";
import Meta from "../components/Meta";
import Navigation from "../components/Navigation";
import ToggleDark from "../components/ToggleDark";
import Issue from "../components/Issue";
import Footer from "../components/Footer";
import { useDarkMode } from "../svc/service";
import { getCurrentIssue } from "../svc/episodes";
import { setEnvironment } from "../lib/settings";

interface IServerSideProps {
  date: string;
  title: string;
  id: number;
}

interface IInitialProps extends IServerSideProps {
  env: string;
}

export const getServerSideProps = async () => {
  const issue = getCurrentIssue();
  return {
    props: {
      date: issue.date,
      title: issue.title,
      id: issue.id,
    },
  };
};

export default function Home({ env, date, title, id }: IInitialProps) {
  const { colorMode, toggleDarkMode, isMounted } = useDarkMode();
  setEnvironment(env);
  return (
    <>
      <Head>
        <Meta
          title={`${title} - crtani romani i stripovi`}
          description="Čitaj stripove domaćih autora online i potpuno besplatno. Novi urednik, Darko Macan, dobro je poznata garancija kvalitete."
          slug={"" + id}
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
        <Issue />
        <Footer />
      </div>
    </>
  );
}
