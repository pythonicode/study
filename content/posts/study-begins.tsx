import hero from "@/public/images/web/participant_chp.jpg";
import type { Post } from "./types";

function Body() {
  return (
    <>

      <dl className="facts">
        <div>
          <dt>Participants</dt>
          <dd>30</dd>
        </div>
        <div>
          <dt>Tests per athlete</dt>
          <dd>2</dd>
        </div>
        <div>
          <dt>Lactate samples</dt>
          <dd>300+</dd>
        </div>
      </dl>

      <section>
        <h2>Thank You to Our Sponsor</h2>
        <p>
          Before anything else, a sincere thank you to our sponsor whose
          generous support has made this study possible. As outlined in the
          proposal, this is a self-supported project, and that support is what
          allows the testing to run at the scale it now does.
        </p>
      </section>

      <section>
        <h2>Participants</h2>
        <p>
          The original target was N ≥ 10 men and N ≥ 10 women. In the end, 30
          elite orienteers signed up — a level of interest that is genuinely
          exciting for a study of this size. The group is also more varied
          than expected, with athletes from several different countries and a
          broad range of competitive experience and training backgrounds.
        </p>
        <p>
          Each orienteer will complete both conditions: the treadmill test
          (C1) and the marked forest route (C2). With five intervals per test,
          that comes to over 300 blood lactate measurements, collected
          alongside continuous heart rate, GPS tracks, RPE at the end of every
          interval, and survey data.
        </p>
      </section>

      <section>
        <h2>Timeline</h2>
        <p>
          Testing will take place throughout September and October.
          The treadmill sessions start first, and the forest tests begin in
          October, in line with the 2–3 week spacing between each
          athlete&apos;s two sessions set out in the study design.
        </p>
      </section>

      <section>
        <h2>Two Treadmills, One Protocol</h2>
        <p>
          The treadmill condition is being run on two different machines,
          assigned according to each athlete&apos;s estimated threshold. The
          fastest athletes are tested at the RIU performance centre (CHP),
          and all other participants are tested on the treadmill at the IFK
          orienteering club gym.
        </p>
        <p>
          Using two treadmills introduces an obvious risk: a displayed speed of
          16 km/h on one machine is not guaranteed to be 16 km/h on the other.
          To reduce this, I measured both treadmills ahead of testing so that
          they could be calibrated and adjusted against each other. The aim is
          for the speeds recorded for each participant to be roughly
          equivalent, regardless of which machine they ran on.
        </p>
      </section>
    </>
  );
}

export const studyBegins: Post = {
  slug: "study-begins",
  kicker: "Update",
  title: "And We're Off! The Study Begins",
  date: "2026-09-01",
  summary:
    "Thirty elite orienteers, two tests each, and over 300 lactate measurements. Testing begins at CHP and the IFK club gym.",
  byline: ["Anthony Riley"],
  hero: {
    src: hero,
    alt: "A smiling participant in running kit stands in the treadmill lab while a researcher prepares equipment behind him.",
    caption: "The CHP performance centre, ready for a treadmill test.",
  },
  Body,
};
