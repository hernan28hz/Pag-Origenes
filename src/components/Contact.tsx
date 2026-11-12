import type { Dictionary } from "@/content";
import { commercialContacts, socialLinks, waLink, type Locale } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { SplitLines } from "./SplitLines";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

export function Contact({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const c = dict.contact;
  return (
    <section id="contacto" className="section wrap contact" data-header="dark" aria-labelledby="contact-title">
      <div className="contact__grid">
        <div className="contact__aside grid gap-8 content-start">
          <span className="eyebrow" style={{ color: "var(--gold)" }} data-reveal>
            {c.index}
          </span>
          <SplitLines id="contact-title" text={c.title} className="display display--lg" />
          <p className="lead" style={{ color: "rgba(242,236,225,.78)" }} data-reveal>
            {c.text}
          </p>

          <div className="grid gap-4 mt-4">
            <h3 className="tag" style={{ color: "rgba(242,236,225,.55)" }}>
              {c.contactsTitle}
            </h3>
            <div className="contact__cards">
              {commercialContacts.map((m) => (
                <article key={m.id} className="ccard" data-reveal>
                  <div className="grid gap-2">
                    <span className="ccard__role">{dict.team.roles[m.roleKey]}</span>
                    <h4 className="ccard__name">{m.name}</h4>
                  </div>
                  <p className="ccard__meta">
                    {m.phone && <a href={`tel:+${m.phone}`}>{m.phoneDisplay}</a>}
                    {m.country && <> · {dict.countryNames[m.country]}</>}
                  </p>
                  {m.phone && (
                    <div className="ccard__actions">
                      <a className="chip-link" href={waLink(m.phone, dict.whatsapp.message)} target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                      </a>
                      <a className="chip-link chip-link--ghost" href={`tel:+${m.phone}`}>
                        <PhoneIcon /> {dict.team.call}
                      </a>
                    </div>
                  )}
                  {socialLinks.length === 0 && <p className="ccard__social">{c.socialPending}</p>}
                </article>
              ))}
            </div>
          </div>
        </div>

        <div data-reveal>
          <ContactForm dict={dict} locale={locale} />
        </div>
      </div>
    </section>
  );
}
