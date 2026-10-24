/**
 * Configuración central de SEO.
 * Define NEXT_PUBLIC_SITE_URL en producción.
 */
export const SITE = {
  name: "Generador de cotizaciones",
  brand: "SatCore Solutions",

  description:
    "Crea cotizaciones profesionales en PDF en segundos. Registra los datos de tus clientes, agrega productos o servicios, calcula subtotales e impuestos y genera documentos listos para compartir con tus clientes.",

  shortDescription:
    "Crea, calcula y exporta cotizaciones profesionales en PDF para tu negocio.",

  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/+$/,
    "",
  ),

  locale: "es_CO",
  language: "es-CO",
  themeColor: "#132a8e",

  keywords: [
    "generador de cotizaciones",
    "crear cotizaciones en PDF",
    "cotizaciones profesionales",
    "generador de presupuestos",
    "cotizar productos y servicios",
    "plantillas de cotización",
    "cotizaciones para pequeños negocios",
    "cotizaciones para emprendedores",
    "crear presupuestos comerciales",
    "calcular subtotales e impuestos",
    "documentos comerciales en PDF",
    "herramienta para generar cotizaciones",
    "gestión de cotizaciones",
    "SatCore Solutions",
  ],
} as const;

/**
 * Convierte una ruta relativa en una URL absoluta.
 */
export const absoluteUrl = (path = "/") =>
  `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
