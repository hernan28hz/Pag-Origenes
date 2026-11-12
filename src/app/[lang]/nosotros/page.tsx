import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale } from "@/content/site";
import { pageMetadata } from "@/lib/page-meta";
import { Footer } from "@/components/Footer";
import { About } from "@/components/About";
import { MissionVision } from "@/components/MissionVision";
import { People } from "@/components/People";

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata(params, "nosotros");
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <main id="contenido">
        <About dict={dict} locale={lang} />
        <MissionVision dict={dict} />
        <People dict={dict} />
      </main>
      <Footer dict={dict} locale={lang} standalone />
    </>
  );
}
