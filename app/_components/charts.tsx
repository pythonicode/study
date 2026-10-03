import type { ReactNode } from "react";

const WIDTH = 600;

type Axis = {
  domain: [number, number];
  ticks: number[];
  label: string;
  format?: (value: number) => string;
};

export type ChartPoint = { x: number; y: number; label?: string };

type LineChartProps = {
  title: string;
  points: ChartPoint[];
  x: Axis;
  y: Axis;
  height?: number;
  reference?: { y: number; label: string };
  marker?: { x: number; y: number; label: string };
};

export function LineChart({
  title,
  points,
  x,
  y,
  height = 320,
  reference,
  marker,
}: LineChartProps) {
  const pad = { top: 32, right: 16, bottom: 46, left: 44 };
  const plotWidth = WIDTH - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;
  const sx = (v: number) =>
    pad.left + ((v - x.domain[0]) / (x.domain[1] - x.domain[0])) * plotWidth;
  const sy = (v: number) =>
    pad.top +
    plotHeight -
    ((v - y.domain[0]) / (y.domain[1] - y.domain[0])) * plotHeight;
  const fx = x.format ?? String;
  const fy = y.format ?? String;
  const baseline = pad.top + plotHeight;
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${sx(p.x)},${sy(p.y)}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${height}`}
      className="chart"
      role="img"
      aria-label={title}
    >
      <text x={pad.left} y={14} className="chart-axis-label">
        {y.label}
      </text>
      {y.ticks.map((t) => (
        <g key={`y${t}`}>
          <line
            x1={pad.left}
            x2={WIDTH - pad.right}
            y1={sy(t)}
            y2={sy(t)}
            className="chart-grid"
          />
          <text
            x={pad.left - 10}
            y={sy(t)}
            textAnchor="end"
            dominantBaseline="middle"
          >
            {fy(t)}
          </text>
        </g>
      ))}
      {x.ticks.map((t) => (
        <text key={`x${t}`} x={sx(t)} y={baseline + 20} textAnchor="middle">
          {fx(t)}
        </text>
      ))}
      <line
        x1={pad.left}
        x2={WIDTH - pad.right}
        y1={baseline}
        y2={baseline}
        className="chart-axis"
      />
      <text
        x={WIDTH - pad.right}
        y={height - 4}
        textAnchor="end"
        className="chart-axis-label"
      >
        {x.label}
      </text>

      {reference ? (
        <g>
          <line
            x1={pad.left}
            x2={WIDTH - pad.right}
            y1={sy(reference.y)}
            y2={sy(reference.y)}
            className="chart-reference"
          />
          <text
            x={pad.left + 6}
            y={sy(reference.y) - 7}
            className="chart-reference-label"
          >
            {reference.label}
          </text>
        </g>
      ) : null}

      <path d={path} className="chart-line" />

      {marker ? (
        <g>
          <line
            x1={sx(marker.x)}
            x2={sx(marker.x)}
            y1={sy(marker.y)}
            y2={baseline}
            className="chart-reference"
          />
          <rect
            x={sx(marker.x) - 6}
            y={sy(marker.y) - 6}
            width={12}
            height={12}
            className="chart-marker"
          />
          <text
            x={sx(marker.x) - 12}
            y={sy(marker.y) + 4}
            textAnchor="end"
            className="chart-marker-label"
          >
            {marker.label}
          </text>
        </g>
      ) : null}

      {points.map((p, i) => (
        <g key={i}>
          <circle cx={sx(p.x)} cy={sy(p.y)} r={4.5} className="chart-point" />
          {p.label ? (
            <text
              x={sx(p.x)}
              y={sy(p.y) - 12}
              textAnchor="middle"
              className="chart-point-label"
            >
              {p.label}
            </text>
          ) : null}
        </g>
      ))}
    </svg>
  );
}

export type SectionRep = {
  label: string;
  sections: ("short" | "long")[];
  value: string;
};

type SectionBarsProps = {
  title: string;
  reps: SectionRep[];
  lengths: { short: number; long: number };
  valueLabel: string;
};

export function SectionBars({
  title,
  reps,
  lengths,
  valueLabel,
}: SectionBarsProps) {
  const rowHeight = 40;
  const top = 30;
  const barLeft = 52;
  const barRight = 470;
  const gap = 3;
  const maxDistance = Math.max(
    ...reps.map((rep) =>
      rep.sections.reduce((sum, s) => sum + lengths[s], 0),
    ),
  );
  const scale = (barRight - barLeft - gap * 3) / maxDistance;
  const height = top + reps.length * rowHeight + 4;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${height}`}
      className="chart"
      role="img"
      aria-label={title}
    >
      <text x={0} y={14} className="chart-axis-label">
        Rep
      </text>
      <text x={barLeft} y={14} className="chart-axis-label">
        Sections run
      </text>
      <text x={WIDTH} y={14} textAnchor="end" className="chart-axis-label">
        {valueLabel}
      </text>
      {reps.map((rep, row) => {
        const y = top + row * rowHeight;
        let cursor = barLeft;
        const segments: ReactNode[] = rep.sections.map((section, i) => {
          const w = lengths[section] * scale;
          const x = cursor;
          cursor += w + gap;
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={w}
                height={rowHeight - 12}
                className={`chart-section chart-section-${section}`}
              />
              <text
                x={x + 8}
                y={y + (rowHeight - 12) / 2}
                dominantBaseline="middle"
                className={`chart-section-label chart-section-label-${section}`}
              >
                {lengths[section]} m
              </text>
            </g>
          );
        });
        return (
          <g key={rep.label}>
            <text
              x={0}
              y={y + (rowHeight - 12) / 2}
              dominantBaseline="middle"
              className="chart-row-label"
            >
              {rep.label}
            </text>
            {segments}
            <text
              x={WIDTH}
              y={y + (rowHeight - 12) / 2}
              textAnchor="end"
              dominantBaseline="middle"
              className="chart-row-value"
            >
              {rep.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

type ChartFigureProps = {
  title: string;
  caption?: ReactNode;
  legend?: { label: string; swatch: "ink" | "light" | "accent" }[];
  children: ReactNode;
};

export function ChartFigure({
  title,
  caption,
  legend,
  children,
}: ChartFigureProps) {
  return (
    <figure className="chart-figure">
      <p className="chart-title">{title}</p>
      {children}
      {legend ? (
        <ul className="chart-legend">
          {legend.map((item) => (
            <li key={item.label}>
              <span className={`swatch swatch-${item.swatch}`} />
              {item.label}
            </li>
          ))}
        </ul>
      ) : null}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
