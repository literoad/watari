import { NextPage, NextPageContext } from "next";
import { Measurement, Monitor } from "../../components/results-grid";
import { getMonitorById } from "../../lib/monitors";

type MeasurementWithId = Measurement & { _id: string };

type Props = {
  monitor: Monitor;
  measurements: MeasurementWithId[];
};

const MonitorPage: NextPage<Props> = ({ monitor, measurements }) => {
  if (!monitor || !measurements) {
    return <h2 className="text-center">Доступ запрещён</h2>;
  }

  console.log(monitor);
  console.log(measurements);

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
  const { monitor, measurements } = await getMonitorById(
    context,
    context.query.id as string
  );
  return {
    props: {
      monitor,
      measurements,
    },
  };
}
