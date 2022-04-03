import Gauge from "./gauge";

type Props = {
  value: number | null;
  title: string;
};

export default function ResultGauge({ value, title }: Props) {
  return (
    <Gauge
      value={value ? Math.round(value * 100) : "?"}
      size={64}
      color={value ? getColor(value) : colors.low}
      title={title}
    />
  );
}

const colors = {
  low: "#f63436",
  medium: "#f6a535",
  high: "#09c664",
};

function getColor(percentage: number) {
  if (percentage <= 0.49) {
    return colors.low;
  }
  if (percentage <= 0.89) {
    return colors.medium;
  }
  return colors.high;
}
