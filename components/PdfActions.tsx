"use client";

import { useEffect, useState } from "react";
import { PDFViewer, usePDF } from "@react-pdf/renderer";
import QuotePDF from "./QuotePDF";
import type { Quote, Totals } from "@/lib/types";
import { slug } from "@/lib/calc";
import { ui } from "@/lib/ui";

interface Props {
  quote: Quote;
  totals: Totals;
}

export default function PdfActions({ quote, totals }: Props) {
  const [preview, setPreview] = useState(false);

  const [instance, updateInstance] = usePDF({
    document: <QuotePDF quote={quote} totals={totals} />,
  });

  const fileName = `${quote.number}-${slug(quote.client.name)}.pdf`;

  // Actualiza el PDF después de una breve pausa al modificar los datos.
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateInstance(<QuotePDF quote={quote} totals={totals} />);
    }, 350);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quote, totals]);

  const togglePreview = () => {
    setPreview((current) => !current);
  };

  return (
    <section className={ui.stack} aria-label="Acciones del PDF">
      <div className="flex flex-wrap gap-2">
        {instance.url ? (
          <a
            href={instance.url}
            download={fileName}
            className={ui.btnPrimary}
            aria-busy={instance.loading}
          >
            {instance.loading ? "Actualizando PDF…" : "Descargar PDF"}
          </a>
        ) : (
          <button
            type="button"
            className={ui.btnPrimary}
            disabled
            aria-live="polite"
          >
            {instance.error
              ? "Error al generar el PDF"
              : "Generando PDF…"}
          </button>
        )}

        <button
          type="button"
          className={ui.btn}
          onClick={togglePreview}
          aria-expanded={preview}
        >
          {preview ? "Ocultar vista previa" : "Vista previa del PDF"}
        </button>
      </div>

      {instance.error ? (
        <p className={ui.alert} role="alert">
          No se pudo generar el PDF. Intenta nuevamente.
        </p>
      ) : null}

      {preview ? (
        <div className={`${ui.panel} min-w-0`}>
          <div className={ui.panelHead}>
            <h3 className={ui.title}>Vista previa del documento</h3>
            <span className={ui.mutedSmall}>
              {quote.number}
            </span>
          </div>

          <PDFViewer
            className="h-[600px] w-full rounded-lg border border-border"
            showToolbar={false}
          >
            <QuotePDF quote={quote} totals={totals} />
          </PDFViewer>
        </div>
      ) : null}
    </section>
  );
}