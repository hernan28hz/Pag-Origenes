import Image from "next/image";
import type { Dictionary } from "@/content";
import { images } from "@/content/site";

export function MissionVision({ dict }: { dict: Dictionary }) {
  const { mission: m } = dict;
  return (
    <section id="mision" className="section wrap mv" data-header="dark" aria-labelledby="mission-title">
      {/* MISIÓN */}
      <div className="mv__block">
        <div className="mv__aside grid gap-6">
          <span className="eyebrow" style={{ color: "var(--gold)" }} data-reveal>
            {m.index}
          </span>
          <h2 id="mission-title" className="display display--lg" data-reveal>
            {m.missionLabel}
          </h2>
        </div>
        <div className="grid gap-10">
          <p className="mv__statement" data-reveal>
            {m.mission[0]}
          </p>
          <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-end">
            <div className="media mv__photo mask-reveal" data-parallax="0.12">
              <Image className="media__img" src={images.preparation} alt="" fill sizes="(min-width: 768px) 30vw, 100vw" />
            </div>
            <p className="mv__statement--sm" data-reveal>
              {m.mission[1]}
            </p>
          </div>
        </div>
      </div>

      <div className="mv__divider" aria-hidden="true" />

      {/* VISIÓN */}
      <div className="grid gap-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display display--lg" data-reveal>
            {m.visionLabel}
          </h2>
          <span className="mv__year" aria-hidden="true" data-reveal="fade">
            {m.visionYear}
          </span>
        </div>
        <p className="mv__statement max-w-[22ch] md:text-[clamp(2.4rem,4.6vw,4.6rem)]" data-reveal>
          {m.vision[0]}
        </p>
        <div className="mv__block mv__vision mt-6">
          <p className="mv__statement--sm" data-reveal>
            {m.vision[1]}
          </p>
          <div className="grid gap-8">
            <div className="media aspect-[16/11] rounded mask-reveal" data-depth="18">
              <Image className="media__img" src={images.bar} alt="" fill sizes="(min-width: 960px) 40vw, 100vw" />
            </div>
            <p className="mv__closing" data-reveal>
              {m.vision[2]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
