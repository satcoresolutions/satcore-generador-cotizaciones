import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Generador de cotizaciones",
  description: "Crea cotizaciones profesionales en PDF en segundos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
