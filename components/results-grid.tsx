import s from "../styles/components/ResultsGrid.module.css";
import ResultGauge from "./result-gauge";

type Props = {
  monitors: Monitor[];
};

export default function ResultsGrid({ monitors }: Props) {
  return (
    <div className={s.grid}>
      <div className={s.header}>
        <div style={{ gridRow: "1 / span 2" }}>URL страницы</div>
        <div style={{ gridRow: "1 / span 2" }}>Окно</div>
        <div
          className={s.tophat}
          style={{ gridRow: "1", gridColumn: "span 3" }}
        >
          Результаты последнего измерения
        </div>
        <div style={{ gridRow: "1 / span 2" }}>Действия</div>
        <div className="muted" style={{ gridRow: "2" }}>
          Performance
        </div>
        <div className="muted" style={{ gridRow: "2" }}>
          Best Practices
        </div>
        <div className="muted" style={{ gridRow: "2" }}>
          SEO
        </div>
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
      {lastResult ? (
        <>
          <div>
            <ResultGauge value={lastResult.performance} title="Performance" />
          </div>
          <div>
            <ResultGauge
              value={lastResult.bestPractices}
              title="Best Practices"
            />
          </div>
          <div>
            <ResultGauge value={lastResult.seo} title="SEO" />
          </div>
        </>
      ) : (
        <div className="muted" style={{ gridColumn: "span 3" }}>
          Первое измерение произойдет по расписанию
        </div>
      )}
      <div>Действия</div>
    </div>
  );
}
