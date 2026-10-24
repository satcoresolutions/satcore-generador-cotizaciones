import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { Quote, Totals } from "@/lib/types";
import { addDays, formatCOP, formatDate } from "@/lib/calc";

const PRIMARY = "#132A8E";
const FOREGROUND = "#1B1F27";
const MUTED = "#6B7280";
const BORDER = "#E5E7EB";
const SURFACE = "#F5F6FA";
const WHITE = "#FFFFFF";

const s = StyleSheet.create({
  page: {
    paddingTop: 38,
    paddingHorizontal: 40,
    paddingBottom: 58,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: FOREGROUND,
    backgroundColor: WHITE,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 26,
    gap: 16,
  },

  issuer: {
    maxWidth: "58%",
    flexGrow: 1,
  },

  logo: {
    width: 90,
    height: 54,
    objectFit: "contain",
    marginBottom: 9,
  },

  issuerName: {
    fontSize: 15,
    fontFamily: "Helvetica-Bold",
    color: PRIMARY,
    marginBottom: 3,
  },

  small: {
    fontSize: 8.5,
    color: MUTED,
    marginTop: 3,
    lineHeight: 1.35,
  },

  quoteBox: {
    alignItems: "flex-end",
    maxWidth: "42%",
  },

  title: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: PRIMARY,
    marginBottom: 5,
  },

  quoteMeta: {
    marginTop: 4,
    fontSize: 8.5,
    textAlign: "right",
    color: MUTED,
  },

  quoteMetaStrong: {
    color: FOREGROUND,
    fontFamily: "Helvetica-Bold",
  },

  clientBox: {
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 6,
    padding: 13,
    marginBottom: 22,
  },

  label: {
    fontSize: 7.5,
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 5,
  },

  clientName: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: FOREGROUND,
    marginBottom: 2,
  },

  tableHead: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PRIMARY,
    color: WHITE,
    paddingVertical: 9,
    paddingHorizontal: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 9,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },

  cNum: {
    width: "6%",
  },

  cDesc: {
    width: "42%",
    paddingRight: 8,
  },

  cQty: {
    width: "12%",
    textAlign: "right",
  },

  cPrice: {
    width: "20%",
    textAlign: "right",
    paddingLeft: 4,
  },

  cTotal: {
    width: "20%",
    textAlign: "right",
    paddingLeft: 4,
    fontFamily: "Helvetica-Bold",
  },

  totalsWrap: {
    alignItems: "flex-end",
    marginTop: 16,
  },

  totals: {
    width: "52%",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    fontSize: 8.5,
  },

  totalLabel: {
    color: MUTED,
  },

  grand: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: PRIMARY,
    color: WHITE,
    borderRadius: 4,
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
  },

  section: {
    marginTop: 22,
  },

  sectionTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: PRIMARY,
    marginBottom: 7,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  paragraph: {
    fontSize: 9,
    lineHeight: 1.5,
    color: FOREGROUND,
  },

  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 7.5,
    color: MUTED,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 8,
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
    <Document
      title={`Cotización ${quote.number}`}
      author={issuer.name || "SatCore Solutions"}
      subject="Cotización comercial"
    >
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View style={s.issuer}>
            {quote.logo ? (
              <Image src={quote.logo} style={s.logo} />
            ) : null}

            <Text style={s.issuerName}>
              {issuer.name || "Tu empresa"}
            </Text>

            {issuer.nit ? (
              <Text style={s.small}>NIT: {issuer.nit}</Text>
            ) : null}

            {issuer.address ? (
              <Text style={s.small}>{issuer.address}</Text>
            ) : null}

            {issuer.phone ? (
              <Text style={s.small}>Tel.: {issuer.phone}</Text>
            ) : null}

            {issuer.email ? (
              <Text style={s.small}>{issuer.email}</Text>
            ) : null}
          </View>

          <View style={s.quoteBox}>
            <Text style={s.title}>COTIZACIÓN</Text>

            <Text style={s.quoteMeta}>
              N.º{" "}
              <Text style={s.quoteMetaStrong}>{quote.number}</Text>
            </Text>

            <Text style={s.quoteMeta}>
              Fecha: {formatDate(quote.date)}
            </Text>

            <Text style={s.quoteMeta}>
              Válida hasta: {formatDate(validUntil)}
            </Text>
          </View>
        </View>

        <View style={s.clientBox}>
          <Text style={s.label}>Cotizado a</Text>

          <Text style={s.clientName}>
            {client.name || "Cliente"}
          </Text>

          {client.nit ? (
            <Text style={s.small}>NIT / CC: {client.nit}</Text>
          ) : null}

          {client.address ? (
            <Text style={s.small}>{client.address}</Text>
          ) : null}

          {client.phone ? (
            <Text style={s.small}>Tel.: {client.phone}</Text>
          ) : null}

          {client.email ? (
            <Text style={s.small}>{client.email}</Text>
          ) : null}
        </View>

        <View style={s.tableHead}>
          <Text style={s.cNum}>#</Text>
          <Text style={s.cDesc}>Descripción</Text>
          <Text style={s.cQty}>Cant.</Text>
          <Text style={s.cPrice}>Precio unit.</Text>
          <Text style={s.cTotal}>Total</Text>
        </View>

        {quote.items.map((item, index) => (
          <View key={item.id} style={s.row} wrap={false}>
            <Text style={s.cNum}>{index + 1}</Text>
            <Text style={s.cDesc}>
              {item.description || "—"}
            </Text>
            <Text style={s.cQty}>{item.quantity}</Text>
            <Text style={s.cPrice}>
              {formatCOP(item.unitPrice)}
            </Text>
            <Text style={s.cTotal}>
              {formatCOP(item.quantity * item.unitPrice)}
            </Text>
          </View>
        ))}

        <View style={s.totalsWrap} wrap={false}>
          <View style={s.totals}>
            <View style={s.totalRow}>
              <Text style={s.totalLabel}>Subtotal</Text>
              <Text>{formatCOP(totals.subtotal)}</Text>
            </View>

            {quote.discountPct > 0 ? (
              <View style={s.totalRow}>
                <Text style={s.totalLabel}>
                  Descuento ({quote.discountPct}%)
                </Text>
                <Text>- {formatCOP(totals.discount)}</Text>
              </View>
            ) : null}

            {quote.taxPct > 0 ? (
              <View style={s.totalRow}>
                <Text style={s.totalLabel}>
                  IVA ({quote.taxPct}%)
                </Text>
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
            {issuer.name || "SatCore Solutions"} · Cotización{" "}
            {quote.number}
          </Text>

          <Text
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}