# Orígenes Coffee — Sitio web

Sitio institucional bilingüe (ES/EN) de Orígenes Coffee.
Stack: **Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · GSAP (ScrollTrigger)**.

## Puesta en marcha

```bash
npm install
npm run dev        # desarrollo → http://localhost:3000 (redirige a /es)


npm run build      # build de producción
npm start          # servir el build
```


## Ejecutar en desarrollo

```bash
npm run dev
```

Copie `.env.example` a `.env.local` y complete las variables (ver abajo).

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Textos en español | `src/content/es.ts` |
| Textos en inglés (misma estructura) | `src/content/en.ts` |
| Equipo, contactos, teléfonos, redes, WhatsApp, imágenes | `src/content/site.ts` |
| Estilos y sistema visual (colores, tipografía, secciones) | `src/app/globals.css` |
| Fotografías | `public/images/` |

Los títulos usan `\n` para marcar los cortes de línea de la composición.

## Cómo cambiar las fotos

**Opción fácil:** pon la foto nueva en `public/images/` con **el mismo nombre** que la anterior. No hay que tocar código.

**Opción con nombre nuevo:**
1. Copia la foto en `public/images/` (o en una subcarpeta).
2. Abre `src/content/site.ts` y cambia la ruta en la sección que corresponda:

| Qué foto | Dónde, en `site.ts` |
|---|---|
| Hero (recorrido inicial) | `images` |
| Tarjetas de países | `countryImages` |
| Alquimia | `elementImages` |
| Portafolio (Caturra, Catuaí, Geisha) | `varietyImages` |
| Equipo (página Experiencia) | campo `photo` de cada persona en `team` |

Ejemplo para el equipo (hoy sin foto: `photo: null`):

```ts
photo: "/images/equipo/nombre_perfil.jpg",
```

⚠️ La ruta empieza en `/images/...` (**sin** `public`) y el nombre del archivo debe ir **sin espacios** (usa guiones: `erika-ortiz.png`). Las fotos del equipo se ven mejor verticales, con la cara centrada.
Después de cambiar fotos, recarga la página (en producción, vuelve a ejecutar `npm run build`).

## Integraciones

### Formulario comercial → correo (Resend)
`src/app/api/contact/route.ts` valida la solicitud y la envía por correo con la API de [Resend](https://resend.com).

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=comercial@dominio.com          # admite varios separados por coma
CONTACT_FROM_EMAIL="Orígenes Coffee <web@dominio.com>"   # remitente verificado en Resend
```

**Mientras no existan estas variables, la API responde 503 y el formulario informa al usuario que el envío en línea aún no está habilitado, invitándolo a escribir por WhatsApp. No se simula ningún envío.**

### WhatsApp
- `NEXT_PUBLIC_WHATSAPP_NUMBER` = número corporativo internacional sin `+` (p. ej. `573001234567`).
- El botón flotante abre directamente WhatsApp con el mensaje «Hola, quisiera conocer más sobre Orígenes Coffee» (editable en `whatsapp.message` de `es.ts` / `en.ts`).
- Si `NEXT_PUBLIC_WHATSAPP_NUMBER` está vacío, abre el chat de la Directora Comercial (Erika Ortiz Guarín). Para cambiar la persona, editar `WHATSAPP_FALLBACK_MEMBER` en `src/content/site.ts`.

### SEO
- `NEXT_PUBLIC_SITE_URL` = dominio definitivo. Se usa en canonical, hreflang, Open Graph, sitemap y robots.

## Información pendiente (no se inventó nada)

Completar en `src/content/site.ts` cuando la casa matriz la confirme:

- [ ] **Gerente**: nombre, foto, país, contacto.
- [ ] **Director técnico**: nombre, foto, país, contacto.
- [ ] **Fotos profesionales** de Erika Ortiz Guarín y Diego Portilla (hoy muestran iniciales).
- [ ] **Correos** del equipo (opcional).
- [ ] **Redes sociales** (`socialLinks`).
- [ ] **Número corporativo de WhatsApp**.
- [ ] **Orígenes disponibles por variedad** para Caturra y Catuaí (hoy: "a consultar"). Geisha muestra Panamá — Boquete, según el brief.
- [ ] **Fotografía propia** por país y por variedad. Hoy se reutilizan provisionalmente las fotos disponibles (ver `countryImages`, `varietyImages`).
- [ ] **Fotos autorizadas de Alquimia** (Nariño, Boquete, Chocó Andino, Cauca). Hoy se usan fotos provisionales de Unsplash (licencia gratuita, uso comercial permitido, sin atribución obligatoria) en `public/images/alquimia/`: fuego → unsplash.com/photos/IzsVq4gwQO4 (provincia de Cotopaxi, Ecuador), agua → unsplash.com/photos/TWrKDYt-vVM, tierra → unsplash.com/photos/Fu6cRM5L6p8 (colibrí, Mindo, Chocó Andino), aire → unsplash.com/photos/M7JWrcfo67k (Sierra Nevada, Colombia). Ninguna fue tomada en el territorio exacto; reemplazar al tener las propias.
- [ ] Confirmar «Cauca» o «Centro Cauca» para el elemento Aire (pendiente en el catálogo).
- [ ] Revisar el texto de autorización de datos del formulario con asesoría legal y enlazar la política de tratamiento de datos cuando exista.

## Notas técnicas

- `/` redirige a `/es`. Todas las rutas se generan estáticamente en ambos idiomas.
- **Estructura multipágina:**

  | Ruta | Contenido |
  |---|---|
  | `/es` | Hero + Orígenes (`#origenes`) + Portafolio (`#portafolio`) + cierre |
  | `/es/nosotros` | Quiénes somos + Misión y visión (`#mision`) + El café empieza con su gente |
  | `/es/experiencia` | Equipo / grupo económico |
  | `/es/alquimia` | Alquimia |
  | `/es/contacto` | Contacto comercial (admite `?origen=` y `?variedad=` para preseleccionar el formulario) |

- Header transparente, sin logo ni menú hamburguesa, alineado a la derecha. En el inicio solo se ve ES / EN al cargar; la navegación aparece al empezar a desplazarse. En móvil es una fila horizontal deslizable.
- «Pida su muestra» está al final del Portafolio (`navCta` en `es.ts` / `en.ts`).
- **Alquimia** (`src/components/Alquimia.tsx`): escena fija a pantalla completa; cada tramo de scroll cambia de elemento. Al avanzar, la tarjeta siguiente se expande hasta convertirse en el fondo; al retroceder, el fondo se recoge en su tarjeta. Flechas y tarjetas desplazan la página al tramo correspondiente. Textos (capítulo, lema, descripción, rol en la colección) tomados de las láminas del catálogo Alquimia, en `alquimia.elements`.
- El selector ES/EN conserva la página y la sección actuales.
- Footer con efecto de cristal (glassmorphism) sobre fotografía: `src/components/Footer.tsx`.
- Movimiento: hero con secuencia controlada por scroll (GSAP ScrollTrigger); revelados, parallax, botones magnéticos y contadores declarados con atributos `data-*` (`src/components/MotionProvider.tsx`).
- Con `prefers-reduced-motion`, el hero pasa a fundidos simples y se desactivan parallax, zoom y animaciones.
- Se usa el cursor predeterminado del sistema.
- No se usan Framer Motion ni Lenis: GSAP + CSS cubren las microinteracciones y el scroll nativo preserva la accesibilidad.
- El mapa (`src/lib/latam-map.ts`) se generó desde Natural Earth (dominio público) con `world-atlas`; es un SVG estático sin dependencias en tiempo de ejecución.
- El sitio estático anterior (`index.html`, `styles.css`, `script.js`, `assets/`) se conserva intacto en la raíz; las imágenes se copiaron a `public/images/`.
