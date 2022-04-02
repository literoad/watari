import type { NextPage } from "next";
import Head from "next/head";
import BigButton from "../components/big-button";
import s from "../styles/pages/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Literoad | Мониторинг производительности сайтов</title>
      </Head>
      <section className={`lr-container ${s.preamble}`}>
        <h2>Мониторинг производительности сайтов</h2>
        <ul className={s.checklist}>
          <li>Ежедневные измерения</li>
          <li>Уведомления в Telegram</li>
          <li>Полная история изменений</li>
        </ul>
        <div>
          <BigButton href="/sign-up">Попробовать бесплатно</BigButton>
          <footer className={`muted ${s.footnote}`}>
            7 дней, без указания карты
          </footer>
        </div>
      </section>
    </div>
  );
};

// noinspection JSUnusedGlobalSymbols
export default Home;
