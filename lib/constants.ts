import type { Item, Party, Quote, Totals } from "./types";

/** Configuración predeterminada de las cotizaciones */
export const QUOTE_DEFAULTS = {
  validDays: 15,
  discountPct: 0,
  taxPct: 19,
  paymentTerms: "Pago según acuerdo entre las partes.",
  notes: "",
} as const;

/** Configuración de numeración de cotizaciones */
export const QUOTE_NUMBERING = {
  prefix: "COT",
  digits: 4,
  initialValue: 1,
} as const;

/** Configuración regional y monetaria */
export const LOCALE = "es-CO";
export const CURRENCY = "COP";

/** Valores iniciales para un concepto de cotización */
export const DEFAULT_ITEM: Omit<Item, "id"> = {
  description: "",
  quantity: 1,
  unitPrice: 0,
};

/** Valores iniciales para los datos de una empresa o cliente */
export const DEFAULT_PARTY: Party = {
  name: "",
  nit: "",
  address: "",
  phone: "",
  email: "",
};

/** Valores iniciales para los totales */
export const EMPTY_TOTALS: Totals = {
  subtotal: 0,
  discount: 0,
  base: 0,
  tax: 0,
  total: 0,
};

/** Claves de almacenamiento local */
export const STORAGE_KEYS = {
  quotes: "satcore:cotizaciones",
  settings: "satcore:cotizaciones:ajustes",
  issuer: "satcore:cotizaciones:emisor",
} as const;

/** Clave de almacenamiento del tema */
export const THEME_KEY = "satcore-cotizaciones-theme";

/** Clases reutilizables de la interfaz */
export { ui } from "./ui";