"use client";

import { useEffect, useState } from "react";
import { PDFViewer, usePDF } from "@react-pdf/renderer";
import QuotePDF from "./QuotePDF";
import type { Quote, Totals } from "@/lib/types";
import { slug } from "@/lib/calc";

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

  // Regenera el PDF cuando cambian los datos (con una pequeña espera para no recalcular en cada tecla)
  useEffect(() => {
    const t = setTimeout(() => updateInstance(<QuotePDF quote={quote} totals={totals} />), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quote, totals]);

  return (
    <>
      <div className="pdf-actions">
        {instance.url ? (
          <a href={instance.url} download={fileName} className="btn btn-primary">
            {instance.loading ? "Actualizando PDF…" : "Descargar PDF"}
          </a>
        ) : (
          <button type="button" className="btn btn-primary" disabled>
            {instance.error ? "Error al generar el PDF" : "Generando PDF…"}
          </button>
        )}
        <button type="button" className="btn" onClick={() => setPreview((p) => !p)}>
          {preview ? "Ocultar vista previa" : "Vista previa del PDF"}
        </button>
      </div>
      {preview ? (
        <PDFViewer className="pdf-viewer" showToolbar={false}>
          <QuotePDF quote={quote} totals={totals} />
        </PDFViewer>
      ) : null}
    </>
  );
}
