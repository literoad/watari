import { NextPage } from "next";
import Head from "next/head";

const EmailSent: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Письмо отправлено | Literoad</title>
      </Head>
      <section className="lr-container text-center">
        <h2>Письмо отправлено</h2>
        <p>Ссылка для входа отправлена на вашу электронную почту.</p>
        <p>Перейдите по ней чтобы войти в панель управления.</p>
      </section>
    </div>
  );
};

export default EmailSent;
