const film = document.querySelector(".film");
const filmPhotos = [...document.querySelectorAll(".film-photo")];
const count = document.querySelector(".film-count b");
const caption = document.querySelector(".film-caption");
const progress = document.querySelector(".progress-fill");
const filmCopy = document.querySelector(".film-copy");
const kicker = document.querySelector(".film-kicker");
const title = document.querySelector(".film-title");
const description = document.querySelector(".film-description");
const chapters = [
  {
    name: "EL TERRITORIO",
    kicker: "El viaje comienza aquí",
    title: "El café<br />tiene un <em>lugar</em><br />de origen.",
    description: "Tres países. Expresiones únicas.<br />Un mundo de historias en cada taza.",
  },
  {
    name: "EL ORIGEN",
    kicker: "Cuidado desde el origen",
    title: "De cada fruto<br />nace un <em>mundo.</em>",
    description: "Pequeños detalles, cultivados con paciencia,<br />que definen el carácter de cada cosecha.",
  },
  {
    name: "EL PROCESO",
    kicker: "Conocimiento en cada cosecha",
    title: "Manos que<br />cultivan <em>futuro.</em>",
    description: "El saber de las comunidades transforma<br />cada grano en algo extraordinario.",
  },
  {
    name: "LA EXPERIENCIA",
    kicker: "Un ritual para disfrutar",
    title: "El ritual<br />se vuelve <em>arte.</em>",
    description: "Tiempo, cuidado y el punto justo<br />para revelar cada matiz.",
  },
  {
    name: "EL DESTINO",
    kicker: "Del origen, hasta ti",
    title: "Todo el viaje<br />vive en una <em>taza.</em>",
    description: "Desde paisajes lejanos hasta tu mesa.<br />Un mundo de historias en cada taza.",
  },
];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let activeChapter = -1;
let copyTransition;

function updateFilm() {
  if (!film) return;
  const bounds = film.getBoundingClientRect();
  const total = film.offsetHeight - window.innerHeight;
  const fraction = Math.min(1, Math.max(0, -bounds.top / total));
  const index = Math.min(filmPhotos.length - 1, Math.floor(fraction * filmPhotos.length));

  if (index !== activeChapter) {
    const chapter = chapters[index];
    if (activeChapter !== -1 && filmCopy && !reducedMotion.matches) {
      filmCopy.classList.add("is-changing");
      window.clearTimeout(copyTransition);
      copyTransition = window.setTimeout(() => {
        updateFilmCopy(chapter);
        filmCopy.classList.remove("is-changing");
      }, 160);
    } else {
      updateFilmCopy(chapter);
    }
    if (caption) caption.textContent = `${String(index + 1).padStart(2, "0")}  /  ${chapter.name}`;
    if (count) count.textContent = String(index + 1).padStart(2, "0");
    activeChapter = index;
  }
  filmPhotos.forEach((photo, i) => photo.classList.toggle("is-active", i === index));
  if (progress) progress.style.width = `${Math.max(3, fraction * 100)}%`;
}

function updateFilmCopy(chapter) {
  if (kicker) kicker.textContent = chapter.kicker;
  if (title) title.innerHTML = chapter.title;
  if (description) description.innerHTML = chapter.description;
}

let scrollQueued = false;
window.addEventListener("scroll", () => {
  if (scrollQueued) return;
  scrollQueued = true;
  window.requestAnimationFrame(() => {
    updateFilm();
    scrollQueued = false;
  });
}, { passive: true });
window.addEventListener("resize", updateFilm, { passive: true });
updateFilm();

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-in");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");
menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  const label = menuToggle.querySelector(".sr-only");
  if (label) label.textContent = isOpen ? "Abrir menú" : "Cerrar menú";
  nav?.classList.toggle("is-open", !isOpen);
});
nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    const label = menuToggle?.querySelector(".sr-only");
    if (label) label.textContent = "Abrir menú";
  });
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !nav?.classList.contains("is-open")) return;
  nav.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  const label = menuToggle.querySelector(".sr-only");
  if (label) label.textContent = "Abrir menú";
  menuToggle?.focus();
});

const cursor = document.querySelector(".cursor");
if (cursor && window.matchMedia("(pointer: fine)").matches && !reducedMotion.matches) {
  document.body.classList.add("has-custom-cursor");
  window.addEventListener("pointermove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.classList.add("is-visible");
  }, { passive: true });
  document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("pointerenter", () => cursor.classList.add("is-hover"));
    element.addEventListener("pointerleave", () => cursor.classList.remove("is-hover"));
  });
}

if (window.matchMedia("(pointer: fine)").matches && !reducedMotion.matches) {
  document.querySelectorAll("[data-tilt]").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      element.style.transform = `perspective(900px) rotateX(${-y * 2}deg) rotateY(${x * 2}deg)`;
    });
    element.addEventListener("pointerleave", () => {
      element.style.transform = "";
    });
  });

  document.querySelectorAll(".magnetic").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });
    element.addEventListener("pointerleave", () => {
      element.style.transform = "";
    });
  });
}
