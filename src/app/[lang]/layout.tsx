import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "../globals.css";
import { getDictionary } from "@/content";
import { SITE_URL, images, isLocale, locales } from "@/content/site";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/MotionProvider";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: "#1e140c",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: d.meta.title,
    description: d.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      type: "website",
      siteName: "Orígenes Coffee",
      title: d.meta.title,
      description: d.meta.description,
      locale: lang === "es" ? "es_CO" : "en_US",
      images: [{ url: images.landscape, width: 2528, height: 1696, alt: "Orígenes Coffee" }],
    },
    twitter: { card: "summary_large_image", title: d.meta.title, description: d.meta.description, images: [images.landscape] },
  };
}

export default async function LangLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Orígenes Coffee",
    url: `${SITE_URL}/${lang}`,
    logo: `${SITE_URL}${images.logo}`,
    foundingDate: "2017",
    description: dict.meta.description,
  };

  return (
    <html lang={lang} className={`${display.variable} ${sans.variable} no-js`}>
      <body>
        <a className="skip-link" href="#contenido">
          {dict.a11y.skip}
        </a>
        <Header dict={dict} locale={lang} />
        {children}
        <WhatsAppFloat dict={dict} />
        <MotionProvider />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
