import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import graphImg from "../components/images/graph.png";
import panelImg from "../components/images/panel.png";

const HowItWorks: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Как работает аудит? | Literoad</title>
        <meta
          name="description"
          content="Автоматические аудиты производительности Literoad используют инструмент Lighthouse, являющийся мировым стандартом. История измерений за последние 365 дней хранится вне зависимости от оплаты подписки."
        />
        <meta
          name="keyword"
          content="literoad, lighthouse, стандарт, pagespeed, insight, фронтенд, performance, seo, best practices"
        />
      </Head>
      <section className="lr-container">
        <h2 className="text-center">Как работает аудит</h2>
        <p>
          C помощью инструмента Lighthouse (являющегося мировым стандартом),
          ежедневно в выбранное вами время будет производиться измерение
          производительности вашей страницы, уровень ее SEO-оптимизации и
          соответствие лучшим практикам веб-разработки. Результаты анализа вы
          будете видеть в панели управления.
        </p>
        <Image src={panelImg} alt="Скриншот панели управления Literoad" />
        <p>
          Там же будет храниться история в виде графика, по которой вы сможете
          узнать результат измерений за любую дату.
        </p>
        <Image
          src={graphImg}
          alt="Скриншот графика с историей измерений Literoad"
        />
        <p>
          При этом история измерений за последние 365 дней сохраняется даже если
          подписка не продлена. Измерения можно возобновить в любой момент,
          внеся оплату за 30 дней работы сервиса.
        </p>
      </section>
    </div>
  );
};

export default HowItWorks;
