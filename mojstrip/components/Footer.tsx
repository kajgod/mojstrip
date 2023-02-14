import Link from "next/link";
import { getVersionNumber } from "../svc/service";

const Footer = () => (
  <footer className="footer">
    <ul className="nav-links">
      <li className="nav-link">
        <Link href="/">Novi broj</Link>
      </li>
      <li className="nav-link">
        <Link href="/arhiva">Svi brojevi</Link>
      </li>
      <li className="nav-link">
        <Link href="/strip">Stripovi</Link>
      </li>
      <li className="nav-link">
        <Link href="/autori">Autori</Link>
      </li>
    </ul>
    <mark>{getVersionNumber()}</mark>
  </footer>
);

export default Footer;
