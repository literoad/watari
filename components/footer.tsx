import s from "../styles/components/Footer.module.css";

export default function Footer() {
  return (
    <footer className={`lr-container ${s.footer}`}>
      <p>2022 ИП Пуханов В.&thinsp;С.</p>
      <p>ОГРНИП 322762700015232</p>
      <p>ИНН 760414779050</p>
    </footer>
  );
}
