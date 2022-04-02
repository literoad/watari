import { NextPage, NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import ResultsGrid from "../../components/results-grid";

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
          <ResultsGrid />
        </section>
      </div>
    );
  }

  return <h2 className="text-center">Доступ запрещен</h2>;
};

export default Dashboard;

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
