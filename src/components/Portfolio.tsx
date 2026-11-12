import Image from "next/image";
import type { Dictionary } from "@/content";
import Link from "next/link";
import { localHref, varietyImages, type Locale } from "@/content/site";
import { SplitLines } from "./SplitLines";
import { ArrowIcon } from "./Icons";

export function Portfolio({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const p = dict.portfolio;
  return (
    <section id="portafolio" className="section wrap" data-header="light" aria-labelledby="portfolio-title">
      <div className="portfolio__head lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div className="grid gap-6">
          <span className="eyebrow" data-reveal>
            {p.index}
          </span>
          <SplitLines id="portfolio-title" text={p.title} className="display display--lg" />
        </div>
        <p className="lead max-w-[44ch]" data-reveal style={{ ["--d" as string]: "200ms" }}>
          {p.text}
        </p>
      </div>

      <div className="varieties">
        {p.varieties.map((v, i) => {
          const key = v.key as keyof typeof varietyImages;
          return (
            <article key={v.key} className="variety" data-reveal style={{ ["--d" as string]: `${i * 120}ms` }} aria-labelledby={`var-${v.key}`}>
              <div className="media">
                <Image className="media__img" src={varietyImages[key]} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
              <div className="variety__top">
                <span>0{i + 1}</span>
                <span>Arabica</span>
              </div>
              <div className="variety__body">
                <h3 id={`var-${v.key}`} className="display variety__name">
                  {v.name}
                </h3>
                <div className="variety__more">
                  <div>
                    <p className="variety__desc">{v.description}</p>
                    <dl className="variety__origins">
                      <dt>{p.originsLabel}</dt>
                      <dd>{v.origins ? v.origins.join(" · ") : p.originsPending}</dd>
                    </dl>
                    <div>
                      <Link className="btn btn--gold" href={`${localHref(locale, "contacto")}?variedad=${v.key}`}>
                        {p.cta} <ArrowIcon className="btn__arrow" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Llamada a la acción al cerrar la presentación de productos */}
      <div className="portfolio__cta" data-reveal>
        <Link className="btn btn--gold" data-magnetic="0.25" href={localHref(locale, "contacto")}>
          {dict.navCta} <ArrowIcon className="btn__arrow" />
        </Link>
      </div>
    </section>
  );
}
