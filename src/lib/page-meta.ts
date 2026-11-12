import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { isLocale, type PageSlug } from "@/content/site";

/** Metadatos (título, descripción, canonical y hreflang) de cada página interna. */
export async function pageMetadata(params: Promise<{ lang: string }>, slug: PageSlug): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDictionary(lang);
  const label = d.nav.find((n) => n.href === slug)?.label ?? slug;
  const description = {
    nosotros: d.about.lead,
    experiencia: d.team.subtitle,
    alquimia: d.alquimia.text,
    contacto: d.contact.text,
  }[slug];
  const title = `${label} — Orígenes Coffee`;
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/${slug}`,
      languages: { es: `/es/${slug}`, en: `/en/${slug}`, "x-default": `/es/${slug}` },
    },
    openGraph: { title, description },
  };
}
