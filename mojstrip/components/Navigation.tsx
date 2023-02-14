import { useState } from "react";
import Link from "next/link";
import classnames from "classnames";
import { useHideNavigation } from "../svc/service";
import { IToggleDark } from "./ToggleDark";
import Hamburger from "./Hamburger";

interface INavigation {
  Toggler: ({ colorMode, toggleDarkMode }: IToggleDark) => JSX.Element;
  colorMode: string;
  toggleDarkMode: () => void;
  isMounted: boolean;
}

const Navigation = ({
  Toggler,
  toggleDarkMode,
  colorMode,
  isMounted,
}: INavigation) => {
  const [isOpen, setOpen] = useState(false);
  const { visibilityClass, activitiyClass } = useHideNavigation();
  return (
    <header className={classnames("navigation", visibilityClass, activitiyClass)}>
      <nav className="container">
        <div className="logo">
          <Link href="/">MojStrip</Link>
        </div>
        <ul className={classnames("nav-links", isOpen && "active")}>
          <li className="nav-link">
            <Link href="/">Novi broj</Link>
          </li>
          <li className="nav-link">
            <Link href="/arhiva">Svi brojevi</Link>
          </li>
          {/* <li className="nav-link"> */}
          {/*   <Link href="/strip">Stripovi</Link> */}
          {/* </li> */}
          {/* <li className="nav-link"> */}
          {/*   <Link href="/autori">Autori</Link> */}
          {/* </li> */}
          <li className="nav-link">
            {isMounted && (
              <Toggler colorMode={colorMode} toggleDarkMode={toggleDarkMode} />
            )}
          </li>
        </ul>
        <Hamburger isOpen={isOpen} setOpen={setOpen} />
      </nav>
    </header>
  );
};

export default Navigation;
