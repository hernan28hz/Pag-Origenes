import Image from "next/image";
import type { Dictionary } from "@/content";
import { images, type Locale } from "@/content/site";
import { SplitLines } from "./SplitLines";
import { Footer } from "./Footer";

/** Frase de cierre del inicio; el footer de cristal flota sobre la misma fotografía. */
export function Closing({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { closing } = dict;
  return (
    <section className="closing" data-header="dark" aria-labelledby="closing-title">
      <div className="media" data-parallax="0.12">
        <Image className="media__img" src={images.cup} alt="" fill sizes="100vw" style={{ objectPosition: "50% 55%" }} />
      </div>
      <div className="closing__copy">
        <Image
          src={images.mark}
          alt=""
          width={56}
          height={62}
          className="closing__mark"
          style={{ filter: "brightness(0) invert(78%) sepia(30%) saturate(500%) hue-rotate(350deg)" }}
        />
        <SplitLines id="closing-title" text={closing.phrase} className="display closing__phrase" />
        <p className="closing__translation" data-reveal style={{ ["--d" as string]: "400ms" }}>
          {closing.translation}
        </p>
      </div>
      <div className="closing__footer">
        <Footer dict={dict} locale={locale} />
      </div>
    </section>
  );
}
