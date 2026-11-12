import Image from "next/image";
import type { Dictionary } from "@/content";
import Link from "next/link";
import { images, localHref, type Locale } from "@/content/site";
import { SplitLines } from "./SplitLines";

export function About({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { about } = dict;
  return (
    <section id="nosotros" className="section wrap" data-header="light" aria-labelledby="about-title">
      <div className="about__grid">
        <div className="about__head">
          <span className="eyebrow" data-reveal>
            {about.index}
          </span>
          <SplitLines id="about-title" text={about.title} className="display display--md" />
          <p className="lead" data-reveal style={{ ["--d" as string]: "200ms" }}>
            {about.lead}
          </p>

          <ol className="about__chain" data-reveal style={{ ["--d" as string]: "300ms" }}>
            {about.chain.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>

          <div className="about__countries" data-reveal style={{ ["--d" as string]: "400ms" }}>
            {about.countries.map((c) => (
              <Link key={c.key} href={localHref(locale, "#origenes")} className="about__country" data-country={c.key}>
                <i aria-hidden="true" />
                <b>{c.name}</b>
                <span>{c.role}</span>
              </Link>
            ))}
          </div>

          <div className="grid gap-3" data-reveal style={{ ["--d" as string]: "500ms" }}>
            <span className="tag" style={{ color: "var(--muted)" }}>
              {about.markets.label}
            </span>
            <ul className="about__markets">
              {about.markets.list.map((m) => (
                <li key={m} className="pill">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-[clamp(48px,6vw,90px)]">
          <div className="about__collage">
            <figure className="about__c1">
              <div className="media mask-reveal h-full" data-parallax="0.14">
                <Image className="media__img" src={images.landscape} alt={about.captions.landscape} fill sizes="(min-width: 960px) 50vw, 100vw" />
              </div>
            </figure>
            <figure className="about__c2">
              <div className="media mask-reveal h-full" data-depth="16" style={{ ["--d" as string]: "150ms" }}>
                <Image className="media__img" src={images.producer} alt={about.captions.producer} fill sizes="(min-width: 960px) 25vw, 58vw" />
              </div>
              <figcaption>{about.captions.producer}</figcaption>
            </figure>
            <figure className="about__c3">
              <div className="media mask-reveal h-full" data-depth="16" style={{ ["--d" as string]: "300ms" }}>
                <Image className="media__img" src={images.preparation} alt={about.captions.selection} fill sizes="(min-width: 960px) 22vw, 42vw" />
              </div>
              <figcaption>{about.captions.selection}</figcaption>
            </figure>
          </div>

          <dl className="about__stats">
            {about.stats.map((s) => (
              <div key={s.label} className="about__stat" data-reveal>
                <dt className={`about__stat-label ${s.from ? "order-1" : "order-2"}`}>{s.label}</dt>
                <dd className={`about__stat-num ${s.from ? "order-2" : "order-1"}`} data-count={s.value} data-count-from={s.from ?? 0} data-count-pad={s.value < 10 ? 2 : 0}>
                  {s.value < 10 ? `0${s.value}` : s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
