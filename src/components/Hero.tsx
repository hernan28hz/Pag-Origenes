"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dictionary } from "@/content";
import { images } from "@/content/site";

/** Secuencia del recorrido: del paisaje a la taza. */
const FRAMES = [
  { src: images.landscape, position: "50% 60%" },
  { src: images.crops, position: "50% 50%" },
  { src: images.cherries, position: "45% 45%" },
  { src: images.preparation, position: "50% 40%" },
  { src: images.cup, position: "50% 55%" },
];

export function Hero({ dict }: { dict: Dictionary }) {
  const section = useRef<HTMLElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const { hero } = dict;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = section.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" },
      (ctx) => {
        const motion = !!ctx.conditions?.motion;
        const q = gsap.utils.selector(root);
        const layers = q(".hero__layer") as HTMLElement[];
        const imgs = q(".hero__img") as HTMLElement[];
        const chapters = q(".hero__chapter") as HTMLElement[];
        const fills = q(".hero__step i") as HTMLElement[];
        const intro = q(".hero__intro")[0] as HTMLElement;
        const n = FRAMES.length;

        // Tiempos: cada transición dura 1.2 y le sigue una pausa de lectura.
        const GAP = 2;
        const start = (i: number) => 0.6 + (i - 1) * GAP;

        if (!motion) gsap.set(layers.slice(1), { clipPath: "none", autoAlpha: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: motion ? 0.9 : true,
            onUpdate: (self) => {
              const p = self.progress * n;
              fills.forEach((f, k) => gsap.set(f, { scaleX: gsap.utils.clamp(0, 1, p - k) }));
              const idx = Math.min(n - 1, Math.floor(tl.time() < start(1) + 0.6 ? 0 : (tl.time() - start(1) - 0.6) / GAP + 1));
              if (counter.current) counter.current.textContent = String(idx + 1).padStart(2, "0");
              if (label.current) label.current.textContent = hero.chapters[idx]?.label ?? "";
            },
          },
        });

        // Lento acercamiento al paisaje inicial
        if (motion) tl.fromTo(imgs[0], { scale: 1.12 }, { scale: 1, duration: start(1) + 0.4 }, 0);

        for (let i = 1; i < n; i++) {
          const t = start(i);
          const prevText = i === 1 ? intro : chapters[i - 2];
          tl.to(prevText, { autoAlpha: 0, y: -50, duration: 0.5, ease: "power1.in" }, t);

          if (motion) {
            tl.to(imgs[i - 1], { scale: 1.28, duration: 1.4, ease: "power1.in" }, t);
            tl.fromTo(
              layers[i],
              { clipPath: "inset(50% 50% 50% 50% round 28px)" },
              { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1.2, ease: "power2.inOut" },
              t + 0.1,
            );
            tl.fromTo(imgs[i], { scale: 1.6 }, { scale: 1, duration: GAP + 0.2, ease: "power2.out" }, t + 0.1);
          } else {
            tl.to(layers[i], { autoAlpha: 1, duration: 0.6 }, t + 0.2);
          }

          tl.fromTo(
            chapters[i - 1],
            { autoAlpha: 0, y: 50 },
            { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
            t + 0.85,
          );
        }
        // Pausa final sobre la taza antes de liberar el scroll
        tl.to({}, { duration: 0.8 });
      },
    );

    return () => mm.revert();
  }, [hero.chapters]);

  const titleLines = hero.title.split("\n");

  return (
    <section ref={section} id="inicio" className="hero" data-header="dark" aria-labelledby="hero-title">
      <div className="hero__stage">
        {FRAMES.map((f, i) => (
          <div className="hero__layer" key={f.src} aria-hidden="true">
            <Image
              src={f.src}
              alt=""
              fill
              sizes="100vw"
              priority={i === 0}
              quality={80}
              className="hero__img"
              style={{ objectFit: "cover", objectPosition: f.position }}
            />
          </div>
        ))}
        <div className="hero__shade" aria-hidden="true" />
        <div className="hero__grain" aria-hidden="true" />

        <div className="hero__intro">
          <Image
            src={images.logo}
            alt="Orígenes Coffee"
            width={1484}
            height={559}
            priority
            sizes="230px"
            className="hero__mark hero-enter"
          />
          <h1 id="hero-title" className="display display--xl hero__title" aria-label={hero.title.replace(/\n/g, " ")}>
            {titleLines.map((line, i) => (
              <span className="line" key={i} aria-hidden="true">
                <span className="line__inner hero-line" style={{ ["--i" as string]: i }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <div className="hero__intro-row">
            <p className="lead hero__sub hero-enter" style={{ ["--d" as string]: "700ms" }}>
              {hero.subtitle}
            </p>
          </div>
        </div>

        {hero.chapters.slice(1).map((c, i) => (
          <div className="hero__chapter" key={c.label} aria-hidden="true">
            <span className="eyebrow" style={{ color: "var(--gold)" }}>
              0{i + 2} — {c.label}
            </span>
            <p className="display hero__chapter-title">
              {c.title.split("\n").map((l, k) => (
                <span key={k} style={{ display: "block" }}>
                  {l}
                </span>
              ))}
            </p>
            <p className="hero__chapter-text">{c.text}</p>
          </div>
        ))}

        <ol className="sr-only">
          {hero.chapters.slice(1).map((c) => (
            <li key={c.label}>
              {c.label}: {c.title.replace(/\n/g, " ")}. {c.text}
            </li>
          ))}
        </ol>

        <div className="hero__hud hero-enter" style={{ ["--d" as string]: "1100ms" }} aria-hidden="true">
          <span className="hero__counter">
            <b ref={counter}>01</b> / 0{FRAMES.length} · <span ref={label}>{hero.chapters[0].label}</span>
          </span>
          <div className="hero__steps">
            {FRAMES.map((f) => (
              <span className="hero__step" key={f.src}>
                <i />
              </span>
            ))}
          </div>
          <span className="hero__scroll">
            {hero.scroll}
            <span className="hero__scroll-line" />
          </span>
        </div>
      </div>
    </section>
  );
}
