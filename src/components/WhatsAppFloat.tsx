"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/content";
import { WHATSAPP_NUMBER, waLink } from "@/content/site";
import { WhatsAppIcon } from "./Icons";

/**
 * Botón flotante permanente de WhatsApp: abre directamente la conversación
 * con un mensaje predefinido. Número configurable en src/content/site.ts
 * (WHATSAPP_NUMBER / NEXT_PUBLIC_WHATSAPP_NUMBER).
 */
export function WhatsAppFloat({ dict }: { dict: Dictionary }) {
  const w = dict.whatsapp;
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem("wa-bubble") === "0";
    } catch {}
    if (dismissed) return;
    // Aparece una vez, unos segundos, y se retira sola para no tapar contenido.
    const show = window.setTimeout(() => setBubble(true), 4500);
    const hide = window.setTimeout(() => setBubble(false), 13500);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  const closeBubble = () => {
    setBubble(false);
    try {
      sessionStorage.setItem("wa-bubble", "0");
    } catch {}
  };

  if (!WHATSAPP_NUMBER) return null;

  return (
    <div className="wa">
      {bubble && (
        <div className="wa__bubble" role="status">
          {w.bubble}
          <button type="button" onClick={closeBubble} aria-label={w.close}>
            ×
          </button>
        </div>
      )}
      <a
        className="wa__btn"
        href={waLink(WHATSAPP_NUMBER, w.message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={w.open}
        data-magnetic="0.3"
        onClick={closeBubble}
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}
