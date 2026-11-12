import { NextResponse } from "next/server";

/**
 * Recepción de solicitudes comerciales.
 *
 * Envía un correo al equipo comercial mediante la API HTTP de Resend.
 * Variables necesarias (ver .env.example):
 *   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 * Si faltan, responde 503 { error: "not_configured" } y el formulario
 * lo comunica al usuario: no se simula ningún envío.
 */

type Payload = Record<string, unknown>;

const LIMITS: Record<string, number> = {
  name: 120,
  company: 160,
  country: 80,
  email: 160,
  phone: 40,
  origin: 60,
  variety: 40,
  volume: 120,
  message: 4000,
};
const REQUIRED = ["name", "company", "country", "email"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LABELS: Record<string, string> = {
  name: "Nombre",
  company: "Empresa",
  country: "País",
  email: "Correo",
  phone: "Teléfono",
  origin: "Origen de interés",
  variety: "Variedad",
  volume: "Volumen requerido",
  message: "Mensaje",
  locale: "Idioma del sitio",
};

const ENTITIES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ENTITIES[c]);

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: los bots rellenan el campo oculto. Se responde OK sin enviar.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const data: Record<string, string> = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    const v = typeof body[key] === "string" ? (body[key] as string).trim() : "";
    if (v.length > max) return NextResponse.json({ error: "too_long", field: key }, { status: 400 });
    data[key] = v;
  }
  data.locale = body.locale === "en" ? "en" : "es";

  const missing = REQUIRED.filter((k) => !data[k]);
  if (missing.length) return NextResponse.json({ error: "missing", fields: missing }, { status: 400 });
  if (!EMAIL_RE.test(data.email)) return NextResponse.json({ error: "email" }, { status: 400 });
  if (body.consent !== true) return NextResponse.json({ error: "consent" }, { status: 400 });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const keys = Object.keys(LABELS).filter((k) => data[k]);
  const rows = keys
    .map(
      (k) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#6f6253;vertical-align:top">${LABELS[k]}</td><td style="padding:6px 0">${esc(data[k]).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");
  const text = keys.map((k) => `${LABELS[k]}: ${data[k]}`).join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()).filter(Boolean),
        reply_to: data.email,
        subject: `Solicitud de muestra — ${data.company} (${data.country})`,
        html: `<h2 style="font-family:Georgia,serif">Nueva solicitud comercial</h2><table style="font-family:Arial,sans-serif;font-size:14px">${rows}</table>`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact send failed", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
