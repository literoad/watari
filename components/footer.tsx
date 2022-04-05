import Link from "next/link";
import s from "../styles/components/Footer.module.css";

export default function Footer() {
  return (
    <footer className={`lr-container ${s.footer}`}>
      <div className={s.left}>
        <ul className={s.list}>
          <li>
            <a href="mailto:support@literoad.ru">Поддержка</a>
          </li>
          <li>
            <Link href="/legal/public-offer">
              <a target="_blank">Оферта</a>
            </Link>
          </li>
          <li>
            <Link href="/legal/privacy-policy">
              <a target="_blank">Политика конфиденциальности</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className={`muted ${s.right}`}>
        <p>2022 ИП Пуханов В.&thinsp;С.</p>
        <p>ОГРНИП 322762700015232</p>
        <p>ИНН 760414779050</p>
      </div>
    </footer>
  );
}
