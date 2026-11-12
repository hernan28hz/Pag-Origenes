import type { Dictionary } from "./es";

/** ENGLISH COPY — same structure as es.ts. */
export const en: Dictionary = {
  meta: {
    title: "Orígenes Coffee — Three countries. Distinct expressions of coffee.",
    description:
      "From planting to market, we connect regions, growers and buyers through coffee. Colombia, Ecuador and Panama.",
  },
  a11y: {
    skip: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Orígenes Coffee, home",
    language: "Language",
    switchTo: "View in Spanish",
  },
  nav: [
    { href: "", label: "Home" },
    { href: "nosotros", label: "About" },
    { href: "experiencia", label: "Team" },
    { href: "alquimia", label: "Alquimia" },
    { href: "contacto", label: "Contact" },
  ],
  navCta: "Request a sample",

  hero: {
    title: "Three countries.\nDistinct expressions\nof coffee.",
    subtitle: "From planting to market, we connect regions, growers and buyers through coffee.",
    scroll: "Scroll to travel to the origin",
    chapters: [
      { label: "The land", title: "", text: "" },
      { label: "The farm", title: "Between mountains\nand mist", text: "It grows on high slopes, where the landscape begins to shape the cup." },
      { label: "The cherry", title: "The harvest begins\nin the hands", text: "Every cherry passes through the hands of those who work the land." },
      { label: "The selection", title: "Selection\nand preparation", text: "The craft that protects each coffee's character before it travels." },
      { label: "The cup", title: "All the way to\nevery buyer's cup", text: "The journey ends where a new relationship begins." },
    ],
  },

  about: {
    index: "01 — About us",
    title: "From planting\nto market,\none operation.",
    lead: "Headquartered in Colombia, with operations in Nariño and Cauca, and branches in Ecuador and Panama.",
    markets: {
      label: "We serve buyers in",
      list: ["Colombia", "the United States", "Europe", "the Netherlands"],
    },
    chain: ["Planting", "Selection", "Trade"],
    stats: [
      { value: 3, label: "Countries of operation" },
      { value: 2, label: "Regions in Colombia: Nariño and Cauca" },
      { value: 2017, from: 2000, label: "Since" },
    ],
    countries: [
      { key: "colombia", name: "Colombia", role: "Headquarters" },
      { key: "ecuador", name: "Ecuador", role: "Branch" },
      { key: "panama", name: "Panama", role: "Branch" },
    ],
    captions: {
      landscape: "Coffee landscape",
      producer: "Growers",
      selection: "Selection",
      specialty: "Specialty coffee",
    },
  },

  mission: {
    index: "02 — Mission & vision",
    missionLabel: "Mission",
    mission: [
      "From planting to market, we work so that the character of our coffees from Nariño, Cauca, Ecuador and Panama comes through in the cup.",
      "The first sample is where our relationship with every buyer begins. From that cupping, we help them choose a coffee their customers can serve with confidence — one whose flavor makes them want another cup.",
    ],
    visionLabel: "Vision",
    visionYear: "2030",
    vision: [
      "By 2030, we will be a benchmark for Latin American coffee around the world.",
      "We want roasters, importers and distributors to remember Orígenes Coffee for the finesse of its aromas, its body and its lingering flavor. And to come back for what defines us: the responsibility and closeness with which we support them, from the first order to well after delivery.",
      "If our coffee earns its place in the world, the families who grow it will have more opportunities to make a better living from their land.",
    ],
  },

  people: {
    index: "03 — Community",
    title: "Coffee begins\nwith its people.",
    text: "Growers and coffee communities are part of who we are. We are committed to the social and cultural development of coffee-growing regions, with especially deep roots in Nariño.",
    pillars: [
      { title: "Growers", text: "The people who cultivate, tend and harvest every lot." },
      { title: "Families", text: "The craft of coffee is lived and learned at home." },
      { title: "Communities", text: "Regions that organize their life around coffee." },
      { title: "Tradition", text: "Knowledge handed down from one generation to the next." },
    ],
    quote: "With especially deep roots in Nariño.",
  },

  team: {
    index: "04 — Experience",
    title: "Experience that\nconnects origins.",
    subtitle: "A team that supports every stage of the process, from origin to buyer.",
    roles: {
      manager: "General Manager",
      technical: "Technical Director",
      commercial: "Commercial Director",
      operations: "Operations Director",
    },
    pendingName: "Name to be confirmed",
    pendingPhoto: "Photo coming soon",
    pendingInfo: "Details pending from headquarters.",
    country: "Country",
    contact: "Contact",
    whatsapp: "Message on WhatsApp",
    call: "Call",
    more: "View profile",
    less: "Close profile",
  },

  presence: {
    index: "05 — Origins",
    title: "Three countries.\nOne shared passion\nfor coffee.",
    hint: "Select a country on the map",
    territoriesLabel: "Regions",
    countries: {
      colombia: {
        name: "Colombia",
        role: "Headquarters",
        description: "Headquarters. Operations in Nariño and Cauca.",
        territories: ["Nariño", "Cauca"],
      },
      ecuador: {
        name: "Ecuador",
        role: "Branch",
        description: "Branch office and coffee operations.",
        territories: ["Chocó Andino"],
      },
      panama: {
        name: "Panama",
        role: "Branch",
        description: "Branch office and coffee operations.",
        territories: ["Boquete"],
      },
    },
  },

  alquimia: {
    index: "06 — Alquimia",
    brand: "Alquimia",
    title: "Four elements.\nFour territories.",
    text: "Alquimia brings together a selection of specialty coffees from Colombia, Ecuador and Panama. Fire, water, earth and air guide us through the landscapes where these coffees are born — from the volcanoes of Nariño to the cloud forest of the Chocó Andino.",
    cta: "Ask about this origin",
    chapter: "Chapter",
    roleLabel: "Role in the collection",
    prev: "Previous element",
    next: "Next element",
    view: "View",
    scrollHint: "Scroll to explore the elements",
    elements: [
      {
        key: "fire", name: "Fire", place: "Nariño", country: "Colombia", text: "Volcanoes and mountains of the southern Andes.", origin: "colombia-narino",
        tagline: "Where the volcanoes sleep",
        body: [
          "Nariño rises among Andean volcanoes that rest today but never stop working. Its fire lives underground: in mineral soils, in altitude and in the contrast between warm days and cold nights, which concentrates sweetness and structure in the bean.",
          "It is a land with a strong cultural identity, where coffee is grown in community, on family farms, from generation to generation.",
        ],
        role: "Ignition", roleText: "The first chapter turns the mineral strength of the territory into flavor.",
      },
      {
        key: "water", name: "Water", place: "Boquete", country: "Panama", text: "Highland mist and Panamanian Geisha.", origin: "panama-boquete",
        tagline: "Where life flows",
        body: [
          "On the slopes of the Barú volcano, moisture from the Pacific and the Caribbean meets over a single territory. Rain, mist and altitude create microclimates capable of producing some of the most renowned coffees on the planet.",
          "Here water does more than irrigate: it defines the clarity and sweetness of what reaches the cup.",
        ],
        role: "Connection", roleText: "Panama, the host country, welcomes the collection and connects it with the world.",
      },
      {
        key: "earth", name: "Earth", place: "Chocó Andino", country: "Ecuador", text: "Coffees from the cloud forest.", origin: "ecuador-choco",
        tagline: "Where roots connect",
        body: [
          "A few hours from Quito, the Chocó Andino is a UNESCO biosphere reserve and one of the most biodiverse territories on the planet. Coffee grows here under cloud forest, alongside cacao and species found nowhere else.",
          "These are agroforestry systems that protect the forest and the memory of those who have worked it.",
        ],
        role: "Memory", roleText: "The chapter of the root, with ecological and cultural depth.",
      },
      {
        key: "air", name: "Air", place: "Cauca", country: "Colombia", text: "Mountains and the crisp air of high altitude.", origin: "colombia-cauca",
        tagline: "Where difference finds meaning",
        body: [
          "In the mountains of Colombia, cool air and high-altitude currents set the rhythm of each harvest.",
          "Air is the invisible element that unites the other three, and the one that leaves the collection open to new editions and new territories.",
        ],
        role: "Opening", roleText: "The chapter that closes the cycle and expands it toward what comes next.",
      },
    ],
  },

  portfolio: {
    index: "07 — Portfolio",
    title: "One variety.\nMany origins.",
    text: "Caturra, Catuaí and Geisha are part of our portfolio across Colombia, Ecuador and Panama. Ask about available lots by origin and the cup profile you're looking for.",
    originsLabel: "Origins",
    originsPending: "Availability by origin: on request",
    cta: "Check availability",
    varieties: [
      {
        key: "caturra",
        name: "Caturra",
        origins: null,
        description: "A compact natural mutation of Bourbon and one of the most widely grown arabica varieties in Latin America.",
      },
      {
        key: "catuai",
        name: "Catuaí",
        origins: null,
        description: "A cross between Mundo Novo and Caturra, developed in Brazil in the mid-20th century.",
      },
      {
        key: "geisha",
        name: "Geisha",
        origins: ["Panama — Boquete"],
        description: "A variety of Ethiopian origin that earned international recognition in the highlands of Panama.",
      },
    ],
  },

  contact: {
    index: "08 — Sales contact",
    title: "We'll find\nthe coffee you need.",
    text: "Tell us which origin, variety or cup profile you're interested in and the volume you need. Our sales team will advise you on availability, samples and quotes.",
    contactsTitle: "Sales contacts",
    socialPending: "Social media: details pending from headquarters.",
    form: {
      name: "Name",
      company: "Company",
      country: "Country",
      email: "Email",
      phone: "Phone",
      origin: "Origin of interest",
      variety: "Coffee variety",
      volume: "Required volume",
      volumeHint: "E.g. number of bags or kilograms",
      message: "Message",
      optional: "optional",
      consent: "I authorize the use of my data to respond to this request.",
      submit: "Request your sample",
      sending: "Sending…",
      noPreference: "No preference",
      origins: [
        { value: "colombia-narino", label: "Colombia — Nariño" },
        { value: "colombia-cauca", label: "Colombia — Cauca" },
        { value: "ecuador-choco", label: "Ecuador — Chocó Andino" },
        { value: "panama-boquete", label: "Panama — Boquete" },
      ],
      varieties: [
        { value: "caturra", label: "Caturra" },
        { value: "catuai", label: "Catuaí" },
        { value: "geisha", label: "Geisha" },
      ],
      errors: {
        required: "This field is required.",
        email: "Please enter a valid email address.",
        consent: "We need your authorization to reply.",
        summary: "Please review the highlighted fields.",
      },
      success: {
        title: "Request received.",
        text: "Thank you. Our sales team will review your request and get in touch to arrange samples and a quote.",
        again: "Send another request",
      },
      failure: {
        notConfigured:
          "Online submission isn't enabled yet. In the meantime, please message one of our sales contacts on WhatsApp.",
        generic: "We couldn't send your request. Please try again or message us on WhatsApp.",
      },
    },
  },

  closing: {
    phrase: "Origins you can taste\nin every cup.",
    translation: "Orígenes que se sienten en cada taza.",
  },

  footer: {
    navTitle: "Navigation",
    nav: [
      { href: "nosotros", label: "About us" },
      { href: "nosotros#mision", label: "Mission & vision" },
      { href: "experiencia", label: "Experience" },
      { href: "#origenes", label: "Countries & offices" },
      { href: "alquimia", label: "Alquimia" },
      { href: "contacto", label: "Contact" },
    ],
    corporateTitle: "Orígenes Coffee",
    corporate: ["Headquartered in Colombia", "Branches in Ecuador and Panama", "Since 2017"],
    socialTitle: "Social media",
    socialPending: "Coming soon",
    whatsappTitle: "WhatsApp",
    whatsapp: "Let's talk coffee",
    rights: "All rights reserved.",
    top: "Back to top",
  },

  whatsapp: {
    bubble: "Shall we talk coffee?",
    open: "Open WhatsApp",
    close: "Close",
    chooseTitle: "Talk to our sales team",
    message: "Hello, I'd like to learn more about Orígenes Coffee.",
  },

  countryNames: { colombia: "Colombia", ecuador: "Ecuador", panama: "Panama" },
};
