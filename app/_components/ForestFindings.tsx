"use client";

import { useState } from "react";

const athletes = [
  { code: "A5", ratio: 67.9, residual: 0.81 },
  { code: "A9", ratio: 66.9, residual: 0.62 },
  { code: "A10", ratio: 64.8, residual: 0.24 },
  { code: "A8", ratio: 64.5, residual: 0.24 },
  { code: "A11", ratio: 64.7, residual: 0.18 },
  { code: "A2", ratio: 63.3, residual: -0.08 },
  { code: "A6", ratio: 62.5, residual: 0 },
  { code: "A7", ratio: 61.3, residual: -0.29 },
  { code: "A3", ratio: 61.0, residual: -0.27 },
  { code: "A1", ratio: 60.3, residual: -0.45 },
  { code: "A4", ratio: 58.5, residual: -1.01 },
] as const;

const intervals = {
  90: { fisher: [0.48, 0.93], bootstrap: [0.54, 0.95] },
  95: { fisher: [0.39, 0.94], bootstrap: [0.45, 0.96] },
} as const;

export function ResidualChart() {
  const [active, setActive] = useState<string | null>(null);
  const selected = athletes.find((a) => a.code === active) ?? null;
  const max = 1.15;

  return (
    <figure className="chart-figure">
      <p className="chart-title">Forest speed relative to the treadmill line</p>
      <div className="residual">
        {athletes
          .slice()
          .sort((a, b) => b.residual - a.residual)
          .map((athlete) => {
            const width = (Math.abs(athlete.residual) / max) * 50;
            const positive = athlete.residual >= 0;
            return (
              <button
                key={athlete.code}
                type="button"
                aria-label={`${athlete.code}, residual ${athlete.residual.toFixed(2)} km/h`}
                className={active === athlete.code ? "is-active" : ""}
                aria-pressed={active === athlete.code}
                onClick={() =>
                  setActive((code) => (code === athlete.code ? null : athlete.code))
                }
              >
                <span className="residual-code">{athlete.code}</span>
                <span className="residual-track">
                  <span className="residual-zero" />
                  <span
                    className={`residual-bar ${positive ? "is-pos" : "is-neg"}`}
                    style={
                      positive
                        ? { left: "50%", width: `${width}%` }
                        : { right: "50%", width: `${width}%` }
                    }
                  />
                </span>
                <span className="residual-value">
                  {athlete.residual > 0 ? "+" : ""}
                  {athlete.residual.toFixed(2)}
                </span>
              </button>
            );
          })}
      </div>
      <p className="finding-note">
        {selected
          ? `${selected.code} ran ${selected.ratio.toFixed(1)}% of treadmill speed, ${formatResidual(selected.residual)} the fitted line.`
          : "Click an athlete. Bars are km/h faster or slower in the forest than the treadmill line predicts."}
      </p>
      <figcaption>
        Leftover scatter after the fit is 0.53 km/h, about ±15–17 s/km. Forest
        speed in this group is 58–68% of treadmill speed, averaging 63%.
      </figcaption>
    </figure>
  );
}

function formatResidual(value: number) {
  if (value === 0) return "on";
  const km = `${Math.abs(value).toFixed(2)} km/h`;
  return value > 0 ? `${km} above` : `${km} below`;
}

export function IntervalBand() {
  const [level, setLevel] = useState<90 | 95>(90);
  const band = intervals[level];

  return (
    <figure className="chart-figure">
      <p className="chart-title">{level}% confidence interval for R²</p>
      <div className="finding-switch" role="group" aria-label="Confidence level">
        {([90, 95] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={level === value}
            onClick={() => setLevel(value)}
          >
            {value}%
          </button>
        ))}
      </div>
      <IntervalRow label="Fisher z" low={band.fisher[0]} high={band.fisher[1]} />
      <IntervalRow
        label="Bootstrap"
        low={band.bootstrap[0]}
        high={band.bootstrap[1]}
      />
      <figcaption>
        The dot is the estimate, R² = 0.79. With only 11 athletes the range is
        wide, but it stays well above zero.
      </figcaption>
    </figure>
  );
}

function IntervalRow({
  label,
  low,
  high,
}: {
  label: string;
  low: number;
  high: number;
}) {
  return (
    <div className="ci-row">
      <span>{label}</span>
      <span className="ci-track">
        <span
          className="ci-band"
          style={{ left: `${low * 100}%`, width: `${(high - low) * 100}%` }}
        />
        <span className="ci-point" style={{ left: "79%" }} />
      </span>
      <span className="ci-range">
        {low.toFixed(2)}–{high.toFixed(2)}
      </span>
    </div>
  );
}
