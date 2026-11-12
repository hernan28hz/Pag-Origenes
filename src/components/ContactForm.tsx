"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { Dictionary } from "@/content";
import type { Locale } from "@/content/site";
import { ArrowIcon } from "./Icons";

type Values = {
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  origin: string;
  variety: string;
  volume: string;
  message: string;
  consent: boolean;
  website: string; // honeypot
};

const EMPTY: Values = {
  name: "",
  company: "",
  country: "",
  email: "",
  phone: "",
  origin: "",
  variety: "",
  volume: "",
  message: "",
  consent: false,
  website: "",
};

const REQUIRED: (keyof Values)[] = ["name", "company", "country", "email"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const f = dict.contact.form;
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Preselección desde Alquimia / Portafolio: /contacto?origen=…&variedad=…
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const origin = q.get("origen");
    const variety = q.get("variedad");
    const valid = (list: { value: string }[], v: string | null) => (v && list.some((o) => o.value === v) ? v : null);
    const o = valid(f.origins, origin);
    const v = valid(f.varieties, variety);
    if (o || v) setValues((cur) => ({ ...cur, ...(o ? { origin: o } : {}), ...(v ? { variety: v } : {}) }));
  }, [f.origins, f.varieties]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const validate = (v: Values) => {
    const errs: Partial<Record<keyof Values, string>> = {};
    REQUIRED.forEach((k) => {
      if (!String(v[k]).trim()) errs[k] = f.errors.required;
    });
    if (v.email.trim() && !EMAIL_RE.test(v.email.trim())) errs.email = f.errors.email;
    if (!v.consent) errs.consent = f.errors.consent;
    return errs;
  };

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    setValues((v) => ({ ...v, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      setStatus("error");
      setFailure(f.errors.summary);
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    setFailure("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (res.ok) {
        setStatus("success");
        setValues(EMPTY);
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setStatus("error");
      setFailure(data.error === "not_configured" ? f.failure.notConfigured : f.failure.generic);
    } catch {
      setStatus("error");
      setFailure(f.failure.generic);
    }
  };

  if (status === "success") {
    return (
      <div className="form__success" ref={successRef} tabIndex={-1} role="status">
        <h3>{f.success.title}</h3>
        <p className="lead" style={{ color: "rgba(242,236,225,.8)" }}>
          {f.success.text}
        </p>
        <div>
          <button type="button" className="btn btn--line" onClick={() => setStatus("idle")}>
            {f.success.again}
          </button>
        </div>
      </div>
    );
  }

  const field = (
    name: keyof Values,
    label: string,
    input: ReactNode,
    opts: { full?: boolean; optional?: boolean } = {},
  ) => (
    <div className={`field ${opts.full ? "field--full" : ""} ${errors[name] ? "has-error" : ""}`}>
      <label htmlFor={`f-${name}`}>
        {label} {opts.optional && <small>({f.optional})</small>}
      </label>
      {input}
      <span className="field__bar" aria-hidden="true" />
      {errors[name] && (
        <span className="field__error" id={`f-${name}-err`}>
          {errors[name]}
        </span>
      )}
    </div>
  );

  const common = (name: keyof Values) => ({
    id: `f-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `f-${name}-err` : undefined,
  });

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate aria-describedby="form-status">
      {field("name", f.name, <input {...common("name")} type="text" autoComplete="name" required value={values.name} onChange={(e) => set("name", e.target.value)} />)}
      {field("company", f.company, <input {...common("company")} type="text" autoComplete="organization" required value={values.company} onChange={(e) => set("company", e.target.value)} />)}
      {field("country", f.country, <input {...common("country")} type="text" autoComplete="country-name" required value={values.country} onChange={(e) => set("country", e.target.value)} />)}
      {field("email", f.email, <input {...common("email")} type="email" autoComplete="email" inputMode="email" required value={values.email} onChange={(e) => set("email", e.target.value)} />)}
      {field("phone", f.phone, <input {...common("phone")} type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} />, { optional: true })}
      {field(
        "volume",
        f.volume,
        <input {...common("volume")} type="text" placeholder={f.volumeHint} value={values.volume} onChange={(e) => set("volume", e.target.value)} />,
        { optional: true },
      )}
      {field(
        "origin",
        f.origin,
        <select {...common("origin")} value={values.origin} onChange={(e) => set("origin", e.target.value)}>
          <option value="">{f.noPreference}</option>
          {f.origins.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>,
      )}
      {field(
        "variety",
        f.variety,
        <select {...common("variety")} value={values.variety} onChange={(e) => set("variety", e.target.value)}>
          <option value="">{f.noPreference}</option>
          {f.varieties.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>,
      )}
      {field(
        "message",
        f.message,
        <textarea {...common("message")} rows={4} value={values.message} onChange={(e) => set("message", e.target.value)} />,
        { full: true, optional: true },
      )}

      {/* Honeypot anti-spam: invisible para personas */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div>
        <label className="form__consent">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "f-consent-err" : undefined}
          />
          <span>{f.consent}</span>
        </label>
        {errors.consent && (
          <span className="field__error block" id="f-consent-err">
            {errors.consent}
          </span>
        )}
      </div>

      <div className="form__foot">
        <button type="submit" className="btn btn--gold" disabled={status === "sending"} data-magnetic="0.2">
          {status === "sending" ? f.sending : f.submit} <ArrowIcon className="btn__arrow" />
        </button>
        <p id="form-status" className={`form__status ${status === "error" ? "form__status--error" : ""}`} role="status" aria-live="polite">
          {status === "error" ? failure : ""}
        </p>
      </div>
    </form>
  );
}
