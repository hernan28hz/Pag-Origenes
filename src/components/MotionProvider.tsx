"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Comportamientos de movimiento globales, declarados con atributos data-*:
 *  - [data-reveal] / [data-reveal-lines] / .mask-reveal → aparición al entrar en viewport
 *  - [data-parallax="0.12"]  → la imagen interna (.media__img) se desplaza con el scroll
 *  - [data-depth]            → la imagen interna sigue sutilmente al cursor
 *  - [data-magnetic]         → el elemento se acerca al cursor
 *  - [data-count="2017"]     → contador numérico al entrar en viewport
 * Todo se desactiva con prefers-reduced-motion; los efectos de cursor solo
 * existen con puntero fino (no en táctil).
 */
export function MotionProvider() {
  // Se reinicia en cada cambio de página (navegación multipágina del lado del cliente).
  const pathname = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.remove("no-js");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    // ── Reveal ────────────────────────────────────────────────
    const revealEls = document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-lines], .mask-reveal, [data-inview]");
    if (reduced || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-in"));
    } else {
      // Los elementos con clip-path completo no "intersectan" para el
      // IntersectionObserver, así que .mask-reveal se observa por su padre.
      const targets = new Map<Element, HTMLElement[]>();
      revealEls.forEach((el) => {
        const observed = el.classList.contains("mask-reveal") && el.parentElement ? el.parentElement : el;
        targets.set(observed, [...(targets.get(observed) ?? []), el]);
      });
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              targets.get(e.target)?.forEach((el) => el.classList.add("is-in"));
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
      );
      targets.forEach((_, el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // ── Contadores ────────────────────────────────────────────
    const counters = document.querySelectorAll<HTMLElement>("[data-count]");
    counters.forEach((el) => {
      const to = Number(el.dataset.count);
      const from = Number(el.dataset.countFrom ?? 0);
      const pad = Number(el.dataset.countPad ?? 0);
      const fmt = (n: number) => String(Math.round(n)).padStart(pad, "0");
      if (reduced) {
        el.textContent = fmt(to);
        return;
      }
      el.textContent = fmt(from);
      const obj = { v: from };
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () =>
          gsap.to(obj, { v: to, duration: 2.2, ease: "power3.out", onUpdate: () => { el.textContent = fmt(obj.v); } }),
      });
      cleanups.push(() => st.kill());
    });

    if (!reduced) {
      // ── Parallax de imágenes ──────────────────────────────────
      const ctx = gsap.context(() => {
        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((wrap) => {
          const img = wrap.querySelector<HTMLElement>(".media__img");
          if (!img) return;
          const amount = Number(wrap.dataset.parallax || 0.1) * 100;
          gsap.fromTo(
            img,
            { yPercent: -amount / 2 },
            { yPercent: amount / 2, ease: "none", scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });
      });
      cleanups.push(() => ctx.revert());

      if (finePointer) {
        // ── Profundidad con cursor ──────────────────────────────
        document.querySelectorAll<HTMLElement>("[data-depth]").forEach((wrap) => {
          const img = wrap.querySelector<HTMLElement>(".media__img");
          if (!img) return;
          const strength = Number(wrap.dataset.depth || 14);
          const move = (e: PointerEvent) => {
            const r = wrap.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            img.style.transform = `translate3d(${-x * strength}px, ${-y * strength}px, 0) scale(1.06)`;
          };
          const leave = () => { img.style.transform = ""; };
          wrap.addEventListener("pointermove", move);
          wrap.addEventListener("pointerleave", leave);
          cleanups.push(() => { wrap.removeEventListener("pointermove", move); wrap.removeEventListener("pointerleave", leave); });
        });

        // ── Botones magnéticos ──────────────────────────────────
        document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
          const strength = Number(el.dataset.magnetic || 0.3);
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * strength);
            yTo((e.clientY - (r.top + r.height / 2)) * strength);
          };
          const leave = () => { xTo(0); yTo(0); };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
        });
      }
    }

    // Recalcular posiciones cuando terminan de cargar imágenes y fuentes.
    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});
    cleanups.push(() => window.removeEventListener("load", refresh));

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
