import s from "../styles/components/ResultsGrid.module.css";
import Gauge from "./gauge";

type Props = {
  monitors: Monitor[];
};

export default function ResultsGrid({ monitors }: Props) {
  return (
    <div className={s.grid}>
      <div className={s.header}>
        <div>URL-страницы</div>
        <div>Окно</div>
        <div>Результаты последнего измерения</div>
        <div>Действия</div>
      </div>
      {monitors.map((m, idx) => (
        <Row monitor={m} key={m._id} index={idx} />
      ))}
    </div>
  );
}

export type Monitor = {
  _id: string;
  url: string;
  hourZone: number;
  lastResult?: {
    performance: number;
    bestPractices: number;
    seo: number;
  };
};

type RowProps = {
  monitor: Monitor;
  index: number;
};

function Row({ monitor, index }: RowProps) {
  const { lastResult } = monitor;
  const hourStr = String(monitor.hourZone).padStart(2, "0");
  return (
    <div className={`${s.row} ${index % 2 === 1 ? s.oddRow : ""}`}>
      <div>{monitor.url}</div>
      <div>
        {hourStr}:00 &mdash; {hourStr}:59
      </div>
      <div className={s.resultsCell}>
        {lastResult ? (
          <>
            <Gauge
              value={lastResult.performance}
              size={64}
              color={getColor(lastResult.performance)}
            />
            <Gauge
              value={lastResult.bestPractices}
              size={64}
              color={getColor(lastResult.bestPractices)}
            />
            <Gauge
              value={lastResult.seo}
              size={64}
              color={getColor(lastResult.seo)}
            />
          </>
        ) : (
          <p className="muted">Первое измерение произойдет по расписанию</p>
        )}
      </div>
      <div>Действия</div>
    </div>
  );
}

const colors = {
  low: "#f63436",
  medium: "#f6a535",
  high: "#09c664",
};

function getColor(percentage: number) {
  if (percentage <= 49) {
    return colors.low;
  }
  if (percentage <= 89) {
    return colors.medium;
  }
  return colors.high;
}
