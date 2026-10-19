import Image from "next/image";
import QuoteApp from "@/components/QuoteApp";

export default function Home() {
  return (
    <main className="container">
      <header className="top">
        <div className="brand">
          <Image
            src="/logo.png"
            alt="SatCore Solutions"
            width={200}
            height={65}
            className="brand-logo"
            priority
          />

          <div>
            <div className="brand-tagline">
              Soluciones digitales seguras, accesibles y funcionales para todos.
            </div>
          </div>
        </div>

        <div className="top-content">
          <h1>Generador de cotizaciones</h1>
          <p className="muted">
            Llena los datos, revisa los totales y descarga tu cotización en PDF.
          </p>
        </div>
      </header>

      <QuoteApp />
    </main>
  );
}