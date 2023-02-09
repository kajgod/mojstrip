import classnames from "classnames";
import Head from "next/head";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ToggleDark from "../components/ToggleDark";
import Archive from "../components/Archive";
import { useDarkMode } from "../svc/service";
import { setEnvironment } from "../lib/settings";

interface IInitialProps {
  env: string;
}

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
        <Archive />
        <Footer />
      </div>
    </>
  );
}
