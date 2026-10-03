import hero from "@/public/images/web/treadmill_chp.jpg";
import type { Post } from "./types";

function Body() {
  return (
    <>
      <dl className="facts">
        <div>
          <dt>Study period</dt>
          <dd>1 September – 31 December 2026</dd>
        </div>
        <div>
          <dt>Conditions</dt>
          <dd>Treadmill, Forest</dd>
        </div>
        <div>
          <dt>Target sample</dt>
          <dd>N ≥ 20</dd>
        </div>
      </dl>

      <section>
        <h2>Background &amp; Motivation</h2>
        <p>
          In the history of sport, many methods have been used to predict
          performance based on physiological signals. In running, recent studies
          have shown that speed at the anaerobic lactate threshold (vLT2) is
          highly correlated with running race performance in track and road
          running events (Ji et al., 2021). However, in orienteering the picture
          is not so clear, with limited study on how well treadmill vLT2
          transfers over to the demands of uneven surfaces of trail and
          off-trail running. This study aims to understand the significance of
          vLT2&apos;s effect on orienteering performance and begin to identify
          how strong of a relationship actually exists between treadmill and
          forest running.
        </p>
      </section>

      <section>
        <h2>Research Question</h2>
        <p>
          <strong>Primary:</strong> How strongly does vLT2 (treadmill lactate
          threshold) correlate with vLT2 measured under forest, off-trail
          conditions in trained orienteers?
        </p>
        <p>
          <strong>Secondary question:</strong>
        </p>
        <ul>
          <li>
            To what extent does terrain cost account for the difference between
            C1 and C2?
          </li>
        </ul>
        <p className="note">
          Note: An earlier version of this design included a third condition
          (orienteering intervals with navigation) to isolate
          cognitive/navigation load as a separate factor from terrain. That
          condition was dropped because navigation-based intervals are
          difficult to standardize across athletes and repeats — route choice,
          mistakes, and variable leg lengths make it hard to control for
          intensity and comparability. The cognitive-load question is left for
          a follow-up study built on these results.
        </p>
      </section>

      <section>
        <h2>Study Design</h2>
        <p>
          Two within-subject conditions, same participants across both
          sessions. Sessions spaced 2–3 weeks apart, order counterbalanced
          across participants where possible.
        </p>
        <div className="conditions">
          <div>
            <span className="conditions-label">C1</span>
            <span className="conditions-name">Treadmill</span>
            <span className="conditions-detail">Lab, controlled speed</span>
          </div>
          <div>
            <span className="conditions-label">C2</span>
            <span className="conditions-name">Forest (Marked)</span>
            <span className="conditions-detail">Terrain, no navigation</span>
          </div>
        </div>
        <p>
          <strong>C1 — Treadmill.</strong> Participants will complete a staged
          treadmill protocol consisting of a 10-minute easy warm-up followed
          by 5 intervals of 5 minutes at increasing intensity with 2 minutes
          rest between intervals. Based on the athlete&apos;s estimated lactate
          profile from previous testing, training, or races, the treadmill
          speed will be calibrated to try to measure the athlete&apos;s blood
          lactate at ~1.5–2.0 mmol, ~2.0–2.5 mmol, ~2.5–3.5 mmol, ~3.5–5.0
          mmol, and ~5.0+ mmol, with some flexibility available for adjusting
          speeds based on the initial few readings.
        </p>
        <p>
          <strong>C2 — Forest (Marked Route).</strong> Participants will
          complete a similar protocol to above involving a 10 minute warm-up
          then 5 intervals on a marked forest route which will take roughly
          4–6 minutes with 2 minutes of rest between intervals. This route
          will be completed 5 times at increasing intensity, aiming for a
          similar lactate profile to the treadmill test of ~1.5–2.0 mmol,
          ~2.0–2.5 mmol, ~2.5–3.5 mmol, ~3.5–5.0 mmol, and ~5.0+ mmol.
        </p>
      </section>

      <section>
        <h2>Participants</h2>
        <h3>Inclusion criteria</h3>
        <ul>
          <li>Active orienteer with club membership</li>
          <li>
            Lactate threshold pace ≥16 km/h (men) or ≥14 km/h (women),
            verified in C1
          </li>
          <li>Currently healthy and training normally</li>
        </ul>
        <h3>Exclusion criteria</h3>
        <ul>
          <li>
            High intensity training or racing within 48 hours of any test
            session
          </li>
          <li>
            Cardiovascular or metabolic condition affecting lactate response
          </li>
          <li>Unable to complete both sessions within the study period</li>
        </ul>
        <h3>Target sample</h3>
        <p>
          N ≥ 10 men, N ≥ 10 women. Recruitment via Gothenburg-area
          orienteering clubs.
        </p>
      </section>

      <section>
        <h2>Measurements &amp; Variables</h2>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Variable</th>
                <th>Instrument</th>
                <th>Timing</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Blood lactate</td>
                <td>Nova Biomedical Lactate Plus Meter</td>
                <td>End of each interval</td>
              </tr>
              <tr>
                <td>Heart rate</td>
                <td>Garmin HRM Pro-Plus Chest Strap</td>
                <td>Continuous</td>
              </tr>
              <tr>
                <td>Speed / pace</td>
                <td>Treadmill / Garmin Forerunner 165</td>
                <td>Per interval</td>
              </tr>
              <tr>
                <td>RPE</td>
                <td>Borg 6–20</td>
                <td>End of each interval</td>
              </tr>
              <tr>
                <td>GPS Track</td>
                <td>Garmin Forerunner 165</td>
                <td>Post-hoc</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Cost Analysis</h2>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Item</th>
                <th className="num">Unit</th>
                <th className="num">Unit Cost</th>
                <th className="num">Quantity</th>
                <th className="num">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lactate test strips</td>
                <td className="num">25-strip box</td>
                <td className="num">€60</td>
                <td className="num">12</td>
                <td className="num">€720</td>
              </tr>
              <tr>
                <td>Lancets</td>
                <td className="num">100-pack</td>
                <td className="num">€20</td>
                <td className="num">3</td>
                <td className="num">€60</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td className="num"></td>
                <td className="num"></td>
                <td className="num"></td>
                <td className="num">€780</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p>
          Consumable costs are based on N = 25 participants completing five
          intervals across two conditions (10 measurements per participant
          with 2 extra for buffer, 300 total). Prices are estimated from the
          expected provider{" "}
          <a href="https://www.lactateplus.de/">https://www.lactateplus.de/</a>
          . Equipment (lactate meter, GPS watches, heart rate monitors, etc.)
          is provided by investigators and not included here.
        </p>
      </section>

      <section>
        <h2>Analysis</h2>
        <ul>
          <li>
            Lactate curves fitted per athlete per condition (3rd or 4th order
            polynomial)
          </li>
          <li>
            LT2 speed derived per athlete per condition (speed at 4 mmol/L)
          </li>
          <li>
            <strong>Spearman rank correlation</strong> between LT2 speeds
            across C1 and C2
          </li>
          <li>
            <strong>ICC</strong> for lactate agreement at matched intensities
            across C1 and C2
          </li>
          <li>
            <strong>Bland–Altman plots</strong> for C1 vs C2 agreement
          </li>
          <li>
            Effect sizes (r, ICC with 95% CI) reported as primary outcomes
            given N=20
          </li>
        </ul>
      </section>

      <section>
        <h2>Timeline</h2>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Phase</th>
                <th>Period</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Recruitment &amp; ethics approval</td>
                <td>June – August 2026</td>
              </tr>
              <tr>
                <td>Data collection (C1)</td>
                <td>September 2026</td>
              </tr>
              <tr>
                <td>Data collection (C2)</td>
                <td>September – October 2026</td>
              </tr>
              <tr>
                <td>Analysis &amp; write-up</td>
                <td>October – November 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Ethical Considerations</h2>
        <ul>
          <li>
            Informed consent obtained from all participants prior to first
            session
          </li>
          <li>
            Participants may withdraw at any time without consequence
          </li>
          <li>
            Data stored anonymously; participants identified by code only
          </li>
          <li>
            Lactate sampling is minimally invasive (fingertip pinprick);
            proper safety protocols with lancets and sterilization
          </li>
        </ul>
      </section>

      <section>
        <h2>Limitations</h2>
        <ul>
          <li>
            Self-supported design limits protocol control compared to a fully
            funded and supervised lab study
          </li>
          <li>
            Sample and sessions restricted to Gothenburg area; findings may
            not generalise broadly
          </li>
          <li>
            Pacing in C2 is athlete-controlled, introducing variability
            between stages and potential difficulty in hitting intensity
            targets on uneven terrain
          </li>
          <li>
            N ≥ 10 per sex provides limited statistical power; study is framed
            as a pilot
          </li>
          <li>
            Dropping the navigation condition (C3) means the study cannot
            speak to the cognitive-load component of orienteering performance
            — only to terrain cost. This is a deliberate scope reduction, not
            an oversight
          </li>
        </ul>
      </section>

      <section>
        <h2>References</h2>
        <p className="reference">
          Ji, S., Sommer, A., Bloch, W., &amp; Wahl, P. (2021). Comparison
          and performance validation of calculated and established anaerobic
          lactate thresholds in running.{" "}
          <em>Medicina, 57</em>(10), 1117.{" "}
          <a href="https://doi.org/10.3390/medicina57101117">
            https://doi.org/10.3390/medicina57101117
          </a>
        </p>
      </section>
    </>
  );
}

export const studyProposal: Post = {
  slug: "study-proposal",
  kicker: "Study Proposal",
  title:
    "Running Economy Beyond the Treadmill: A Two-Condition Lactate Study in Orienteers",
  date: "2026-08-10",
  summary:
    "How strongly does treadmill lactate threshold speed carry over to off-trail forest running? The full study design, measurements, and analysis plan.",
  byline: [
    "Anthony Riley, University of Gothenburg",
    "João Magalhães, Örebro University",
  ],
  hero: {
    src: hero,
    alt: "A runner mid-stride on a laboratory treadmill, with lactate testing equipment beside it.",
    caption: "Treadmill testing at the CHP performance centre.",
  },
  Body,
};
