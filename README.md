# SatCore Solutions — Generador de Cotizaciones

Microapp de SatCore Solutions para crear cotizaciones comerciales profesionales y descargarlas en PDF. Desarrollada con **Next.js, TypeScript y `@react-pdf/renderer`**, con una interfaz en modo oscuro y una identidad visual basada en los colores corporativos de SatCore.

La aplicación no requiere backend ni base de datos. La información se almacena localmente en el navegador mediante `localStorage`.

## Características

- **Datos empresariales:** configuración de la empresa, información de contacto y logo.
- **Datos del cliente:** registro de la información necesaria para cada cotización.
- **Gestión de productos y servicios:** descripción, cantidades y precios unitarios.
- **Cálculos automáticos:** subtotales, descuentos, IVA y total final.
- **Moneda:** valores expresados en pesos colombianos (COP).
- **Documentos PDF:** vista previa y descarga de cotizaciones.
- **Autoguardado:** conservación del borrador en el navegador.
- **Historial:** consultar, abrir, duplicar y eliminar cotizaciones.
- **Numeración automática:** identificadores consecutivos con el formato `COT-0001`, `COT-0002`, etc.
- **Diseño adaptable:** interfaz organizada para facilitar el uso de la herramienta.

## Tecnologías

- [Next.js](https://nextjs.org/) — framework de React.
- [React](https://react.dev/) — construcción de la interfaz.
- [TypeScript](https://www.typescriptlang.org/) — tipado estático.
- [`@react-pdf/renderer`](https://react-pdf.org/) — generación de documentos PDF.
- `localStorage` — almacenamiento local en el navegador.

## Requisitos

- Node.js compatible con la versión de Next.js utilizada.
- npm.
- Git para el control de versiones.

## Instalación y ejecución

Clona el repositorio y entra en el directorio del proyecto:

```bash
git clone https://github.com/satcoresolutions/satcore-generador-cotizaciones
cd satcore-generador-cotizaciones
```

Instala las dependencias:

```bash
npm install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Compilación para producción

Genera la compilación de producción:

```bash
npm run build
```

Para ejecutar la aplicación compilada:

```bash
npm start
```

## Estructura del proyecto

```text
app/
  layout.tsx
  page.tsx
  globals.css

components/
  QuoteApp.tsx
  QuotePDF.tsx
  PdfActions.tsx

lib/
  calc.ts
```

La estructura representa los módulos principales; pueden existir archivos adicionales según la implementación del proyecto.

- `app/`: configuración, página principal y estilos globales.
- `components/QuoteApp.tsx`: interfaz y gestión de las cotizaciones.
- `components/QuotePDF.tsx`: diseño y estructura del documento PDF.
- `components/PdfActions.tsx`: acciones de vista previa y descarga.
- `lib/calc.ts`: funciones de cálculo y formato de importes.

## Personalización

### Identidad visual

Los colores corporativos de SatCore se definen a partir de esta paleta:

| Elemento         | Color     |
| ---------------- | --------- |
| Azul Sat         | `#132A8E` |
| Verde Core       | `#1BFF3C` |
| Fondo oscuro     | `#0A0A0A` |
| Paneles          | `#111827` |
| Texto principal  | `#FFFFFF` |
| Texto secundario | `#6B7280` |

Los estilos de la interfaz se pueden modificar en `app/globals.css`. El diseño del PDF se personaliza en `components/QuotePDF.tsx`, mediante sus constantes de color y reglas de estilo.

### Moneda y cálculos

- **Moneda:** función `formatCOP` en `lib/calc.ts`.
- **IVA y valores predeterminados:** configuración inicial de la cotización en `components/QuoteApp.tsx`.
- **Formato de cotización:** estructura y estilos de `components/QuotePDF.tsx`.

Verifica los nombres y las ubicaciones exactas en el código si tu implementación difiere de esta estructura.

## Publicación

La aplicación se puede desplegar en [Vercel](https://vercel.com) conectando el repositorio de GitHub. Vercel detecta automáticamente la configuración habitual de Next.js.

1. Sube el proyecto a GitHub.
2. Importa el repositorio en Vercel.
3. Verifica la configuración de compilación.
4. Ejecuta el despliegue.
5. Comprueba la generación y descarga de los PDF en producción.

## Almacenamiento y privacidad

La aplicación utiliza `localStorage` para conservar los datos en el navegador. Por tanto:

- Los datos no se sincronizan automáticamente entre dispositivos o navegadores.
- Borrar los datos del navegador puede eliminar las cotizaciones guardadas.
- No existe una copia de seguridad centralizada por parte de la aplicación.
- Se recomienda exportar o conservar los documentos importantes de forma segura.

## Marca

**SatCore Solutions**

_Soluciones digitales seguras, accesibles y funcionales para todos._

Microapps y herramientas digitales diseñadas para facilitar tareas comerciales y operativas.

---

Desarrollado como parte del ecosistema de soluciones digitales de **SatCore Solutions**.
