import Link from "next/link";
import s from "../styles/components/Header.module.css";

export default function Header() {
  return (
    <header className={`lr-container ${s.header}`}>
      <h1 title="Literoad (альфа-версия)">
        <Link href="/">
          <a className={s.homeLink}>
            Literoad
            <sup className={s.badge}>α</sup>
          </a>
        </Link>
      </h1>
    </header>
  );
}
