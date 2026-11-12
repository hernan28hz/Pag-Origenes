import Image from "next/image";
import type { Dictionary } from "@/content";
import { images } from "@/content/site";
import { SplitLines } from "./SplitLines";

export function People({ dict }: { dict: Dictionary }) {
  const { people } = dict;
  return (
    <section className="people" aria-labelledby="people-title">
      <div className="people__hero" data-header="dark">
        <div className="media" data-parallax="0.18">
          <Image className="media__img" src={images.producer} alt="" fill sizes="100vw" style={{ objectPosition: "35% 40%" }} />
        </div>
        <div className="people__hero-copy">
          <span className="eyebrow" style={{ color: "var(--gold-soft)" }} data-reveal>
            {people.index}
          </span>
          <SplitLines id="people-title" text={people.title} className="display display--xl" />
        </div>
      </div>

      <div className="section wrap" data-header="light">
        <div className="people__body">
          <div className="grid gap-[clamp(40px,5vw,72px)]">
            <p className="people__text" data-reveal>
              {people.text}
            </p>
            <div className="people__strip">
              <div className="media mask-reveal" data-depth="14">
                <Image className="media__img" src={images.cherries} alt="" fill sizes="(min-width: 960px) 30vw, 55vw" />
              </div>
              <div className="media mask-reveal" data-depth="14" style={{ ["--d" as string]: "200ms" }}>
                <Image className="media__img" src={images.crops} alt="" fill sizes="(min-width: 960px) 24vw, 45vw" />
              </div>
            </div>
          </div>

          <ul className="people__pillars lg:sticky lg:top-[calc(var(--header-h)+40px)]">
            {people.pillars.map((p, i) => (
              <li key={p.title} className="pillar" data-reveal style={{ ["--d" as string]: `${i * 100}ms` }}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
