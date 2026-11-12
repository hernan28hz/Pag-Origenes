import type { MetadataRoute } from "next";
import { SITE_URL, locales, pageSlugs } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...pageSlugs.map((s) => `/${s}`)];
  return locales.flatMap((lang) =>
    paths.map((path) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path ? 0.8 : lang === "es" ? 1 : 0.9,
      alternates: { languages: { es: `${SITE_URL}/es${path}`, en: `${SITE_URL}/en${path}` } },
    })),
  );
}
