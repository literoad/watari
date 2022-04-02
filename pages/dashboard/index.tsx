import { NextPage } from "next";
import Head from "next/head";

const Dashboard: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Панель управления | Literoad</title>
      </Head>
      <section className="lr-container">
        <h2 className="text-center">Панель управления</h2>
      </section>
    </div>
  );
};

// noinspection JSUnusedGlobalSymbols
export default Dashboard;
