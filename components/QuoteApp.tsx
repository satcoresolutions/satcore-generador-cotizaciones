"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import type { Item, Party, Quote } from "@/lib/types";
import { addDays, calcTotals, formatCOP, formatDate, todayISO, uid } from "@/lib/calc";

// react-pdf solo funciona en el navegador
const PdfActions = dynamic(() => import("./PdfActions"), {
  ssr: false,
  loading: () => <p className="muted">Cargando generador de PDF…</p>,
});

const KEY_DRAFT = "cotizaciones:borrador";
const KEY_HISTORY = "cotizaciones:historial";
const KEY_ISSUER = "cotizaciones:emisor";
const KEY_COUNTER = "cotizaciones:contador";

const emptyParty = (): Party => ({ name: "", nit: "", address: "", phone: "", email: "" });
const emptyItem = (): Item => ({ id: uid(), description: "", quantity: 1, unitPrice: 0 });

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* almacenamiento lleno o bloqueado: se ignora */
  }
}

function nextNumber(): string {
  const n = read<number>(KEY_COUNTER, 0) + 1;
  return `COT-${String(n).padStart(4, "0")}`;
}

function newQuote(): Quote {
  const saved = read<{ issuer: Party; logo: string | null } | null>(KEY_ISSUER, null);
  return {
    id: uid(),
    number: nextNumber(),
    date: todayISO(),
    validDays: 15,
    issuer: saved?.issuer ?? emptyParty(),
    logo: saved?.logo ?? null,
    client: emptyParty(),
    items: [emptyItem()],
    discountPct: 0,
    taxPct: 19,
    paymentTerms: "50% de anticipo y 50% contra entrega.",
    notes: "",
  };
}

export default function QuoteApp() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [history, setHistory] = useState<Quote[]>([]);
  const [message, setMessage] = useState("");

  // Carga inicial (solo en el navegador)
  useEffect(() => {
    const draft = read<Quote | null>(KEY_DRAFT, null);
    setQuote(draft ?? newQuote());
    setHistory(read<Quote[]>(KEY_HISTORY, []));
  }, []);

  // Autoguardado del borrador y de los datos del emisor
  useEffect(() => {
    if (!quote) return;
    write(KEY_DRAFT, quote);
    write(KEY_ISSUER, { issuer: quote.issuer, logo: quote.logo });
  }, [quote]);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(""), 2500);
    return () => clearTimeout(t);
  }, [message]);

  const totals = useMemo(() => (quote ? calcTotals(quote) : null), [quote]);

  if (!quote || !totals) {
    return <p className="muted">Cargando…</p>;
  }

  const update = <K extends keyof Quote>(key: K, value: Quote[K]) =>
    setQuote((q) => (q ? { ...q, [key]: value } : q));

  const updateParty = (who: "issuer" | "client", field: keyof Party, value: string) =>
    setQuote((q) => (q ? { ...q, [who]: { ...q[who], [field]: value } } : q));

  const updateItem = (id: string, patch: Partial<Item>) =>
    setQuote((q) =>
      q ? { ...q, items: q.items.map((it) => (it.id === id ? { ...it, ...patch } : it)) } : q
    );

  const addItem = () => setQuote((q) => (q ? { ...q, items: [...q.items, emptyItem()] } : q));

  const removeItem = (id: string) =>
    setQuote((q) =>
      q && q.items.length > 1 ? { ...q, items: q.items.filter((it) => it.id !== id) } : q
    );

  const onLogo = (file: File | undefined) => {
    if (!file) return;
    if (file.size > 1_500_000) {
      setMessage("El logo es muy pesado (máx. 1,5 MB).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => update("logo", String(reader.result));
    reader.readAsDataURL(file);
  };

  const saveToHistory = () => {
    const exists = history.some((h) => h.id === quote.id);
    const next = exists
      ? history.map((h) => (h.id === quote.id ? quote : h))
      : [quote, ...history];
    setHistory(next);
    write(KEY_HISTORY, next);
    if (!exists) {
      const n = Number(quote.number.replace(/\D/g, "")) || 0;
      write(KEY_COUNTER, Math.max(read<number>(KEY_COUNTER, 0), n));
    }
    setMessage("Cotización guardada en el historial.");
  };

  const startNew = () => {
    const n = Number(quote.number.replace(/\D/g, "")) || 0;
    write(KEY_COUNTER, Math.max(read<number>(KEY_COUNTER, 0), n));
    setQuote(newQuote());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loadFromHistory = (q: Quote) => {
    setQuote(q);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const duplicate = (q: Quote) => {
    const n = Number(q.number.replace(/\D/g, "")) || 0;
    write(KEY_COUNTER, Math.max(read<number>(KEY_COUNTER, 0), n));
    setQuote({
      ...q,
      id: uid(),
      number: nextNumber(),
      date: todayISO(),
      items: q.items.map((it) => ({ ...it, id: uid() })),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeFromHistory = (id: string) => {
    const next = history.filter((h) => h.id !== id);
    setHistory(next);
    write(KEY_HISTORY, next);
  };

  return (
    <div className="layout">
      <section className="panel">
        <div className="panel-head">
          <h2>Datos de la cotización</h2>
          <button type="button" className="btn btn-ghost" onClick={startNew}>
            + Nueva cotización
          </button>
        </div>

        <div className="grid grid-3">
          <label>
            N.º de cotización
            <input value={quote.number} onChange={(e) => update("number", e.target.value)} />
          </label>
          <label>
            Fecha
            <input type="date" value={quote.date} onChange={(e) => update("date", e.target.value)} />
          </label>
          <label>
            Validez (días)
            <input
              type="number"
              min={1}
              value={quote.validDays}
              onChange={(e) => update("validDays", Number(e.target.value) || 1)}
            />
          </label>
        </div>
        <p className="hint">Válida hasta {formatDate(addDays(quote.date, quote.validDays))}.</p>

        <h3>Tu empresa</h3>
        <div className="logo-row">
          {quote.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={quote.logo} alt="Logo" className="logo-preview" />
          ) : (
            <div className="logo-preview empty">Sin logo</div>
          )}
          <div className="logo-actions">
            <label className="btn">
              Subir logo
              <input
                type="file"
                accept="image/png,image/jpeg"
                hidden
                onChange={(e) => onLogo(e.target.files?.[0])}
              />
            </label>
            {quote.logo ? (
              <button type="button" className="btn btn-ghost" onClick={() => update("logo", null)}>
                Quitar
              </button>
            ) : null}
          </div>
        </div>
        <PartyFields party={quote.issuer} onChange={(f, v) => updateParty("issuer", f, v)} nitLabel="NIT" />

        <h3>Cliente</h3>
        <PartyFields party={quote.client} onChange={(f, v) => updateParty("client", f, v)} nitLabel="NIT / CC" />

        <h3>Ítems</h3>
        <div className="items">
          <div className="item item-head">
            <span>Descripción</span>
            <span>Cant.</span>
            <span>Precio unit.</span>
            <span>Total</span>
            <span />
          </div>
          {quote.items.map((it) => (
            <div className="item" key={it.id}>
              <input
                placeholder="Producto o servicio"
                value={it.description}
                onChange={(e) => updateItem(it.id, { description: e.target.value })}
              />
              <input
                type="number"
                min={0}
                value={it.quantity}
                onChange={(e) => updateItem(it.id, { quantity: Number(e.target.value) || 0 })}
              />
              <input
                type="number"
                min={0}
                value={it.unitPrice}
                onChange={(e) => updateItem(it.id, { unitPrice: Number(e.target.value) || 0 })}
              />
              <span className="item-total">{formatCOP(it.quantity * it.unitPrice)}</span>
              <button
                type="button"
                className="icon-btn"
                aria-label="Eliminar ítem"
                onClick={() => removeItem(it.id)}
                disabled={quote.items.length === 1}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="btn" onClick={addItem}>
          + Agregar ítem
        </button>

        <div className="grid grid-2 spaced">
          <label>
            Descuento (%)
            <input
              type="number"
              min={0}
              max={100}
              value={quote.discountPct}
              onChange={(e) => update("discountPct", Math.min(100, Number(e.target.value) || 0))}
            />
          </label>
          <label>
            IVA (%)
            <input
              type="number"
              min={0}
              max={100}
              value={quote.taxPct}
              onChange={(e) => update("taxPct", Math.min(100, Number(e.target.value) || 0))}
            />
          </label>
        </div>

        <label className="block">
          Condiciones de pago
          <textarea
            rows={2}
            value={quote.paymentTerms}
            onChange={(e) => update("paymentTerms", e.target.value)}
          />
        </label>
        <label className="block">
          Notas
          <textarea
            rows={3}
            placeholder="Tiempos de entrega, garantía, aclaraciones…"
            value={quote.notes}
            onChange={(e) => update("notes", e.target.value)}
          />
        </label>
      </section>

      <aside className="side">
        <section className="panel summary">
          <h2>Resumen</h2>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{formatCOP(totals.subtotal)}</dd>
            </div>
            {quote.discountPct > 0 && (
              <div>
                <dt>Descuento ({quote.discountPct}%)</dt>
                <dd>- {formatCOP(totals.discount)}</dd>
              </div>
            )}
            {quote.taxPct > 0 && (
              <div>
                <dt>IVA ({quote.taxPct}%)</dt>
                <dd>{formatCOP(totals.tax)}</dd>
              </div>
            )}
            <div className="grand">
              <dt>Total</dt>
              <dd>{formatCOP(totals.total)}</dd>
            </div>
          </dl>

          <PdfActions quote={quote} totals={totals} />

          <button type="button" className="btn btn-block" onClick={saveToHistory}>
            Guardar en historial
          </button>
          {message ? <p className="toast">{message}</p> : null}
          <p className="hint">El borrador se guarda solo en este navegador.</p>
        </section>

        <section className="panel">
          <h2>Historial</h2>
          {history.length === 0 ? (
            <p className="muted">Aún no has guardado cotizaciones.</p>
          ) : (
            <ul className="history">
              {history.map((h) => (
                <li key={h.id}>
                  <div>
                    <strong>{h.number}</strong>
                    <span className="muted"> · {h.client.name || "Sin cliente"}</span>
                    <div className="muted small">
                      {formatDate(h.date)} · {formatCOP(calcTotals(h).total)}
                    </div>
                  </div>
                  <div className="history-actions">
                    <button type="button" className="link" onClick={() => loadFromHistory(h)}>
                      Abrir
                    </button>
                    <button type="button" className="link" onClick={() => duplicate(h)}>
                      Duplicar
                    </button>
                    <button type="button" className="link danger" onClick={() => removeFromHistory(h.id)}>
                      Borrar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </aside>
    </div>
  );
}

function PartyFields({
  party,
  onChange,
  nitLabel,
}: {
  party: Party;
  onChange: (field: keyof Party, value: string) => void;
  nitLabel: string;
}) {
  return (
    <div className="grid grid-2">
      <label>
        Nombre / Razón social
        <input value={party.name} onChange={(e) => onChange("name", e.target.value)} />
      </label>
      <label>
        {nitLabel}
        <input value={party.nit} onChange={(e) => onChange("nit", e.target.value)} />
      </label>
      <label>
        Dirección
        <input value={party.address} onChange={(e) => onChange("address", e.target.value)} />
      </label>
      <label>
        Teléfono
        <input value={party.phone} onChange={(e) => onChange("phone", e.target.value)} />
      </label>
      <label className="span-2">
        Correo
        <input type="email" value={party.email} onChange={(e) => onChange("email", e.target.value)} />
      </label>
    </div>
  );
}
