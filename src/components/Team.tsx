"use client";

import Image from "next/image";
import { useState } from "react";
import type { Dictionary } from "@/content";
import { images, team, waLink, type TeamMember } from "@/content/site";
import { SplitLines } from "./SplitLines";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

function MemberCard({ m, dict, index }: { m: TeamMember; dict: Dictionary; index: number }) {
  const [open, setOpen] = useState(false);
  const t = dict.team;
  const role = t.roles[m.roleKey];
  const detailsId = `member-${m.id}`;
  const hasContact = !!(m.phone || m.email);

  return (
    <article className="member" data-reveal style={{ ["--d" as string]: `${index * 90}ms` }}>
      <div className="member__photo">
        {m.photo ? (
          <Image src={m.photo} alt={m.name ?? role} fill sizes="(min-width: 1100px) 25vw, (min-width: 600px) 50vw, 100vw" />
        ) : (
          <div className="member__placeholder">
            {m.name ? (
              <span className="member__initials" aria-hidden="true">
                {initials(m.name)}
              </span>
            ) : (
              <Image src={images.mark} alt="" width={120} height={132} />
            )}
            <span>{t.pendingPhoto}</span>
          </div>
        )}
      </div>

      <div className="member__body">
        <span className="member__role">{role}</span>
        <h3 className={`member__name ${m.name ? "" : "is-pending"}`}>{m.name ?? t.pendingName}</h3>
        <button
          type="button"
          className="member__toggle"
          aria-expanded={open}
          aria-controls={detailsId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t.less : t.more}
          <span className="member__plus" aria-hidden="true" />
        </button>
      </div>

      <div id={detailsId} className={`member__details ${open ? "is-open" : ""}`} inert={!open}>
        <div>
          <dl className="member__dl">
            <div>
              <dt>{t.country}</dt>
              <dd>{m.country ? dict.countryNames[m.country] : t.pendingInfo}</dd>
            </div>
            <div>
              <dt>{t.contact}</dt>
              <dd>
                {hasContact ? (
                  <div className="member__actions mt-2">
                    {m.phone && (
                      <a className="chip-link" href={waLink(m.phone, dict.whatsapp.message)} target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon className="h-4 w-4" /> {t.whatsapp}
                      </a>
                    )}
                    {m.phone && (
                      <a className="chip-link chip-link--ghost" href={`tel:+${m.phone}`}>
                        <PhoneIcon /> {m.phoneDisplay}
                      </a>
                    )}
                    {m.email && (
                      <a className="chip-link chip-link--ghost" href={`mailto:${m.email}`}>
                        {m.email}
                      </a>
                    )}
                  </div>
                ) : (
                  t.pendingInfo
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
}

export function Team({ dict }: { dict: Dictionary }) {
  const t = dict.team;
  return (
    <section id="experiencia" className="section wrap team" data-header="light" aria-labelledby="team-title">
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end mb-[clamp(48px,6vw,90px)]">
        <div className="grid gap-6">
          <span className="eyebrow" data-reveal>
            {t.index}
          </span>
          <SplitLines id="team-title" text={t.title} className="display display--lg" />
        </div>
        <p className="lead max-w-[38ch]" data-reveal style={{ ["--d" as string]: "200ms" }}>
          {t.subtitle}
        </p>
      </div>
      <div className="team__grid">
        {team.map((m, i) => (
          <MemberCard key={m.id} m={m} dict={dict} index={i} />
        ))}
      </div>
    </section>
  );
}
