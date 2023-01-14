import Link from "next/link";
import { IToggleDark } from "./ToggleDark";

interface INavigation {
  Toggler: ({ colorMode, toggleDarkMode }: IToggleDark) => JSX.Element;
  colorMode: string;
  toggleDarkMode: () => void;
}

const Navigation = ({ Toggler, toggleDarkMode, colorMode }: INavigation) => (
  <div className="navigation">
    <nav className="container">
      <div className="logo">
        <Link href="/">MojStrip</Link>
      </div>
      <ul className="nav-links">
        <li className="nav-link">
          <Link href="/">Naslovnica</Link>
        </li>
        <li className="nav-link">
          <Link href="/arhiva">Stariji brojevi</Link>
        </li>
        <li className="nav-link">
          <Link href="/mojstrip">O nama</Link>
        </li>
      </ul>
      <Toggler toggleDarkMode={toggleDarkMode} colorMode={colorMode} />
    </nav>
  </div>
);

export default Navigation;
