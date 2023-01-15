import classnames from "classnames";
import Head from "next/head";
import Navigation from "../components/Navigation";
import ToggleDark from "../components/ToggleDark";
import { useDarkMode } from "../svc/service";

export default function Home() {
  const { colorMode, toggleDarkMode, isMounted } = useDarkMode();
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
      </div>
    </>
  );
}
