import classnames from "classnames";
import Head from "next/head";
import Navigation from "../components/Navigation";
import ToggleDark from "../components/ToggleDark";
import { useDarkMode } from "../svc/service";
import { setEnvironment } from "../lib/settings";

interface IInitialProps {
  env: string;
}

import { getEpisode } from "../svc/episodes";
const Episode = ({ id }: { id?: number }) => {
  const episode = getEpisode(id);
  console.log(episode);
  return <pre>{JSON.stringify(episode)}</pre>;
};

export default function Home({ env }: IInitialProps) {
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
        <Episode />
      </div>
    </>
  );
}
