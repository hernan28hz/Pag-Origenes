"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dictionary } from "@/content";
import { elementImages, localHref, type Locale } from "@/content/site";
import { AlchemySymbol, type ElementKey } from "./AlchemySymbol";
import { SplitLines } from "./SplitLines";
import { ArrowIcon } from "./Icons";

/**
 * Alquimia — colección de cuatro elementos en una escena fija a pantalla completa.
 *
 * Funcionamiento:
 *  - La escena queda fija (sticky) mientras el usuario desplaza; cada tramo de
 *    scroll corresponde a un elemento.
 *  - Al avanzar, la tarjeta del siguiente elemento se expande desde la fila
 *    hasta cubrir la pantalla y se convierte en el fondo; el título sale y entra
 *    línea a línea, la fila de tarjetas se reordena y el contador avanza.
 *  - Al retroceder ocurre lo inverso: el fondo actual se recoge en su tarjeta.
 *  - Flechas, tarjetas y scroll están sincronizados (los botones desplazan la
 *    página hasta el tramo del elemento, y el scroll dispara la transición).
 *  - Con prefers-reduced-motion las transiciones son fundidos breves.
 */
export function Alquimia({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const a = dict.alquimia;
  const els = a.elements;
  const N = els.length;
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = stage.current;
    const wrap = track.current;
    if (!root || !wrap) return;
    const scene: HTMLDivElement = root;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
    const bgs = q(".alqs__bg");
    const bgImgs = bgs.map((b) => b.querySelector<HTMLElement>("img"));
    const texts = q(".alqs__text");
    const cards = q(".alqs__card");
    const nums = q(".alqs__num-item");
    const bar = root.querySelector<HTMLElement>(".alqs__bar i");
    const deck = root.querySelector<HTMLElement>(".alqs__cards");

    let cur = -1;
    let busy = false;
    let pending: number | null = null;
    let tl: gsap.core.Timeline | null = null;

    const slotOf = (k: number, c: number) => (k - c - 1 + N) % N;
    const step = () => {
      const w = cards[0]?.offsetWidth ?? 0;
      return w + Math.round(w * 0.11);
    };
    const parts = (el: HTMLElement) => ({
      lines: Array.from(el.querySelectorAll<HTMLElement>(".alqs__mask > span")),
      rest: Array.from(el.querySelectorAll<HTMLElement>(".alqs__fade")),
    });
    const rectIn = (el: Element) => {
      const r = el.getBoundingClientRect();
      const s = root.getBoundingClientRect();
      return { top: r.top - s.top, left: r.left - s.left, width: r.width, height: r.height };
    };

    /** Coloca todo sin animación (estado de reposo del elemento c). */
    const place = (c: number) => {
      const st = step();
      bgs.forEach((b, k) => {
        gsap.set(b, { clearProps: "top,left,width,height,borderRadius", zIndex: k === c ? 1 : 0, autoAlpha: k === c ? 1 : 0 });
      });
      bgImgs.forEach((img) => img && gsap.set(img, { scale: 1 }));
      cards.forEach((card, k) => {
        gsap.set(card, k === c ? { autoAlpha: 0, x: (N - 1) * st } : { autoAlpha: 1, x: slotOf(k, c) * st, scale: 1 });
      });
      texts.forEach((t, k) => {
        const { lines, rest } = parts(t);
        gsap.set(t, { autoAlpha: k === c ? 1 : 0 });
        gsap.set(lines, { yPercent: k === c ? 0 : 110 });
        gsap.set(rest, { autoAlpha: k === c ? 1 : 0, y: 0 });
      });
      nums.forEach((n, k) => gsap.set(n, { yPercent: k === c ? 0 : 110 }));
      if (bar) gsap.set(bar, { scaleX: (c + 1) / N });
    };

    const finish = () => {
      busy = false;
      tl = null;
      if (pending !== null && pending !== cur) {
        const p = pending;
        pending = null;
        go(p);
      } else pending = null;
    };

    function go(to: number) {
      if (to === cur) return;
      if (busy) {
        pending = to;
        return;
      }
      const from = cur;
      cur = to;
      setActive(to);
      if (from < 0) {
        place(to);
        return;
      }
      busy = true;
      const st = step();
      const forward = to > from;
      const outT = parts(texts[from]);
      const inT = parts(texts[to]);

      if (reduced) {
        tl = gsap.timeline({ onComplete: () => { place(to); finish(); } });
        tl.to([bgs[from], texts[from]], { autoAlpha: 0, duration: 0.35 }, 0)
          .set(bgs[to], { zIndex: 1 }, 0)
          .to([bgs[to], texts[to]], { autoAlpha: 1, duration: 0.35 }, 0)
          .set([...inT.lines], { yPercent: 0 }, 0)
          .set(inT.rest, { autoAlpha: 1 }, 0);
        return;
      }

      tl = gsap.timeline({ defaults: { ease: "power3.inOut" }, onComplete: () => { place(to); finish(); } });

      // ── Textos: salen línea a línea y entran los del nuevo elemento ──
      tl.to(outT.lines, { yPercent: -110, duration: 0.55, ease: "power2.in", stagger: 0.05 }, 0)
        .to(outT.rest, { autoAlpha: 0, y: -14, duration: 0.4, ease: "power2.in", stagger: 0.03 }, 0)
        .set(texts[from], { autoAlpha: 0 }, 0.6)
        .set(texts[to], { autoAlpha: 1 }, 0.6)
        .fromTo(inT.lines, { yPercent: 110 }, { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.08 }, 0.75)
        .fromTo(inT.rest, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.06 }, 0.95);

      // ── Contador y progreso ──
      tl.to(nums[from], { yPercent: forward ? -110 : 110, duration: 0.6 }, 0.2)
        .fromTo(nums[to], { yPercent: forward ? 110 : -110 }, { yPercent: 0, duration: 0.8, ease: "expo.out" }, 0.45);
      if (bar) tl.to(bar, { scaleX: (to + 1) / N, duration: 1.1 }, 0.1);

      if (forward) {
        // La tarjeta del destino crece hasta cubrir la escena y se vuelve el fondo.
        const r = rectIn(cards[to]);
        const s = scene.getBoundingClientRect();
        tl.set(bgs[to], { ...r, borderRadius: 16, zIndex: 3, autoAlpha: 1 }, 0)
          .set(cards[to], { autoAlpha: 0 }, 0)
          .to(bgs[to], { top: 0, left: 0, width: s.width, height: s.height, borderRadius: 0, duration: 1.15 }, 0.05);
        if (bgImgs[to]) tl.fromTo(bgImgs[to], { scale: 1.18 }, { scale: 1, duration: 1.8, ease: "power2.out" }, 0.05);
        if (bgImgs[from]) tl.to(bgImgs[from], { scale: 1.08, duration: 1.2 }, 0);
        // El elemento que sale pasa al final de la fila.
        tl.set(cards[from], { x: (N - 1) * st + st * 0.4, autoAlpha: 0 }, 0)
          .to(cards[from], { x: slotOf(from, to) * st, autoAlpha: 1, scale: 1, duration: 0.9, ease: "expo.out" }, 0.75);
      } else {
        // El fondo actual se recoge en su tarjeta y descubre el anterior.
        const st0 = deck ? rectIn(deck) : { top: 0, left: 0, width: 0, height: 0 };
        const slot = slotOf(from, to);
        const cw = cards[0].offsetWidth;
        const ch = cards[0].offsetHeight;
        tl.set(bgs[to], { zIndex: 1, autoAlpha: 1 }, 0)
          .set(bgs[from], { zIndex: 3 }, 0)
          .to(bgs[from], { top: st0.top, left: st0.left + slot * st, width: cw, height: ch, borderRadius: 16, duration: 1.1 }, 0.05);
        if (bgImgs[to]) tl.fromTo(bgImgs[to], { scale: 1.12 }, { scale: 1, duration: 1.6, ease: "power2.out" }, 0.05);
        tl.to(cards[to], { autoAlpha: 0, scale: 0.92, duration: 0.45, ease: "power2.in" }, 0)
          .set(cards[from], { x: slot * st, autoAlpha: 1, scale: 1 }, 1.15)
          .set(bgs[from], { autoAlpha: 0 }, 1.15);
      }

      // Resto de la fila se desplaza a su nueva posición.
      cards.forEach((card, k) => {
        if (k === to || k === from) return;
        tl!.to(card, { x: slotOf(k, to) * st, duration: 1, ease: "power3.inOut" }, 0.1);
      });
    }

    // ── El scroll decide el elemento activo ──
    const indexFrom = (p: number) => Math.min(N - 1, Math.max(0, Math.round(p * (N - 1))));
    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => go(indexFrom(self.progress)),
      onRefresh: (self) => {
        if (cur < 0) go(indexFrom(self.progress));
        else if (!busy) place(cur);
      },
    });
    if (cur < 0) go(indexFrom(trigger.progress));

    const onResize = () => { if (!busy && cur >= 0) place(cur); };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      trigger.kill();
      tl?.kill();
    };
  }, [N]);

  /** Lleva el scroll al tramo del elemento i (la transición la dispara el scroll). */
  const scrollToIndex = (i: number) => {
    const w = track.current;
    if (!w) return;
    const target = Math.min(N - 1, Math.max(0, i));
    const top = w.getBoundingClientRect().top + window.scrollY;
    const range = w.offsetHeight - window.innerHeight;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: Math.round(top + (range * target) / (N - 1)) + 1, behavior: reduced ? "auto" : "smooth" });
  };

  const current = els[active];

  return (
    <section id="alquimia" className="alq" data-el={current.key} aria-labelledby="alq-title">
      <div className="alq__glow" aria-hidden="true" />

      <div className="section wrap alq__intro" data-header="dark">
        <span className="eyebrow" style={{ color: "var(--el-soft)" }} data-reveal>
          {a.index}
        </span>
        <p className="alq__brand" aria-hidden="true" data-reveal="fade">
          {a.brand}
        </p>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <SplitLines id="alq-title" text={a.title} className="display display--lg alq__title" />
          <div className="grid gap-6">
            <p className="alq__text lead" data-reveal>
              {a.text}
            </p>
            <p className="alq__hint" data-reveal>
              <span className="alq__hint-line" aria-hidden="true" />
              {a.scrollHint}
            </p>
          </div>
        </div>
      </div>

      {/* Tramo de scroll: la escena queda fija mientras se recorren los elementos */}
      <div ref={track} className="alqs" style={{ ["--n" as string]: N }} data-header="dark">
        <div ref={stage} className="alqs__stage" role="region" aria-roledescription="carrusel" aria-label={a.brand}>
          {/* Fondos a pantalla completa */}
          {els.map((el, i) => (
            <div key={el.key} className="alqs__bg" aria-hidden="true">
              <Image src={elementImages[el.key as ElementKey]} alt="" fill sizes="100vw" quality={78} loading={i === 0 ? "eager" : "lazy"} />
            </div>
          ))}
          <div className="alqs__shade" aria-hidden="true" />

          <div className="alqs__ui">
            {/* Textos de cada elemento (apilados; solo uno visible) */}
            <div className="alqs__texts" aria-live="polite">
              {els.map((el, i) => {
                const key = el.key as ElementKey;
                const isOn = i === active;
                return (
                  <article key={key} className="alqs__text" aria-hidden={!isOn} inert={!isOn} aria-labelledby={`alq-${key}`}>
                    <p className="alqs__kicker alqs__mask">
                      <span>
                        <i aria-hidden="true" /> {a.chapter} 0{i + 1} · {el.place}, {el.country}
                      </span>
                    </p>
                    <h3 id={`alq-${key}`} className="alqs__name alqs__mask">
                      <span>{el.name}</span>
                    </h3>
                    <p className="alqs__tagline alqs__mask">
                      <span>{el.tagline}</span>
                    </p>
                    <p className="alqs__body alqs__fade">{el.body[0]}</p>
                    {el.body[1] && <p className="alqs__body alqs__body--more alqs__fade">{el.body[1]}</p>}
                    <p className="alqs__role alqs__fade">
                      <b>
                        {a.roleLabel}: {el.role}
                      </b>
                      <span>{el.roleText}</span>
                    </p>
                    <div className="alqs__actions alqs__fade">
                      <span className="alqs__badge" aria-hidden="true">
                        <AlchemySymbol el={key} className="is-drawn" />
                      </span>
                      <Link className="btn btn--line alqs__cta" href={`${localHref(locale, "contacto")}?origen=${el.origin}`}>
                        {a.cta} <ArrowIcon className="btn__arrow" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Fila de tarjetas + controles */}
            <div className="alqs__side">
              <div className="alqs__cards">
                {els.map((el, i) => {
                  const key = el.key as ElementKey;
                  return (
                    <button
                      key={key}
                      type="button"
                      className="alqs__card"
                      tabIndex={i === active ? -1 : 0}
                      aria-hidden={i === active}
                      aria-label={`${a.view}: ${el.name} — ${el.place}, ${el.country}`}
                      onClick={() => scrollToIndex(i)}
                    >
                      <span className="alqs__card-in">
                        <Image src={elementImages[key]} alt="" fill sizes="(min-width: 960px) 220px, 130px" quality={70} />
                        <span className="alqs__card-shade" />
                        <AlchemySymbol el={key} className="alqs__card-glyph is-drawn" />
                        <span className="alqs__card-meta">
                          <small>
                            {el.place} · {el.country}
                          </small>
                          <b>{el.name}</b>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="alqs__controls">
                <button type="button" className="alqs__arrow alqs__arrow--prev" onClick={() => scrollToIndex(active - 1)} disabled={active === 0} aria-label={a.prev}>
                  <ArrowIcon />
                </button>
                <button type="button" className="alqs__arrow" onClick={() => scrollToIndex(active + 1)} disabled={active === N - 1} aria-label={a.next}>
                  <ArrowIcon />
                </button>
                <span className="alqs__bar" aria-hidden="true">
                  <i />
                </span>
                <span className="alqs__num" aria-hidden="true">
                  <span className="alqs__num-mask">
                    {els.map((el, i) => (
                      <span key={el.key} className="alqs__num-item">
                        0{i + 1}
                      </span>
                    ))}
                  </span>
                  <small>/ 0{N}</small>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
