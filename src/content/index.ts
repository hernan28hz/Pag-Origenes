import { es, type Dictionary } from "./es";
import { en } from "./en";
import type { Locale } from "./site";

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
