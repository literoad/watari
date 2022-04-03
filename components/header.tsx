import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import s from "../styles/components/Header.module.css";

export default function Header() {
  const { data: session } = useSession();

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
      <nav className={s.nav}>
        {session ? (
          <>
            <Link href="/dashboard">
              <a>Панель управления</a>
            </Link>
            <button onClick={() => signOut({ callbackUrl: "/" })}>Выход</button>
          </>
        ) : (
          <Link href="/auth/sign-up">
            <a>Вход</a>
          </Link>
        )}
      </nav>
    </header>
  );
}
