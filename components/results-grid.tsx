import s from "../styles/components/ResultsGrid.module.css";
import Gauge from "./gauge";

export default function ResultsGrid() {
  const results = [
    {
      url: "https://journal.tinkoff.ru",
      hourZone: 2,
      lastResult: {
        performance: 95,
        bestPractices: 62,
        seo: 39,
      },
    },
    {
      url: "https://literoad.ru",
      hourZone: 5,
      lastResult: {
        performance: 27,
        bestPractices: 95,
        seo: 65,
      },
    },
  ];
  return (
    <div className={s.grid}>
      <div className={s.header}>
        <div>URL-страницы</div>
        <div>Окно</div>
        <div>Результаты последнего измерения</div>
        <div>Действия</div>
      </div>
      {results.map((r, idx) => (
        <Row {...r} key={r.url} index={idx} />
      ))}
    </div>
  );
}

type RowProps = {
  url: string;
  hourZone: number;
  lastResult: {
    performance: number;
    bestPractices: number;
    seo: number;
  };
  index: number;
};

function Row(props: RowProps) {
  const hourStr = String(props.hourZone).padStart(2, "0");
  return (
    <div className={`${s.row} ${props.index % 2 === 1 ? s.oddRow : ""}`}>
      <div>{props.url}</div>
      <div>
        {hourStr}:00 &mdash; {hourStr}:59
      </div>
      <div className={s.resultsCell}>
        <Gauge
          value={props.lastResult.performance}
          size={64}
          color={getColor(props.lastResult.performance)}
        />
        <Gauge
          value={props.lastResult.bestPractices}
          size={64}
          color={getColor(props.lastResult.bestPractices)}
        />
        <Gauge
          value={props.lastResult.seo}
          size={64}
          color={getColor(props.lastResult.seo)}
        />
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
