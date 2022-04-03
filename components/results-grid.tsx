import s from "../styles/components/ResultsGrid.module.css";
import ResultGauge from "./result-gauge";

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
    performance: number | null;
    bestPractices: number | null;
    seo: number | null;
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
            <ResultGauge value={lastResult.performance} title="Performance" />
            <ResultGauge
              value={lastResult.bestPractices}
              title="Best Practices"
            />
            <ResultGauge value={lastResult.seo} title="SEO" />
          </>
        ) : (
          <p className="muted">Первое измерение произойдет по расписанию</p>
        )}
      </div>
      <div>Действия</div>
    </div>
  );
}
