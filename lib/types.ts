export interface Item {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Party {
  name: string;
  nit: string;
  address: string;
  phone: string;
  email: string;
}

export interface Quote {
  id: string;
  number: string;
  date: string; // YYYY-MM-DD
  validDays: number;
  issuer: Party;
  logo: string | null; // data URL
  client: Party;
  items: Item[];
  discountPct: number;
  taxPct: number;
  paymentTerms: string;
  notes: string;
}

export interface Totals {
  subtotal: number;
  discount: number;
  base: number;
  tax: number;
  total: number;
}
