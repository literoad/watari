import { NextPage, NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";

const Dashboard: NextPage = () => {
  const { data: session } = useSession({ required: true });

  if (session) {
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
  }

  return <h2 className="text-center">Доступ запрещен</h2>;
};

// noinspection JSUnusedGlobalSymbols
export default Dashboard;

// noinspection JSUnusedGlobalSymbols
export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
