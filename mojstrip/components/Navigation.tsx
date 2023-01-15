import { useState } from "react";
import Link from "next/link";
import classnames from "classnames";
import { IToggleDark } from "./ToggleDark";

interface INavigation {
  Toggler: ({ colorMode, toggleDarkMode }: IToggleDark) => JSX.Element;
  colorMode: string;
  toggleDarkMode: () => void;
  isMounted: boolean;
}

const NavToggler = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}) => {
  return (
    <div className="open">
      <button onClick={() => setOpen(!isOpen)}>
        <div id="nav-animacija" className={isOpen ? "active" : ""}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>
  );
};

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
        <NavToggler isOpen={isOpen} setOpen={setOpen} />
      </nav>
    </div>
  );
};

export default Navigation;
