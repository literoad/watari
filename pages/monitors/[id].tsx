import { NextPage, NextPageContext } from "next";
import { Monitor } from "../../components/results-grid";
import { getMonitorById } from "../../lib/monitors";

type Props = {
  monitor: Monitor;
};

const MonitorPage: NextPage<Props> = ({ monitor }) => {
  if (!monitor) {
    return <h2 className="text-center">Доступ запрещён</h2>;
  }

  return (
    <div>
      <section className="lr-container text-center">
        <h2>Монитор {monitor.url}</h2>
      </section>
    </div>
  );
};

export default MonitorPage;

export async function getServerSideProps(context: NextPageContext) {
  const monitor = await getMonitorById(context, context.query.id as string);
  return {
    props: {
      monitor,
    },
  };
}
