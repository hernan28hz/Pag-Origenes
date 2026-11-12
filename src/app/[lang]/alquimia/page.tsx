import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale } from "@/content/site";
import { pageMetadata } from "@/lib/page-meta";
import { Footer } from "@/components/Footer";
import { Alquimia } from "@/components/Alquimia";

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata(params, "alquimia");
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <main id="contenido">
        <Alquimia dict={dict} locale={lang} />
      </main>
      <Footer dict={dict} locale={lang} standalone />
    </>
  );
}
