"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import type { Item, Party, Quote } from "@/lib/types";
import { addDays, calcTotals, formatCOP, formatDate, todayISO, uid } from "@/lib/calc";
import { ui } from "@/lib/ui";

// react-pdf solo funciona en el navegador
const PdfActions = dynamic(() => import("./PdfActions"), {
  ssr: false,
  loading: () => <p className={ui.muted}>Cargando generador de PDF…</p>,
});

const KEY_DRAFT = "cotizaciones:borrador";
const KEY_HISTORY = "cotizaciones:historial";
const KEY_ISSUER = "cotizaciones:emisor";
const KEY_COUNTER = "cotizaciones:contador";

const emptyParty = (): Party => ({
  name: "",
  nit: "",
  address: "",
  phone: "",
  email: "",
});

const emptyItem = (): Item => ({
  id: uid(),
  description: "",
  quantity: 1,
  unitPrice: 0,
});

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
    // Almacenamiento lleno o bloqueado: se ignora.
  }
}

function nextNumber(): string {
  const n = read<number>(KEY_COUNTER, 0) + 1;
  return `COT-${String(n).padStart(4, "0")}`;
}

function newQuote(): Quote {
  const saved = read<{ issuer: Party; logo: string | null } | null>(
    KEY_ISSUER,
    null,
  );

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

  // Carga inicial en el navegador.
  useEffect(() => {
    const draft = read<Quote | null>(KEY_DRAFT, null);
    setQuote(draft ?? newQuote());
    setHistory(read<Quote[]>(KEY_HISTORY, []));
  }, []);

  // Autoguardado del borrador y de los datos del emisor.
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

  const totals = useMemo(
    () => (quote ? calcTotals(quote) : null),
    [quote],
  );

  if (!quote || !totals) {
    return <p className={ui.muted}>Cargando…</p>;
  }

  const update = <K extends keyof Quote>(key: K, value: Quote[K]) =>
    setQuote((q) => (q ? { ...q, [key]: value } : q));

  const updateParty = (
    who: "issuer" | "client",
    field: keyof Party,
    value: string,
  ) =>
    setQuote((q) =>
      q ? { ...q, [who]: { ...q[who], [field]: value } } : q,
    );

  const updateItem = (id: string, patch: Partial<Item>) =>
    setQuote((q) =>
      q
        ? {
            ...q,
            items: q.items.map((it) =>
              it.id === id ? { ...it, ...patch } : it,
            ),
          }
        : q,
    );

  const addItem = () =>
    setQuote((q) =>
      q ? { ...q, items: [...q.items, emptyItem()] } : q,
    );

  const removeItem = (id: string) =>
    setQuote((q) =>
      q && q.items.length > 1
        ? { ...q, items: q.items.filter((it) => it.id !== id) }
        : q,
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
    <div className="grid min-w-0 grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)]">
      {/* Formulario de cotización */}
      <section className={`${ui.panel} min-w-0`}>
        <div className={ui.panelHead}>
          <h2 className={ui.title}>Datos de la cotización</h2>

          <button
            type="button"
            className={ui.btnGhost}
            onClick={startNew}
          >
            + Nueva cotización
          </button>
        </div>

        {/* Datos generales */}
        <div className={ui.grid2}>
          <label className={ui.label}>
            N.º de cotización
            <input
              className={ui.input}
              value={quote.number}
              onChange={(e) => update("number", e.target.value)}
            />
          </label>

          <label className={ui.label}>
            Fecha
            <input
              className={ui.input}
              type="date"
              value={quote.date}
              onChange={(e) => update("date", e.target.value)}
            />
          </label>

          <label className={ui.label}>
            Validez (días)
            <input
              className={ui.input}
              type="number"
              min={1}
              value={quote.validDays}
              onChange={(e) =>
                update("validDays", Number(e.target.value) || 1)
              }
            />
          </label>
        </div>

        <p className={ui.hint}>
          Válida hasta {formatDate(addDays(quote.date, quote.validDays))}.
        </p>

        {/* Datos de la empresa */}
        <h3 className={ui.subtitle}>Tu empresa</h3>

        <div className="flex flex-wrap items-center gap-4">
          {quote.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={quote.logo}
              alt="Logo de la empresa"
              className="h-20 w-28 rounded-lg border border-border bg-background object-contain p-2"
            />
          ) : (
            <div className="flex h-20 w-28 items-center justify-center rounded-lg border border-dashed border-border bg-background text-center text-sm text-text-muted">
              Sin logo
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <label className={ui.btn}>
              Subir logo
              <input
                type="file"
                accept="image/png,image/jpeg"
                hidden
                onChange={(e) => onLogo(e.target.files?.[0])}
              />
            </label>

            {quote.logo ? (
              <button
                type="button"
                className={ui.btnGhost}
                onClick={() => update("logo", null)}
              >
                Quitar logo
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-4">
          <PartyFields
            party={quote.issuer}
            onChange={(f, v) => updateParty("issuer", f, v)}
            nitLabel="NIT"
          />
        </div>

        {/* Datos del cliente */}
        <h3 className={ui.subtitle}>Cliente</h3>

        <PartyFields
          party={quote.client}
          onChange={(f, v) => updateParty("client", f, v)}
          nitLabel="NIT / CC"
        />

        {/* Ítems */}
        <h3 className={ui.subtitle}>Ítems de la cotización</h3>

        <div className="grid gap-3">
          <div className="hidden grid-cols-[minmax(0,2fr)_5rem_minmax(0,1fr)_auto_auto] gap-3 px-1 text-xs font-semibold text-text-muted md:grid">
            <span>Descripción</span>
            <span>Cant.</span>
            <span>Precio unit.</span>
            <span>Total</span>
            <span />
          </div>

          {quote.items.map((it, index) => (
            <div
              className="grid min-w-0 grid-cols-2 gap-3 rounded-xl border border-border bg-background/50 p-3 md:grid-cols-[minmax(0,2fr)_5rem_minmax(0,1fr)_auto_auto] md:items-center"
              key={it.id}
            >
              <label className={`${ui.label} col-span-2 min-w-0 md:col-span-1`}>
                <span className="md:hidden">Descripción</span>
                <input
                  className={ui.input}
                  placeholder="Producto o servicio"
                  aria-label={`Descripción del ítem ${index + 1}`}
                  value={it.description}
                  onChange={(e) =>
                    updateItem(it.id, { description: e.target.value })
                  }
                />
              </label>

              <label className={ui.label}>
                <span className="md:hidden">Cantidad</span>
                <input
                  className={ui.input}
                  type="number"
                  min={0}
                  aria-label={`Cantidad del ítem ${index + 1}`}
                  value={it.quantity}
                  onChange={(e) =>
                    updateItem(it.id, {
                      quantity: Number(e.target.value) || 0,
                    })
                  }
                />
              </label>

              <label className={ui.label}>
                <span className="md:hidden">Precio unitario</span>
                <input
                  className={ui.input}
                  type="number"
                  min={0}
                  aria-label={`Precio unitario del ítem ${index + 1}`}
                  value={it.unitPrice}
                  onChange={(e) =>
                    updateItem(it.id, {
                      unitPrice: Number(e.target.value) || 0,
                    })
                  }
                />
              </label>

              <div className="col-span-1 flex min-w-0 flex-col justify-center gap-1 md:col-span-1">
                <span className="text-xs text-text-muted md:hidden">
                  Total
                </span>
                <span className="break-words text-sm font-semibold tabular-nums text-foreground">
                  {formatCOP(it.quantity * it.unitPrice)}
                </span>
              </div>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center self-center justify-self-end rounded-lg border border-border text-lg text-text-muted transition-colors hover:border-danger/40 hover:bg-danger/10 hover:text-danger disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={`Eliminar ítem ${index + 1}`}
                onClick={() => removeItem(it.id)}
                disabled={quote.items.length === 1}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={`${ui.btn} mt-3`}
          onClick={addItem}
        >
          + Agregar ítem
        </button>

        {/* Descuentos e impuestos */}
        <h3 className={ui.subtitle}>Descuentos e impuestos</h3>

        <div className={ui.grid2}>
          <label className={ui.label}>
            Descuento (%)
            <input
              className={ui.input}
              type="number"
              min={0}
              max={100}
              value={quote.discountPct}
              onChange={(e) =>
                update(
                  "discountPct",
                  Math.min(100, Number(e.target.value) || 0),
                )
              }
            />
          </label>

          <label className={ui.label}>
            IVA (%)
            <input
              className={ui.input}
              type="number"
              min={0}
              max={100}
              value={quote.taxPct}
              onChange={(e) =>
                update("taxPct", Math.min(100, Number(e.target.value) || 0))
              }
            />
          </label>
        </div>

        {/* Condiciones y notas */}
        <label className={`${ui.label} ${ui.block}`}>
          Condiciones de pago
          <textarea
            className={ui.input}
            rows={2}
            value={quote.paymentTerms}
            onChange={(e) => update("paymentTerms", e.target.value)}
          />
        </label>

        <label className={`${ui.label} ${ui.block}`}>
          Notas
          <textarea
            className={ui.input}
            rows={3}
            placeholder="Tiempos de entrega, garantía, aclaraciones…"
            value={quote.notes}
            onChange={(e) => update("notes", e.target.value)}
          />
        </label>
      </section>

      {/* Resumen e historial */}
      <aside className="grid min-w-0 gap-5 lg:sticky lg:top-24">
        <section className={`${ui.panel} min-w-0`}>
          <div className={ui.panelHead}>
            <h2 className={ui.title}>Resumen</h2>
          </div>

          <dl className="grid gap-3">
            <div className="flex items-center justify-between gap-3">
              <dt className={ui.totalLabel}>Subtotal</dt>
              <dd className="text-right text-sm font-medium tabular-nums text-foreground">
                {formatCOP(totals.subtotal)}
              </dd>
            </div>

            {quote.discountPct > 0 && (
              <div className="flex items-center justify-between gap-3">
                <dt className={ui.totalLabel}>
                  Descuento ({quote.discountPct}%)
                </dt>
                <dd className="text-right text-sm font-medium tabular-nums text-success">
                  - {formatCOP(totals.discount)}
                </dd>
              </div>
            )}

            {quote.taxPct > 0 && (
              <div className="flex items-center justify-between gap-3">
                <dt className={ui.totalLabel}>IVA ({quote.taxPct}%)</dt>
                <dd className="text-right text-sm font-medium tabular-nums text-foreground">
                  {formatCOP(totals.tax)}
                </dd>
              </div>
            )}

            <div className={`${ui.totalBox} mt-1 bg-surface`}>
              <dt className="font-semibold text-foreground">Total</dt>
              <dd className="text-right text-xl font-bold tabular-nums text-text-primary">
                {formatCOP(totals.total)}
              </dd>
            </div>
          </dl>

          <div className="mt-4 grid gap-3">
            <PdfActions quote={quote} totals={totals} />

            <button
              type="button"
              className={`${ui.btnPrimary} w-full`}
              onClick={saveToHistory}
            >
              Guardar en historial
            </button>
          </div>

          {message ? (
            <p role="status" className={`${ui.toast} mt-3`}>
              {message}
            </p>
          ) : null}

          <p className={`${ui.hint} mt-4`}>
            El borrador se guarda automáticamente en este navegador.
          </p>
        </section>

        <section className={`${ui.panel} min-w-0`}>
          <div className={ui.panelHead}>
            <h2 className={ui.title}>Historial</h2>
            <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-text-muted">
              {history.length}
            </span>
          </div>

          {history.length === 0 ? (
            <p className={ui.muted}>
              Aún no has guardado cotizaciones.
            </p>
          ) : (
            <ul className="grid gap-3">
              {history.map((h) => (
                <li
                  className="grid min-w-0 gap-3 rounded-lg border border-border p-3"
                  key={h.id}
                >
                  <div className="min-w-0">
                    <strong className="break-words text-sm text-foreground">
                      {h.number}
                    </strong>

                    <p className="mt-1 break-words text-sm text-text-muted">
                      {h.client.name || "Sin cliente"}
                    </p>

                    <p className="mt-1 text-xs text-text-muted">
                      {formatDate(h.date)}
                    </p>

                    <p className="mt-1 text-sm font-semibold tabular-nums text-text-primary">
                      {formatCOP(calcTotals(h).total)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-3">
                    <button
                      type="button"
                      className={ui.link}
                      onClick={() => loadFromHistory(h)}
                    >
                      Abrir
                    </button>

                    <button
                      type="button"
                      className={ui.link}
                      onClick={() => duplicate(h)}
                    >
                      Duplicar
                    </button>

                    <button
                      type="button"
                      className={ui.linkDanger}
                      onClick={() => removeFromHistory(h.id)}
                    >
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
    <div className={ui.grid2}>
      <label className={ui.label}>
        Nombre / Razón social
        <input
          className={ui.input}
          value={party.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
      </label>

      <label className={ui.label}>
        {nitLabel}
        <input
          className={ui.input}
          value={party.nit}
          onChange={(e) => onChange("nit", e.target.value)}
        />
      </label>

      <label className={ui.label}>
        Dirección
        <input
          className={ui.input}
          value={party.address}
          onChange={(e) => onChange("address", e.target.value)}
        />
      </label>

      <label className={ui.label}>
        Teléfono
        <input
          className={ui.input}
          type="tel"
          value={party.phone}
          onChange={(e) => onChange("phone", e.target.value)}
        />
      </label>

      <label className={`${ui.label} sm:col-span-2`}>
        Correo
        <input
          className={ui.input}
          type="email"
          value={party.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </label>
    </div>
  );
}