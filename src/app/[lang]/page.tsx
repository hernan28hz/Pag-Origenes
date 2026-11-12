import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale } from "@/content/site";
import { Hero } from "@/components/Hero";
import { Presence } from "@/components/Presence";
import { Portfolio } from "@/components/Portfolio";
import { Closing } from "@/components/Closing";

/** Inicio: Hero + Orígenes + Portafolio. El resto del contenido vive en páginas propias. */
export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <main id="contenido">
        <Hero dict={dict} />
        <Presence dict={dict} />
        <Portfolio dict={dict} locale={lang} />
      </main>
      <Closing dict={dict} locale={lang} />
    </>
  );
}
