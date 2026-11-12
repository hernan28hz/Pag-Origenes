"use client";

import Image from "next/image";
import { useState, type KeyboardEvent } from "react";
import type { Dictionary } from "@/content";
import { countryImages, type CountryKey } from "@/content/site";
import { LATAM_COUNTRIES, MAP_MARKERS } from "@/lib/latam-map";

/** Encuadre sobre Centroamérica, el Caribe y el norte de Sudamérica (coordenadas del mapa completo 600×820). */
const MAP_FOCUS_VIEWBOX = "40 30 500 560";
import { SplitLines } from "./SplitLines";

const KEYS: CountryKey[] = ["colombia", "ecuador", "panama"];

export function Presence({ dict }: { dict: Dictionary }) {
  const p = dict.presence;
  const [active, setActive] = useState<CountryKey>("colombia");
  const c = p.countries[active];

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = KEYS[(i + (e.key === "ArrowRight" ? 1 : KEYS.length - 1)) % KEYS.length];
    setActive(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  // Ruta discontinua que conecta las tres sedes
  const [pa, co, ec] = [MAP_MARKERS.panama, MAP_MARKERS.colombia, MAP_MARKERS.ecuador];
  const route = `M${pa[0]},${pa[1]} Q${(pa[0] + co[0]) / 2 + 18},${(pa[1] + co[1]) / 2 - 22} ${co[0]},${co[1]} Q${(co[0] + ec[0]) / 2 + 14},${(co[1] + ec[1]) / 2 + 22} ${ec[0]},${ec[1]}`;

  return (
    <section id="origenes" className="section wrap presence" data-header="dark" aria-labelledby="presence-title">
      <div className="grid gap-6 mb-[clamp(40px,5vw,80px)]">
        <span className="eyebrow" style={{ color: "var(--gold)" }} data-reveal>
          {p.index}
        </span>
        <SplitLines id="presence-title" text={p.title} className="display display--lg" />
      </div>

      <div className="presence__grid">
        <div className="map" data-reveal="scale">
          <svg viewBox={MAP_FOCUS_VIEWBOX} role="group" aria-label={p.hint}>
            <g className="map__zoom">
              {LATAM_COUNTRIES.map((country) => {
                const key = country.id as CountryKey;
                const isFocus = (KEYS as string[]).includes(country.id);
                if (!isFocus) return <path key={country.id + country.name} className="map__country" d={country.d} />;
                return (
                  <path
                    key={country.id}
                    d={country.d}
                    className={`map__focus ${active === key ? "is-active" : ""}`}
                    role="button"
                    tabIndex={0}
                    aria-label={p.countries[key].name}
                    aria-pressed={active === key}
                    onClick={() => setActive(key)}
                    onMouseEnter={() => setActive(key)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActive(key);
                      }
                    }}
                  />
                );
              })}
              <path className="map__route" d={route} />
              {KEYS.map((key) => {
                const [x, y] = MAP_MARKERS[key];
                const left = key === "ecuador" || key === "panama";
                return (
                  <g key={key} className="map__pin" transform={`translate(${x} ${y})`}>
                    <circle r="3.2" />
                    {active === key && <circle className="map__pulse" r="6" />}
                    <text className="map__label" x={left ? -10 : 10} y={key === "panama" ? -8 : 4} textAnchor={left ? "end" : "start"}>
                      {p.countries[key].name}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <div>
          <div className="presence__tabs" role="tablist" aria-label={p.hint}>
            {KEYS.map((key, i) => (
              <button
                key={key}
                id={`tab-${key}`}
                type="button"
                role="tab"
                className="presence__tab"
                aria-selected={active === key}
                aria-controls="presence-panel"
                tabIndex={active === key ? 0 : -1}
                onClick={() => setActive(key)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                {p.countries[key].name}
              </button>
            ))}
          </div>

          <div id="presence-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="presence__panel" aria-live="polite">
            <div className="presence__photo">
              {KEYS.map((key) => (
                <Image
                  key={key}
                  src={countryImages[key]}
                  alt=""
                  fill
                  sizes="(min-width: 960px) 40vw, 100vw"
                  data-active={active === key}
                />
              ))}
            </div>
            <div key={active} className="presence__swap grid gap-4">
              <span className="tag" style={{ color: "var(--gold)" }}>
                {c.role}
              </span>
              <h3 className="display presence__name">{c.name}</h3>
              <p className="lead" style={{ color: "rgba(242,236,225,.8)" }}>
                {c.description}
              </p>
              <div className="grid gap-3 mt-2">
                <span className="tag" style={{ color: "rgba(242,236,225,.55)" }}>
                  {p.territoriesLabel}
                </span>
                <ul className="presence__terr">
                  {c.territories.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
