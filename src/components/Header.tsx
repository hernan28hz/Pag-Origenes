"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { Dictionary } from "@/content";
import { localHref, type Locale } from "@/content/site";

type Props = { dict: Dictionary; locale: Locale };

/**
 * Header totalmente transparente (sin fondo, sin logo, sin menú hamburguesa).
 * - En el inicio, al cargar solo se ve el selector ES / EN; la navegación
 *   aparece cuando el usuario empieza a desplazarse.
 * - En las páginas internas la navegación es visible desde el principio.
 * - El color del texto se adapta a la sección que hay debajo
 *   (atributo data-header="dark|light" en cada sección).
 * - Navegación y selector de idioma alineados a la derecha.
 * - En móvil la navegación es una fila horizontal deslizable.
 */
export function Header({ dict, locale }: Props) {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const [revealed, setRevealed] = useState(!isHome);
  const other: Locale = locale === "es" ? "en" : "es";

  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      setRevealed(!isHome || y > window.innerHeight * 0.3);
      header.classList.toggle("is-hidden", y > lastY && y > window.innerHeight * 0.9);
      lastY = y;
      const probe = document.elementsFromPoint(window.innerWidth / 2, 40).find((el) => el.closest("[data-header]"));
      header.dataset.theme = probe?.closest<HTMLElement>("[data-header]")?.dataset.header ?? "dark";
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, pathname]);

  const switchLang = (e: MouseEvent<HTMLAnchorElement>) => {
    // Conserva la página y la sección actuales al cambiar de idioma
    e.preventDefault();
    const rest = window.location.pathname.replace(new RegExp(`^/${locale}`), "");
    window.location.href = `/${other}${rest}${window.location.search}${window.location.hash}`;
  };

  const isActive = (href: string) => {
    if (href.startsWith("#")) return false;
    return href ? pathname.startsWith(`/${locale}/${href}`) : isHome;
  };

  return (
    <header ref={ref} className={`header ${revealed ? "is-revealed" : ""}`} data-theme="dark">
      <nav className="header__nav" aria-label={dict.a11y.home} inert={!revealed}>
        {dict.nav.map((item) => (
          <Link key={item.href} href={localHref(locale, item.href)} aria-current={isActive(item.href) ? "page" : undefined}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header__actions">
        <div className="lang" role="group" aria-label={dict.a11y.language}>
          <span aria-current="true">{locale.toUpperCase()}</span>
          <span aria-hidden="true">/</span>
          <a href={`/${other}`} hrefLang={other} lang={other} onClick={switchLang} aria-label={dict.a11y.switchTo}>
            {other.toUpperCase()}
          </a>
        </div>
      </div>
    </header>
  );
}
