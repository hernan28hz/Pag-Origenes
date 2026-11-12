/**
 * DATOS EDITABLES DEL SITIO
 * ─────────────────────────────────────────────────────────────────────
 * Todo lo que es información corporativa (contactos, equipo, redes,
 * imágenes) vive aquí. Los textos traducibles viven en es.ts / en.ts.
 *
 * Regla: lo que está en `null` es información PENDIENTE de casa matriz.
 * El sitio la muestra como "por confirmar" sin inventar nada.
 */

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Dominio definitivo (para SEO / Open Graph). */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/**
 * WhatsApp corporativo.
 * Número internacional sin "+" ni espacios. Mientras sea null, el botón
 * flotante ofrece hablar directamente con los contactos comerciales.
 */
export const CORPORATE_WHATSAPP: string | null =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || null;

/**
 * Páginas independientes del sitio (además del inicio).
 * El inicio contiene Hero + Orígenes + Portafolio.
 */
export const pageSlugs = ["nosotros", "experiencia", "alquimia", "contacto"] as const;
export type PageSlug = (typeof pageSlugs)[number];

/**
 * Convierte un href del diccionario en una ruta del idioma:
 *  ""            → /es
 *  "#origenes"   → /es#origenes   (sección del inicio)
 *  "nosotros"    → /es/nosotros
 */
export function localHref(locale: Locale, href: string) {
  if (!href) return `/${locale}`;
  if (href.startsWith("#")) return `/${locale}${href}`;
  return `/${locale}/${href}`;
}

export function waLink(number: string, message?: string) {
  const base = `https://wa.me/${number.replace(/\D/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export type CountryKey = "colombia" | "ecuador" | "panama";

export type TeamMember = {
  id: string;
  /** Clave del cargo en el diccionario (team.roles). */
  roleKey: "manager" | "technical" | "commercial" | "operations";
  name: string | null;
  photo: string | null;
  country: CountryKey | null;
  /** Teléfono en formato visible. */
  phoneDisplay: string | null;
  /** Teléfono internacional sin "+" (para tel: y wa.me). */
  phone: string | null;
  email: string | null;
};

/** Grupo económico / equipo. Completar los campos null cuando se confirmen. */
export const team: TeamMember[] = [
  {
    id: "gerente",
    roleKey: "manager",
    name: null,
    photo: null,
    country: null,
    phoneDisplay: null,
    phone: null,
    email: null,
  },
  {
    id: "director-tecnico",
    roleKey: "technical",
    name: null,
    photo: null,
    country: null,
    phoneDisplay: null,
    phone: null,
    email: null,
  },
  {
    id: "directora-comercial",
    roleKey: "commercial",
    name: "Erika Ortiz Guarín",
    photo: "/images/equipo/erika-ortiz.png",
    country: "panama",
    phoneDisplay: "+507 6586 6357",
    phone: "50765866357",
    email: null,
  },
  {
    id: "director-operaciones",
    roleKey: "operations",
    name: "Diego Portilla",
    photo: "/images/equipo/diego-portilla.png",
    country: "colombia",
    phoneDisplay: "+57 314 813 4166",
    phone: "573148134166",
    email: null,
  },
];

/** Contactos comerciales visibles en la sección de contacto y en WhatsApp. */
export const commercialContacts = ["director-operaciones", "directora-comercial"]
  .map((id) => team.find((m) => m.id === id)!)
  .filter(Boolean);

/**
 * Número que abre el botón flotante de WhatsApp.
 * Usa el corporativo (NEXT_PUBLIC_WHATSAPP_NUMBER) si existe; mientras
 * tanto, el de la Directora Comercial. Cambiar el id si debe ser otra persona.
 */
const WHATSAPP_FALLBACK_MEMBER = "directora-comercial";
export const WHATSAPP_NUMBER: string | null =
  CORPORATE_WHATSAPP ?? team.find((m) => m.id === WHATSAPP_FALLBACK_MEMBER)?.phone ?? null;

/**
 * Redes sociales: pendientes de información de casa matriz.
 * Formato: { label: "Instagram", href: "https://instagram.com/..." }
 */
export const socialLinks: { label: string; href: string }[] = [];

/**
 * Imágenes. Varias se reutilizan de forma provisional (solo hay 7
 * fotografías disponibles). Reemplazar por fotografía propia de cada
 * país, territorio y variedad en cuanto exista.
 */
export const images = {
  landscape: "/images/montana-cafe.jpg",
  crops: "/images/fruta-cafe.jpg",
  cherries: "/images/cosecha-cafe.jpg",
  producer: "/images/cosecha2.jpg",
  preparation: "/images/preparacion-cafe.jpg",
  cup: "/images/taza-cafe.jpg",
  bar: "/images/bar-cafe.jpg",
  logo: "/images/logo-origenes.png",
  mark: "/images/logo-icono.png",
} as const;

export const countryImages: Record<CountryKey, string> = {
  colombia: images.landscape,
  ecuador: images.crops,
  panama: images.producer,
};

/**
 * Fotografías de Alquimia (provisionales, licencia Unsplash — ver README).
 * Reemplazar por las fotos autorizadas de cada territorio cuando existan.
 */
export const elementImages = {
  fire: "/images/alquimia/fuego.jpg",
  water: "/images/alquimia/agua.jpg",
  earth: "/images/alquimia/tierra.jpg",
  air: "/images/alquimia/aire.jpg",
} as const;

export const varietyImages = {
  caturra: images.cherries,
  catuai: images.producer,
  geisha: images.preparation,
} as const;
