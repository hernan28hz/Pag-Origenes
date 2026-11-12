/**
 * TEXTOS EN ESPAÑOL — fuente de verdad del contenido.
 * en.ts debe tener exactamente la misma estructura.
 * Saltos de línea (\n) en títulos = cortes de línea en la composición.
 */
export const es = {
  meta: {
    title: "Orígenes Coffee — Tres países. Distintas expresiones del café.",
    description:
      "Desde la siembra hasta la comercialización, conectamos territorios, productores y compradores a través del café. Colombia, Ecuador y Panamá.",
  },
  a11y: {
    skip: "Saltar al contenido",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    home: "Orígenes Coffee, inicio",
    language: "Idioma",
    switchTo: "Ver en inglés",
  },
  nav: [
    { href: "", label: "Inicio" },
    { href: "nosotros", label: "Nosotros" },
    { href: "experiencia", label: "Experiencia" },
    { href: "alquimia", label: "Alquimia" },
    { href: "contacto", label: "Contacto" },
  ],
  navCta: "Pida su muestra",

  hero: {
    title: "Tres países.\nDistintas expresiones\ndel café.",
    subtitle:
      "Desde la siembra hasta la comercialización, conectamos territorios, productores y compradores a través del café.",
    scroll: "Desliza para recorrer el origen",
    chapters: [
      { label: "El territorio", title: "" , text: "" },
      { label: "El cultivo", title: "Entre montañas\ny neblina", text: "Crece en laderas de altura, donde el paisaje empieza a definir la taza." },
      { label: "El fruto", title: "La cosecha empieza\nen las manos", text: "Cada cereza pasa por las manos de quienes cultivan la tierra." },
      { label: "La selección", title: "Selección\ny preparación", text: "El oficio que cuida el carácter de cada café antes de viajar." },
      { label: "La taza", title: "Hasta la taza\nde cada comprador", text: "El recorrido termina donde empieza una nueva relación." },
    ],
  },

  about: {
    index: "01 — Nosotros",
    title: "Una operación\nque va de la siembra\na la comercialización.",
    lead: "Casa matriz en Colombia, con operaciones en Nariño y Cauca, y sucursales en Ecuador y Panamá.",
    markets: {
      label: "Atendemos a compradores en",
      list: ["Colombia", "Estados Unidos", "Europa", "Países Bajos"],
    },
    chain: ["Siembra", "Selección", "Comercialización"],
    stats: [
      { value: 3, label: "Países de operación" },
      { value: 2, label: "Regiones en Colombia: Nariño y Cauca" },
      { value: 2017, from: 2000, label: "Desde" },
    ],
    countries: [
      { key: "colombia", name: "Colombia", role: "Casa matriz" },
      { key: "ecuador", name: "Ecuador", role: "Sucursal" },
      { key: "panama", name: "Panamá", role: "Sucursal" },
    ],
    captions: {
      landscape: "Paisaje cafetero",
      producer: "Productores",
      selection: "Selección",
      specialty: "Café de especialidad",
    },
  },

  mission: {
    index: "02 — Misión y visión",
    missionLabel: "Misión",
    mission: [
      "Desde la siembra hasta la comercialización, trabajamos para que en la taza se reconozca el carácter de nuestros cafés de Nariño, Cauca, Ecuador y Panamá.",
      "La primera muestra es el inicio de nuestra relación con cada comprador. A partir de esa cata, lo ayudamos a elegir un café que sus clientes puedan servir con confianza y que, por su sabor, invite a pedir otra taza.",
    ],
    visionLabel: "Visión",
    visionYear: "2030",
    vision: [
      "Para 2030, seremos un referente del café latinoamericano en el mundo.",
      "Que tostadores, importadores y distribuidores recuerden a Orígenes Coffee por la fineza de sus aromas, el cuerpo en boca y el sabor que perdura. Y que vuelvan por nuestro sello: la responsabilidad y la cercanía con que los acompañamos, desde el pedido hasta después de la entrega.",
      "Si nuestro café gana un lugar en el mundo, las familias que lo cultivan tendrán más oportunidades de vivir mejor de su tierra.",
    ],
  },

  people: {
    index: "03 — Comunidad",
    title: "El café empieza\ncon su gente.",
    text: "Los productores y las comunidades cafeteras forman parte de nuestra identidad. Nuestro compromiso es contribuir al desarrollo social y cultural de los territorios cafeteros, con especial arraigo en Nariño.",
    pillars: [
      { title: "Productores", text: "Quienes cultivan, cuidan y cosechan cada lote." },
      { title: "Familias", text: "El oficio cafetero se vive y se aprende en casa." },
      { title: "Comunidades", text: "Territorios que se organizan alrededor del café." },
      { title: "Tradición", text: "Conocimiento que pasa de una generación a la siguiente." },
    ],
    quote: "Con especial arraigo en Nariño.",
  },

  team: {
    index: "04 — Experiencia",
    title: "Experiencia que\nconecta orígenes.",
    subtitle: "Un equipo que acompaña cada etapa del proceso, desde el origen hasta el comprador.",
    roles: {
      manager: "Gerente",
      technical: "Director técnico",
      commercial: "Directora comercial",
      operations: "Director de operaciones",
    },
    pendingName: "Nombre por confirmar",
    pendingPhoto: "Fotografía pendiente",
    pendingInfo: "Información pendiente de casa matriz.",
    country: "País",
    contact: "Contacto",
    whatsapp: "Escribir por WhatsApp",
    call: "Llamar",
    more: "Ver perfil",
    less: "Cerrar perfil",
  },

  presence: {
    index: "05 — Orígenes",
    title: "Tres países.\nUna misma pasión\npor el café.",
    hint: "Seleccione un país en el mapa",
    territoriesLabel: "Territorios",
    countries: {
      colombia: {
        name: "Colombia",
        role: "Casa matriz",
        description: "Casa matriz. Operaciones en Nariño y Cauca.",
        territories: ["Nariño", "Cauca"],
      },
      ecuador: {
        name: "Ecuador",
        role: "Sucursal",
        description: "Sucursal y operaciones cafeteras.",
        territories: ["Chocó Andino"],
      },
      panama: {
        name: "Panamá",
        role: "Sucursal",
        description: "Sucursal y operaciones cafeteras.",
        territories: ["Boquete"],
      },
    },
  },

  alquimia: {
    index: "06 — Alquimia",
    brand: "Alquimia",
    title: "Cuatro elementos.\nCuatro territorios.",
    text: "Alquimia reúne una selección de cafés de especialidad de Colombia, Ecuador y Panamá. El fuego, el agua, la tierra y el aire nos guían por los paisajes donde nacen estos cafés, desde los volcanes de Nariño hasta el bosque nublado del Chocó Andino.",
    cta: "Consultar este origen",
    chapter: "Capítulo",
    roleLabel: "Rol en la colección",
    prev: "Elemento anterior",
    next: "Elemento siguiente",
    view: "Ver",
    scrollHint: "Desliza para recorrer los elementos",
    elements: [
      {
        key: "fire", name: "Fuego", place: "Nariño", country: "Colombia", text: "Volcanes y montañas del sur andino.", origin: "colombia-narino",
        tagline: "Donde los volcanes duermen",
        body: [
          "Nariño se levanta entre volcanes andinos que hoy descansan, pero nunca dejan de trabajar. Su fuego vive bajo tierra: en suelos minerales, en la altura y en el contraste entre días cálidos y noches frías, que concentra dulzor y estructura en el grano.",
          "Es una tierra de fuerte identidad cultural, donde el café se cultiva en comunidad, en fincas, de generación en generación.",
        ],
        role: "Ignición", roleText: "El primer capítulo convierte la fuerza mineral del territorio en sabor.",
      },
      {
        key: "water", name: "Agua", place: "Boquete", country: "Panamá", text: "Neblina de tierras altas y Geisha panameño.", origin: "panama-boquete",
        tagline: "Donde la vida fluye",
        body: [
          "En las faldas del volcán Barú, la humedad del Pacífico y la del Caribe se encuentran sobre un mismo territorio. Lluvia, neblina y altura crean microclimas capaces de producir algunos de los cafés más reconocidos del planeta.",
          "Aquí el agua no solo riega: define la claridad y la dulzura de lo que llega a la taza.",
        ],
        role: "Conexión", roleText: "Panamá, país anfitrión, recibe la colección y la conecta con el mundo.",
      },
      {
        key: "earth", name: "Tierra", place: "Chocó Andino", country: "Ecuador", text: "Cafés del bosque nublado.", origin: "ecuador-choco",
        tagline: "Donde las raíces conectan",
        body: [
          "A pocas horas de Quito, el Chocó Andino es reserva de biosfera de la UNESCO y uno de los territorios más biodiversos del planeta. El café crece aquí bajo bosque nublado, junto al cacao y a especies que no existen en ningún otro lugar.",
          "Son sistemas agroforestales que protegen el bosque y la memoria de quienes lo han trabajado.",
        ],
        role: "Memoria", roleText: "El capítulo de la raíz, con profundidad ecológica y cultural.",
      },
      {
        key: "air", name: "Aire", place: "Cauca", country: "Colombia", text: "Montañas y aire fresco de altura.", origin: "colombia-cauca",
        tagline: "Donde lo diferente encuentra sentido",
        body: [
          "En las montañas de Colombia, el aire fresco y las corrientes de altura marcan el ritmo de cada cosecha.",
          "Aire es el elemento invisible que une a los otros tres, y el que deja la colección abierta a nuevas ediciones y nuevos territorios.",
        ],
        role: "Apertura", roleText: "El capítulo que cierra el ciclo y lo expande hacia lo que viene.",
      },
    ],
  },

  portfolio: {
    index: "07 — Portafolio",
    title: "Una variedad,\ndistintos orígenes.",
    text: "Caturra, Catuaí y Geisha forman parte de nuestro portafolio en Colombia, Ecuador y Panamá. Consulte los lotes disponibles según el origen y el perfil de taza que busca.",
    originsLabel: "Orígenes",
    originsPending: "Disponibilidad por origen: a consultar",
    cta: "Consultar disponibilidad",
    varieties: [
      {
        key: "caturra",
        name: "Caturra",
        origins: null as string[] | null,
        description: "Mutación natural del Bourbon, de porte bajo. Una de las variedades de arábica más cultivadas en Latinoamérica.",
      },
      {
        key: "catuai",
        name: "Catuaí",
        origins: null as string[] | null,
        description: "Cruce entre Mundo Novo y Caturra, desarrollado en Brasil a mediados del siglo XX.",
      },
      {
        key: "geisha",
        name: "Geisha",
        origins: ["Panamá — Boquete"] as string[] | null,
        description: "Variedad de origen etíope que alcanzó reconocimiento internacional en las tierras altas de Panamá.",
      },
    ],
  },

  contact: {
    index: "08 — Contacto comercial",
    title: "Encontraremos\nel café que busca.",
    text: "Cuéntenos qué origen, variedad o perfil de taza le interesa y el volumen que necesita. Nuestro equipo comercial lo orienta sobre disponibilidad, muestras y cotizaciones.",
    contactsTitle: "Contactos comerciales",
    socialPending: "Redes sociales: pendientes de información de casa matriz.",
    form: {
      name: "Nombre",
      company: "Empresa",
      country: "País",
      email: "Correo electrónico",
      phone: "Teléfono",
      origin: "Origen de interés",
      variety: "Variedad de café",
      volume: "Volumen requerido",
      volumeHint: "Ej.: número de sacos o kilogramos",
      message: "Mensaje",
      optional: "opcional",
      consent: "Autorizo el uso de mis datos para responder a esta solicitud.",
      submit: "Pida su muestra",
      sending: "Enviando…",
      noPreference: "Sin preferencia",
      origins: [
        { value: "colombia-narino", label: "Colombia — Nariño" },
        { value: "colombia-cauca", label: "Colombia — Cauca" },
        { value: "ecuador-choco", label: "Ecuador — Chocó Andino" },
        { value: "panama-boquete", label: "Panamá — Boquete" },
      ],
      varieties: [
        { value: "caturra", label: "Caturra" },
        { value: "catuai", label: "Catuaí" },
        { value: "geisha", label: "Geisha" },
      ],
      errors: {
        required: "Este campo es obligatorio.",
        email: "Ingrese un correo electrónico válido.",
        consent: "Necesitamos su autorización para responderle.",
        summary: "Revise los campos marcados.",
      },
      success: {
        title: "Solicitud recibida.",
        text: "Gracias. Nuestro equipo comercial revisará su solicitud y le escribirá para coordinar muestras y cotización.",
        again: "Enviar otra solicitud",
      },
      failure: {
        notConfigured:
          "El envío en línea aún no está habilitado. Mientras tanto, escríbanos por WhatsApp a uno de nuestros contactos comerciales.",
        generic: "No pudimos enviar su solicitud. Inténtelo de nuevo o escríbanos por WhatsApp.",
      },
    },
  },

  closing: {
    phrase: "Orígenes que se sienten\nen cada taza.",
    translation: "Origins you can taste in every cup.",
  },

  footer: {
    navTitle: "Navegación",
    nav: [
      { href: "nosotros", label: "Quiénes somos" },
      { href: "nosotros#mision", label: "Misión y visión" },
      { href: "experiencia", label: "Experiencia" },
      { href: "#origenes", label: "Países y sedes" },
      { href: "alquimia", label: "Alquimia" },
      { href: "contacto", label: "Contacto" },
    ],
    corporateTitle: "Orígenes Coffee",
    corporate: ["Casa matriz en Colombia", "Sucursales en Ecuador y Panamá", "Desde 2017"],
    socialTitle: "Redes sociales",
    socialPending: "Próximamente",
    whatsappTitle: "WhatsApp",
    whatsapp: "Hablemos de café",
    rights: "Todos los derechos reservados.",
    top: "Volver arriba",
  },

  whatsapp: {
    bubble: "¿Hablamos de café?",
    open: "Abrir WhatsApp",
    close: "Cerrar",
    chooseTitle: "Hable con nuestro equipo comercial",
    message: "Hola, quisiera conocer más sobre Orígenes Coffee.",
  },

  countryNames: { colombia: "Colombia", ecuador: "Ecuador", panama: "Panamá" },
};

export type Dictionary = typeof es;
