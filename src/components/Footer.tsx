import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/content";
import { WHATSAPP_NUMBER, commercialContacts, images, localHref, socialLinks, waLink, type Locale } from "@/content/site";
import { WhatsAppIcon } from "./Icons";

type Props = {
  dict: Dictionary;
  locale: Locale;
  /**
   * true  → el footer trae su propia fotografía de fondo (páginas internas).
   * false → se coloca sobre una imagen ya existente (cierre del inicio).
   */
  standalone?: boolean;
};

/** Footer con efecto de cristal esmerilado (glassmorphism), sin fondo sólido. */
export function Footer({ dict, locale, standalone = false }: Props) {
  const { footer } = dict;
  const year = new Date().getFullYear();

  const glass = (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <Link href={localHref(locale, "")} className="footer__logo" aria-label={dict.a11y.home}>
            <Image src={images.logo} alt="Orígenes Coffee" fill sizes="180px" />
          </Link>
          <ul className="footer__meta">
            {footer.corporate.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <nav aria-label={footer.navTitle} className="footer__col">
          <h2>{footer.navTitle}</h2>
          <ul className="footer__list">
            {footer.nav.map((n) => (
              <li key={n.href}>
                <Link href={localHref(locale, n.href)}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h2>{footer.whatsappTitle}</h2>
          <ul className="footer__list">
            {WHATSAPP_NUMBER && (
              <li>
                <a href={waLink(WHATSAPP_NUMBER, dict.whatsapp.message)} target="_blank" rel="noopener noreferrer" className="footer__wa">
                  <WhatsAppIcon className="h-4 w-4" /> {footer.whatsapp}
                </a>
              </li>
            )}
            {commercialContacts.map(
              (m) =>
                m.phone && (
                  <li key={m.id}>
                    <a href={waLink(m.phone, dict.whatsapp.message)} target="_blank" rel="noopener noreferrer">
                      {m.name}
                      <small>{m.country ? dict.countryNames[m.country] : ""}</small>
                    </a>
                  </li>
                ),
            )}
          </ul>
        </div>

        <div className="footer__col">
          <h2>{footer.socialTitle}</h2>
          <ul className="footer__list">
            {socialLinks.length ? (
              socialLinks.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))
            ) : (
              <li className="footer__muted">{footer.socialPending}</li>
            )}
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span>
          © {year} Orígenes Coffee. {footer.rights}
        </span>
        <a href="#" className="footer__top">
          {footer.top} <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );

  if (!standalone) return glass;

  return (
    <div className="footer-stage" data-header="dark">
      <div className="footer-stage__bg" aria-hidden="true">
        <Image src={images.landscape} alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "50% 70%" }} />
      </div>
      {glass}
    </div>
  );
}
