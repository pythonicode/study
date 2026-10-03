import { ChartFigure, LineChart, SectionBars } from "@/app/_components/charts";
import { Figure } from "@/app/_components/Figure";
import forestLoop from "@/public/images/web/forest_test_loop.jpg";
import hero from "@/public/images/web/treadmill_ifk_gym.jpg";
import type { Post } from "./types";

const treadmill = [
  { displayed: 13, adjusted: 13.23, lactate: 0.8, hr: 147, rpe: 9 },
  { displayed: 15, adjusted: 15.1, lactate: 1.3, hr: 157, rpe: 13 },
  { displayed: 16.5, adjusted: 16.46, lactate: 1.4, hr: 173, rpe: 16 },
  { displayed: 17.5, adjusted: 17.34, lactate: 2.7, hr: 178, rpe: 18 },
  { displayed: 18.5, adjusted: 18.21, lactate: 5.6, hr: 187, rpe: 19 },
];

const SHORT = 240;
const LONG = 445;

type ForestRep = {
  sections: ("short" | "long")[];
  time: string;
  adjustedTime: string;
  distance: number;
  gps: number;
  adjustedGps: number;
  pace: string;
  adjustedPace: string;
  lactate: number;
  rpe: number;
  hr: number;
};

const forest: ForestRep[] = [
  {
    sections: ["short", "short", "long"],
    time: "5:35",
    adjustedTime: "4:15",
    distance: 925,
    gps: 943,
    adjustedGps: 702,
    pace: "6:02",
    adjustedPace: "6:12",
    lactate: 0.8,
    rpe: 12,
    hr: 137,
  },
  {
    sections: ["short", "short", "long"],
    time: "5:12",
    adjustedTime: "3:45",
    distance: 925,
    gps: 958,
    adjustedGps: 712,
    pace: "5:37",
    adjustedPace: "5:28",
    lactate: 1.3,
    rpe: 15,
    hr: 152,
  },
  {
    sections: ["short", "short", "long"],
    time: "4:25",
    adjustedTime: "3:21",
    distance: 925,
    gps: 948,
    adjustedGps: 704,
    pace: "4:46",
    adjustedPace: "4:53",
    lactate: 3.3,
    rpe: 16.5,
    hr: 166,
  },
  {
    sections: ["short", "long", "long"],
    time: "5:42",
    adjustedTime: "3:24",
    distance: 1130,
    gps: 1169,
    adjustedGps: 708,
    pace: "5:02",
    adjustedPace: "4:57",
    lactate: 4.1,
    rpe: 18,
    hr: 171,
  },
  {
    sections: ["short", "long", "long"],
    time: "5:20",
    adjustedTime: "3:14",
    distance: 1130,
    gps: 1157,
    adjustedGps: 702,
    pace: "4:43",
    adjustedPace: "4:43",
    lactate: 7.1,
    rpe: 19.5,
    hr: 174,
  },
];

function paceToSpeed(pace: string): number {
  const [minutes = 0, seconds = 0] = pace.split(":").map(Number);
  return 60 / (minutes + seconds / 60);
}

/** Linear interpolation of speed at the first crossing of a lactate value. */
function speedAtLactate(
  points: { speed: number; lactate: number }[],
  target: number,
): number | undefined {
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]!;
    const b = points[i]!;
    if (a.lactate < target && b.lactate >= target) {
      return (
        a.speed +
        ((target - a.lactate) / (b.lactate - a.lactate)) * (b.speed - a.speed)
      );
    }
  }
  return undefined;
}

const treadmillLt2 = speedAtLactate(
  treadmill.map((s) => ({ speed: s.adjusted, lactate: s.lactate })),
  4,
);

const speedAxis = {
  domain: [12.5, 19] as [number, number],
  ticks: [13, 14, 15, 16, 17, 18, 19],
  label: "Speed (km/h, adjusted)",
};

function TreadmillCharts() {
  return (
    <>
      <ChartFigure
        title="Athlete A — Treadmill lactate curve"
        caption="Blood lactate at the end of each 5-minute stage, plotted against calibrated treadmill speed. The square marks the speed at 4 mmol/L, linearly interpolated between the last two stages."
      >
        <LineChart
          title="Line chart of blood lactate rising from 0.8 to 5.6 mmol/L as treadmill speed increases from 13.2 to 18.2 km/h, crossing 4 mmol/L at about 17.7 km/h."
          points={treadmill.map((s) => ({
            x: s.adjusted,
            y: s.lactate,
            label: s.lactate.toFixed(1),
          }))}
          x={speedAxis}
          y={{
            domain: [0, 6.5],
            ticks: [0, 2, 4, 6],
            label: "Lactate (mmol/L)",
          }}
          reference={{ y: 4, label: "4 mmol/L" }}
          marker={
            treadmillLt2
              ? {
                  x: treadmillLt2,
                  y: 4,
                  label: `≈ ${treadmillLt2.toFixed(1)} km/h`,
                }
              : undefined
          }
        />
      </ChartFigure>

      <div className="chart-pair">
        <ChartFigure title="Heart rate">
          <LineChart
            title="Heart rate rising from 147 to 187 BPM across the five treadmill stages."
            height={240}
            points={treadmill.map((s) => ({
              x: s.adjusted,
              y: s.hr,
              label: String(s.hr),
            }))}
            x={{ ...speedAxis, ticks: [13, 15, 17, 19], label: "km/h" }}
            y={{ domain: [140, 195], ticks: [140, 160, 180], label: "BPM" }}
          />
        </ChartFigure>
        <ChartFigure title="Perceived exertion">
          <LineChart
            title="RPE rising from 9 to 19 on the Borg scale across the five treadmill stages."
            height={240}
            points={treadmill.map((s) => ({
              x: s.adjusted,
              y: s.rpe,
              label: String(s.rpe),
            }))}
            x={{ ...speedAxis, ticks: [13, 15, 17, 19], label: "km/h" }}
            y={{ domain: [6, 21], ticks: [6, 10, 14, 18], label: "Borg 6–20" }}
          />
        </ChartFigure>
      </div>

      <details className="data-details">
        <summary>Show treadmill data</summary>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Stage</th>
                <th className="num">Displayed (km/h)</th>
                <th className="num">Adjusted (km/h)</th>
                <th className="num">Lactate (mmol/L)</th>
                <th className="num">HR (BPM)</th>
                <th className="num">RPE</th>
              </tr>
            </thead>
            <tbody>
              {treadmill.map((s, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td className="num">{s.displayed.toFixed(1)}</td>
                  <td className="num">{s.adjusted.toFixed(2)}</td>
                  <td className="num">{s.lactate.toFixed(1)}</td>
                  <td className="num">{s.hr}</td>
                  <td className="num">{s.rpe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="table-note">
          Lactate, heart rate, and RPE recorded at the end of each stage.
          Adjusted speed is the displayed speed corrected using the treadmill
          calibration.
        </p>
      </details>
    </>
  );
}

function ForestCharts() {
  return (
    <>
      <ChartFigure
        title="Athlete B — What each forest rep was made of"
        legend={[
          { label: `Short section (${SHORT} m)`, swatch: "light" },
          { label: `Long section (${LONG} m)`, swatch: "ink" },
        ]}
        caption="Sections run in each rep (not in running order). Times show the raw rep time, then the time adjusted to a single loop."
      >
        <SectionBars
          title="Bar chart of loop sections per rep: reps 1 to 3 were two short sections and one long section (925 m); reps 4 and 5 were one short and two long sections (1130 m)."
          reps={forest.map((rep, i) => ({
            label: `R${i + 1}`,
            sections: rep.sections,
            value: `${rep.time} → ${rep.adjustedTime}`,
          }))}
          lengths={{ short: SHORT, long: LONG }}
          valueLabel="Time → adjusted"
        />
      </ChartFigure>

      <ChartFigure
        title="Athlete B — Forest lactate by rep"
        caption="Blood lactate after each rep, plotted against speed from the adjusted single-loop pace and connected in rep order."
      >
        <LineChart
          title="Line chart of forest lactate against speed. Lactate rises with each rep, but rep 4 was slightly slower than rep 3 despite higher lactate."
          points={forest.map((rep, i) => ({
            x: paceToSpeed(rep.adjustedPace),
            y: rep.lactate,
            label: `R${i + 1} · ${rep.lactate.toFixed(1)}`,
          }))}
          x={{
            domain: [9, 13.5],
            ticks: [9, 10, 11, 12, 13],
            label: "Speed (km/h, from adjusted pace)",
          }}
          y={{
            domain: [0, 8],
            ticks: [0, 2, 4, 6, 8],
            label: "Lactate (mmol/L)",
          }}
          reference={{ y: 4, label: "4 mmol/L" }}
        />
      </ChartFigure>

      <details className="data-details">
        <summary>Show forest data</summary>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Rep</th>
                <th className="num">Short / Long</th>
                <th className="num">Time</th>
                <th className="num">Adj. time</th>
                <th className="num">Distance (m)</th>
                <th className="num">GPS (m)</th>
                <th className="num">Adj. GPS (m)</th>
                <th className="num">Pace</th>
                <th className="num">Adj. pace</th>
                <th className="num">Lactate</th>
                <th className="num">RPE</th>
                <th className="num">HR</th>
              </tr>
            </thead>
            <tbody>
              {forest.map((rep, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td className="num">
                    {rep.sections.filter((s) => s === "short").length} /{" "}
                    {rep.sections.filter((s) => s === "long").length}
                  </td>
                  <td className="num">{rep.time}</td>
                  <td className="num">{rep.adjustedTime}</td>
                  <td className="num">{rep.distance.toLocaleString("en-GB")}</td>
                  <td className="num">{rep.gps.toLocaleString("en-GB")}</td>
                  <td className="num">{rep.adjustedGps}</td>
                  <td className="num">{rep.pace}</td>
                  <td className="num">{rep.adjustedPace}</td>
                  <td className="num">{rep.lactate.toFixed(1)}</td>
                  <td className="num">{rep.rpe}</td>
                  <td className="num">{rep.hr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="table-note">
          Loop distance is 685 m (short section 240 m, long section 445 m).
          For reps longer than one full loop, the time is adjusted down to a
          single loop by averaging the times of the duplicated section, and
          the GPS distances of the short and long sections are averaged then
          added together. Adjusted pace is the adjusted time divided by the
          loop distance. Pace in min/km; lactate in mmol/L; RPE on the Borg
          6–20 scale; HR in BPM.
        </p>
      </details>
    </>
  );
}

function Body() {
  return (
    <>
      <p className="lede">
        It&apos;s October, and so far 15 tests have been completed successfully.
      </p>

      <dl className="facts">
        <div>
          <dt>Treadmill tests</dt>
          <dd>14</dd>
        </div>
        <div>
          <dt>Forest tests</dt>
          <dd>1</dd>
        </div>
        <div>
          <dt>Retests needed</dt>
          <dd>0</dd>
        </div>
      </dl>

      <section>
        <h2>Summary</h2>
        <p>
          Fourteen treadmill tests (C1) are complete, and the first forest test
          (C2) went well. So far no session has needed to be retested or
          redone, and the measurements have been of good quality across the
          board and have gone as planned.
        </p>
      </section>

      <section>
        <h2>A First Look at the Treadmill Data</h2>
        <p>
          To give a sense of what each test produces, below is one anonymised
          treadmill test. Lactate stays low and fairly flat through the first
          three stages, then rises sharply over the last two — the classic
          shape the study relies on to locate the threshold. A simple linear
          interpolation between the last two stages puts this athlete&apos;s
          speed at 4 mmol/L at roughly{" "}
          {treadmillLt2 ? treadmillLt2.toFixed(1) : "–"} km/h. The final
          analysis will use the polynomial curve fit described in the
          proposal, so this number is illustrative only.
        </p>
        <p>
          The speeds shown are the adjusted values from the treadmill
          calibration described in the previous update. In this test they
          differ from the displayed speed by up to 0.3 km/h, which is exactly
          the kind of gap that would otherwise blur comparisons between the
          two treadmills.
        </p>
        <TreadmillCharts />
      </section>

      <section>
        <h2>Challenges from the Forest Test</h2>
        <Figure
          src={forestLoop}
          alt="Orienteering map with a purple dashed loop marking the forest test route, starting and finishing at the bottom."
          caption="The marked forest loop used for the C2 intervals."
        />
        <p>
          The forest condition has proven to be the harder of the two to
          standardise. On a treadmill, interval duration is fixed and speed is
          the variable. In the forest the loop itself is fixed, so the time
          each runner takes to complete it varies widely with ability. To keep
          intervals close to the intended ~5 minutes, I have to estimate, for
          each athlete, how much running distance they would cover in roughly
          that time.
        </p>
        <p>
          In practice, this means running different versions of the loop in
          the first interval (the slowest) and in the last interval, so that
          interval times stay roughly equivalent. The first forest test shows
          what this looks like. Reps 1–3 were made up of two short sections and
          one long section, while reps 4–5 swapped one short section for a
          second long one. To compare the reps on equal terms, each is
          adjusted down to a single loop.
        </p>
        <ForestCharts />
        <p>
          That solves the timing problem but introduces another one. Because
          the loop is not uniform, some runners end up spending proportionally
          more of an interval in the tougher sections of the terrain than
          others. In this test, rep 4 — the first rep with the extra long
          section — was slightly slower than rep 3 on adjusted pace (4:57 vs
          4:53 min/km), yet lactate, heart rate, and RPE all rose. From one
          test it is impossible to say how much of that is the change in
          terrain and how much is simply fatigue building across reps, and
          that ambiguity is a potential source of bias, since terrain cost is
          exactly what the secondary research question sets out to measure.
        </p>
        <p>There are two options I am currently weighing:</p>
        <ul>
          <li>
            <strong>Fixed loop sets.</strong> Use a fixed set of loop versions
            for men and a slightly shorter fixed set for women, so that every
            athlete within a group covers the same terrain.
          </li>
          <li>
            <strong>Adjust in analysis.</strong> Keep tailoring the loop to the
            athlete and account for the differences in terrain afterwards, when
            comparing C1 and C2.
          </li>
        </ul>
      </section>

      <section>
        <h2>Thank You</h2>
        <p>
          I am grateful for how many people have stepped up for
          these tests am thankful to every participant who
          has been a part of the study so far. Keep an eye out for the next update!
        </p>
      </section>
    </>
  );
}

export const progressUpdate: Post = {
  slug: "progress-update-15-tests",
  kicker: "Update",
  title: "Progress Update After 15+ Successful Tests",
  date: "2026-10-03",
  summary:
    "Fourteen treadmill tests and the first forest test are complete, with no retests needed. Plus the open question of how to standardise the forest loop.",
  byline: ["Anthony Riley"],
  hero: {
    src: hero,
    alt: "A participant running on a treadmill in a club gym, seen from behind, with weight plates and a laptop nearby.",
    caption: "A treadmill test at the IFK orienteering club gym.",
  },
  Body,
};
