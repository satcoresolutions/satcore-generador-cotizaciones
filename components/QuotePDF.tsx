import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { Quote, Totals } from "@/lib/types";
import { addDays, formatCOP, formatDate } from "@/lib/calc";

const ACCENT = "#1f4fd8";
const INK = "#1b1f27";
const MUTED = "#6b7280";
const LINE = "#e5e7eb";

const s = StyleSheet.create({
  page: { padding: 40, paddingBottom: 60, fontSize: 10, fontFamily: "Helvetica", color: INK },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  logo: { width: 90, height: 60, objectFit: "contain", marginBottom: 6 },
  issuerName: { fontSize: 15, fontFamily: "Helvetica-Bold" },
  small: { fontSize: 9, color: MUTED, marginTop: 2 },
  quoteBox: { alignItems: "flex-end" },
  title: { fontSize: 22, fontFamily: "Helvetica-Bold", color: ACCENT },
  quoteMeta: { marginTop: 4, fontSize: 9.5, textAlign: "right", color: MUTED },
  quoteMetaStrong: { color: INK, fontFamily: "Helvetica-Bold" },
  clientBox: {
    backgroundColor: "#f5f7fb",
    borderRadius: 4,
    padding: 12,
    marginBottom: 20,
  },
  label: { fontSize: 8, color: MUTED, textTransform: "uppercase", marginBottom: 4 },
  clientName: { fontSize: 12, fontFamily: "Helvetica-Bold" },
  tableHead: {
    flexDirection: "row",
    backgroundColor: ACCENT,
    color: "#ffffff",
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  cNum: { width: "6%" },
  cDesc: { width: "46%", paddingRight: 6 },
  cQty: { width: "10%", textAlign: "right" },
  cPrice: { width: "19%", textAlign: "right" },
  cTotal: { width: "19%", textAlign: "right" },
  totalsWrap: { alignItems: "flex-end", marginTop: 14 },
  totals: { width: "46%" },
  totalRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 3 },
  grand: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    paddingVertical: 7,
    paddingHorizontal: 8,
    backgroundColor: ACCENT,
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
  },
  section: { marginTop: 22 },
  sectionTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: ACCENT, marginBottom: 4, textTransform: "uppercase" },
  paragraph: { lineHeight: 1.45, color: INK },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: MUTED,
    borderTopWidth: 1,
    borderTopColor: LINE,
    paddingTop: 6,
  },
});

interface Props {
  quote: Quote;
  totals: Totals;
}

export default function QuotePDF({ quote, totals }: Props) {
  const validUntil = addDays(quote.date, quote.validDays);
  const { issuer, client } = quote;

  return (
    <Document title={`Cotización ${quote.number}`} author={issuer.name || "Cotizaciones"}>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View style={{ maxWidth: "58%" }}>
            {quote.logo ? <Image src={quote.logo} style={s.logo} /> : null}
            <Text style={s.issuerName}>{issuer.name || "Tu empresa"}</Text>
            {issuer.nit ? <Text style={s.small}>NIT: {issuer.nit}</Text> : null}
            {issuer.address ? <Text style={s.small}>{issuer.address}</Text> : null}
            {issuer.phone ? <Text style={s.small}>Tel: {issuer.phone}</Text> : null}
            {issuer.email ? <Text style={s.small}>{issuer.email}</Text> : null}
          </View>
          <View style={s.quoteBox}>
            <Text style={s.title}>COTIZACIÓN</Text>
            <Text style={s.quoteMeta}>
              N.º <Text style={s.quoteMetaStrong}>{quote.number}</Text>
            </Text>
            <Text style={s.quoteMeta}>Fecha: {formatDate(quote.date)}</Text>
            <Text style={s.quoteMeta}>Válida hasta: {formatDate(validUntil)}</Text>
          </View>
        </View>

        <View style={s.clientBox}>
          <Text style={s.label}>Cotizado a</Text>
          <Text style={s.clientName}>{client.name || "Cliente"}</Text>
          {client.nit ? <Text style={s.small}>NIT / CC: {client.nit}</Text> : null}
          {client.address ? <Text style={s.small}>{client.address}</Text> : null}
          {client.phone ? <Text style={s.small}>Tel: {client.phone}</Text> : null}
          {client.email ? <Text style={s.small}>{client.email}</Text> : null}
        </View>

        <View style={s.tableHead}>
          <Text style={s.cNum}>#</Text>
          <Text style={s.cDesc}>Descripción</Text>
          <Text style={s.cQty}>Cant.</Text>
          <Text style={s.cPrice}>Precio unit.</Text>
          <Text style={s.cTotal}>Total</Text>
        </View>
        {quote.items.map((it, i) => (
          <View key={it.id} style={s.row} wrap={false}>
            <Text style={s.cNum}>{i + 1}</Text>
            <Text style={s.cDesc}>{it.description || "—"}</Text>
            <Text style={s.cQty}>{it.quantity}</Text>
            <Text style={s.cPrice}>{formatCOP(it.unitPrice)}</Text>
            <Text style={s.cTotal}>{formatCOP(it.quantity * it.unitPrice)}</Text>
          </View>
        ))}

        <View style={s.totalsWrap} wrap={false}>
          <View style={s.totals}>
            <View style={s.totalRow}>
              <Text>Subtotal</Text>
              <Text>{formatCOP(totals.subtotal)}</Text>
            </View>
            {quote.discountPct > 0 ? (
              <View style={s.totalRow}>
                <Text>Descuento ({quote.discountPct}%)</Text>
                <Text>- {formatCOP(totals.discount)}</Text>
              </View>
            ) : null}
            {quote.taxPct > 0 ? (
              <View style={s.totalRow}>
                <Text>IVA ({quote.taxPct}%)</Text>
                <Text>{formatCOP(totals.tax)}</Text>
              </View>
            ) : null}
            <View style={s.grand}>
              <Text>TOTAL</Text>
              <Text>{formatCOP(totals.total)}</Text>
            </View>
          </View>
        </View>

        {quote.paymentTerms ? (
          <View style={s.section} wrap={false}>
            <Text style={s.sectionTitle}>Condiciones de pago</Text>
            <Text style={s.paragraph}>{quote.paymentTerms}</Text>
          </View>
        ) : null}

        {quote.notes ? (
          <View style={s.section} wrap={false}>
            <Text style={s.sectionTitle}>Notas</Text>
            <Text style={s.paragraph}>{quote.notes}</Text>
          </View>
        ) : null}

        <View style={s.footer} fixed>
          <Text>
            {issuer.name} · Cotización {quote.number}
          </Text>
          <Text render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
