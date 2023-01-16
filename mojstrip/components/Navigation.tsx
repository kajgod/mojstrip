import { useState } from "react";
import Link from "next/link";
import classnames from "classnames";
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
  return (
    <div className="navigation">
      <nav className="container">
        <div className="logo">
          <Link href="/">MojStrip</Link>
        </div>
        <ul className={classnames("nav-links", isOpen && "active")}>
          <li className="nav-link">
            <Link href="/">Naslovnica</Link>
          </li>
          <li className="nav-link">
            <Link href="/arhiva">Stariji brojevi</Link>
          </li>
          <li className="nav-link">
            <Link href="/mojstrip">O nama</Link>
          </li>
          <li className="nav-link">
            {isMounted && (
              <Toggler colorMode={colorMode} toggleDarkMode={toggleDarkMode} />
            )}
          </li>
        </ul>
        <Hamburger isOpen={isOpen} setOpen={setOpen} />
      </nav>
    </div>
  );
};

export default Navigation;
