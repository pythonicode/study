import { IntervalBand, ResidualChart } from "@/app/_components/ForestFindings";
import hero from "@/public/images/web/forest_test_loop.jpg";
import type { Post } from "./types";

function Body() {
  return (
    <>
      <dl className="facts">
        <div>
          <dt>Paired tests</dt>
          <dd>11</dd>
        </div>
        <div>
          <dt>R²</dt>
          <dd>0.79</dd>
        </div>
        <div>
          <dt>Left unexplained</dt>
          <dd>21%</dd>
        </div>
      </dl>

      <section>
        <h2>The short version</h2>
        <p>
          Eleven athletes now have both tests, treadmill and forest, at 4
          mmol/L. Names are codes A1–A11, shuffled so they do not follow speed.
        </p>
        <p>
          Treadmill speed sets the broad level. It explains about 79% of the
          spread in forest speed, so roughly 21% is something else: terrain,
          technique, rough-ground running. That 21% is a point estimate. With
          only 11 people it could plausibly be a lot bigger or a lot smaller.
        </p>
      </section>

      <section>
        <h2>What the leftover looks like</h2>
        <p>
          Forest speeds in the group vary by 1.12 km/h (standard deviation).
          Once treadmill speed is accounted for, the leftover is 0.53 km/h.
          In the forest that is about ±15–17 s/km. Forest speed here runs
          from 58% to 68% of treadmill speed, averaging 63%.
        </p>
        <ResidualChart />
        <p>
          The residuals run from +0.81 km/h (A5) to −1.01 km/h (A4).
        </p>
      </section>

      <section>
        <h2>How sure is 0.79?</h2>
        <p>
          Two usual methods, and they agree. Fisher&apos;s z assumes the speeds
          are roughly normal. The bootstrap redraws the 11 athletes over and
          over. One person can swing a redraw, so both are shown.
        </p>
        <IntervalBand />
        <p>
          At 90% confidence, treadmill speed explains somewhere between about
          half and a bit over 90% of forest speed. If R stayed near 0.89,
          the planned sample of 25 athletes would pull the lower bound up to about
          0.6 which is much better.
        </p>
        <p>
          Some of the leftover is just noise. Each 4 mmol/L speed comes from
          five points, and a few fits were not perfect, so those values probably
          carry ±0.2–0.4 km/h of uncertainty on their own.
        </p>
      </section>
    </>
  );
}

export const forestPreliminary: Post = {
  slug: "forest-preliminary-11",
  kicker: "Preliminary",
  title: "After 11 Forest Tests, How Much Speed the Treadmill Misses",
  date: "2026-10-27",
  summary:
    "Eleven paired tests so far. Treadmill speed at 4 mmol/L explains about 79% of forest speed. The other 21% is still a wide guess. Athletes are codes A1–A11.",
  byline: ["Anthony Riley"],
  hero: {
    src: hero,
    alt: "Orienteering map with a purple dashed loop marking the forest test route.",
    caption: "The marked forest loop used for the intervals.",
  },
  Body,
};
