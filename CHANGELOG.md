# Changelog

Todos los cambios importantes de **SatCore Solutions — Generador de Cotizaciones** serán documentados en este archivo.

El historial sigue una estructura basada en versiones y categorías de cambios, tomando como referencia las convenciones de [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

Este proyecto utiliza versionado semántico (Semantic Versioning) para identificar las versiones publicadas.

---

## [Unreleased]

### Added

- Mejoras futuras para la gestión de cotizaciones comerciales.
- Posibles mejoras en la personalización de los documentos PDF.
- Mejoras futuras para la exportación y conservación de los datos.

### Changed

- Las modificaciones futuras de la interfaz, los cálculos y la experiencia de usuario se documentarán en esta sección.

### Fixed

- Las correcciones de errores detectados durante el desarrollo y uso de la aplicación se registrarán aquí.

### Removed

- Las funcionalidades, componentes o dependencias que se retiren del proyecto se documentarán en esta sección.

### Security

- Las mejoras de seguridad, las actualizaciones de dependencias y las correcciones relacionadas con vulnerabilidades se registrarán aquí.

---

## [1.1.0] - 2026-10-21

### Added

- Lanzamiento inicial de SatCore Solutions — Generador de Cotizaciones.
- Interfaz web desarrollada con Next.js, React y TypeScript.
- Diseño visual en modo oscuro basado en la identidad corporativa de SatCore Solutions.
- Configuración de los datos empresariales, información de contacto y logotipo.
- Registro de la información necesaria para identificar a los clientes.
- Gestión de productos y servicios mediante descripciones, cantidades y precios unitarios.
- Cálculo automático de subtotales, descuentos, IVA y total final.
- Formato de importes en pesos colombianos (COP).
- Generación de documentos PDF mediante `@react-pdf/renderer`.
- Vista previa y descarga de cotizaciones comerciales en PDF.
- Autoguardado de borradores mediante `localStorage`.
- Historial local de cotizaciones.
- Funciones para consultar, abrir, duplicar y eliminar cotizaciones guardadas.
- Numeración automática de cotizaciones mediante identificadores consecutivos con el formato `COT-0001`, `COT-0002` y sucesivos.
- Organización del código en módulos para la interfaz, la generación de documentos PDF y las funciones de cálculo.
- Funcionamiento sin necesidad de un backend propio ni de una base de datos centralizada para las funcionalidades descritas.
- Documentación inicial de instalación, configuración, desarrollo, producción, privacidad, seguridad y despliegue.
- Referencia a la SatCore Solutions Attribution License — SCSAL 1.0, conforme al archivo `LICENSE`.

---

**Mantenimiento:** SatCore Solutions

**Repositorio:** https://github.com/satcoresolutions/satcore-generador-cotizaciones

**Licencia:** SatCore Solutions Attribution License — SCSAL 1.0
