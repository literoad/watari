import { NextPage, NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import AddMonitorForm from "../../components/add-monitor-form";
import ResultsGrid, { Monitor } from "../../components/results-grid";
import { getMonitorsForCurrentUser } from "../../lib/monitors";

type Props = {
  monitors: Monitor[];
};

const Dashboard: NextPage<Props> = ({ monitors }) => {
  const { data: session } = useSession({ required: true });

  if (session) {
    return (
      <div>
        <Head>
          <title>Панель управления | Literoad</title>
        </Head>
        <section className="lr-container">
          <h2 className="text-center">Панель управления</h2>
          <ResultsGrid monitors={monitors} />
          {monitors.length < 10 ? (
            <AddMonitorForm />
          ) : (
            <div className="text-center muted">
              Возможно иметь не более 10 мониторов. Удалите один из
              существующих, чтобы создавать новые.
            </div>
          )}
        </section>
      </div>
    );
  }

  return <h2 className="text-center">Доступ запрещен</h2>;
};

export default Dashboard;

export async function getServerSideProps(context: NextPageContext) {
  const [session, monitors] = await Promise.all([
    getSession(context),
    getMonitorsForCurrentUser(context),
  ]);
  return {
    props: {
      session,
      monitors,
    },
  };
}
