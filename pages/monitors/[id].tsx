import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Measurement, Monitor } from "../../components/results-grid";
import { getMonitorById } from "../../lib/monitors";
import s from "../../styles/pages/Monitor.module.css";

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
      <Head>
        <title>Монитор {monitor.url} | Literoad</title>
      </Head>
      <section className="lr-container text-center">
        <h2>Монитор {monitor.url}</h2>
        <div className={s.chart}>
          <LineChart
            width={800}
            height={600}
            data={measurements}
            margin={{ left: 30, right: 40, top: 30, bottom: 30 }}
          >
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="_id" />
            <YAxis domain={[0, 100]} />
            <Line
              name="Performance"
              dataKey="performance"
              stroke="#eb512b"
              strokeWidth={2}
            />
            <Line
              name="Best Practices"
              dataKey="bestPractices"
              stroke="#bdc921"
              strokeWidth={2}
            />
            <Line name="SEO" dataKey="seo" stroke="#91c4e3" strokeWidth={2} />
            <Tooltip contentStyle={{ backgroundColor: "#444" }} />
            <Legend />
          </LineChart>
        </div>
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
