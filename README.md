 <div align="center">

<img src="./public/logo.png" alt="SatCore Solutions" width="220" />

# SatCore Solutions — Generador de Cotizaciones

**Microapp para crear cotizaciones comerciales profesionales y descargarlas en PDF.**

Herramienta digital para elaborar, calcular, gestionar y generar cotizaciones comerciales en pesos colombianos (COP), con almacenamiento local, historial de documentos e interfaz adaptable en modo oscuro.

---

### SOFTWARE AND TECHNOLOGY CORE SOLUTIONS

**SATCORE SOLUTIONS**

*Soluciones digitales seguras, accesibles y funcionales para todos.*

[![License](https://img.shields.io/badge/License-SCSAL%201.0-000000.svg)](./LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-SatCore%20Solutions-181717?logo=github)](https://github.com/satcoresolutions)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![React PDF](https://img.shields.io/badge/PDF-%40react--pdf%2Frenderer-8A2BE2)](https://react-pdf.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-Package_Manager-CB3837?logo=npm)](https://www.npmjs.com/)

</div>

---

# Sobre el proyecto

**SatCore Solutions — Generador de Cotizaciones** es una microaplicación desarrollada originalmente por **SatCore Solutions**, dentro del ecosistema de soluciones tecnológicas de **SOFTWARE AND TECHNOLOGY CORE SOLUTIONS**.

Su propósito es facilitar la elaboración de cotizaciones comerciales mediante una interfaz centralizada que permite registrar los datos empresariales y del cliente, administrar productos y servicios, calcular importes y generar documentos PDF listos para su consulta o descarga.

La aplicación busca simplificar las tareas comerciales y operativas relacionadas con la preparación de cotizaciones, reducir errores en los cálculos y facilitar la conservación y consulta de los documentos generados.

El proyecto utiliza Next.js, React, TypeScript y `@react-pdf/renderer`. No requiere un backend ni una base de datos centralizada para las funciones descritas. La información de las cotizaciones se conserva localmente en el navegador mediante `localStorage`.

Este repositorio forma parte de los proyectos tecnológicos propios de **SatCore Solutions** y puede utilizarse, estudiarse, modificarse y redistribuirse conforme a los términos establecidos en la **SatCore Solutions Attribution License — SCSAL 1.0**.

---

# SatCore Solutions

**SOFTWARE AND TECHNOLOGY CORE SOLUTIONS**

**Nombre comercial:** SatCore Solutions

**Eslogan:**

> *Soluciones digitales seguras, accesibles y funcionales para todos.*

SatCore Solutions desarrolla soluciones digitales orientadas al software, la automatización, la inteligencia artificial, la ciberseguridad, la formación tecnológica y las herramientas digitales.

El ecosistema se estructura alrededor de cinco áreas principales:

### Desarrollo

Creación de sitios web, aplicaciones, herramientas digitales, plataformas y soluciones de software.

### Automatizador

Automatización de procesos, agentes inteligentes, integración de APIs y sistemas capaces de ejecutar tareas de manera automatizada.

### Seguridad

Ciberseguridad, auditoría, análisis de vulnerabilidades, hardening, monitoreo y protección de sistemas.

### Estudio

Formación, documentación, recursos educativos, tutoriales y proyectos orientados al aprendizaje tecnológico.

### Marketing

Diseño de marca, presencia digital, contenido tecnológico, analítica y herramientas digitales para comunicación y posicionamiento.

El Generador de Cotizaciones se integra principalmente en el área de **Desarrollo**, como una herramienta digital orientada a facilitar los procesos comerciales y la gestión documental.

---

# Características

La aplicación incluye las siguientes funcionalidades:

- **Configuración empresarial:** registro de la información de la empresa, datos de contacto y logotipo.
- **Información del cliente:** captura de los datos necesarios para identificar al destinatario de una cotización.
- **Gestión de productos y servicios:** incorporación de descripciones, cantidades y precios unitarios.
- **Cálculos automáticos:** cálculo de subtotales, descuentos, IVA y total final.
- **Moneda colombiana:** presentación y formato de los importes en pesos colombianos (COP).
- **Generación de documentos PDF:** creación, vista previa y descarga de cotizaciones comerciales.
- **Autoguardado local:** conservación del borrador en el almacenamiento del navegador.
- **Historial de cotizaciones:** consulta, apertura, duplicación y eliminación de documentos guardados.
- **Numeración automática:** asignación de identificadores consecutivos con el formato `COT-0001`, `COT-0002` y sucesivos.
- **Interfaz en modo oscuro:** presentación visual basada en la identidad corporativa de SatCore Solutions.
- **Diseño adaptable:** organización de la interfaz para facilitar el uso de la herramienta en diferentes tamaños de pantalla.
- **Funcionamiento sin backend propio:** gestión local de las cotizaciones sin requerir un servidor de aplicaciones ni una base de datos centralizada.

Las características anteriores corresponden a la funcionalidad descrita para el proyecto. El comportamiento específico puede variar según la implementación y la versión del código.

---

# Tecnologías

El proyecto utiliza las siguientes tecnologías y herramientas:

- [Next.js](https://nextjs.org/): framework de React para la construcción de aplicaciones web.
- [React](https://react.dev/): biblioteca para desarrollar interfaces de usuario.
- [TypeScript](https://www.typescriptlang.org/): lenguaje con tipado estático para JavaScript.
- [@react-pdf/renderer](https://react-pdf.org/): biblioteca para generar documentos PDF mediante componentes de React.
- `localStorage`: mecanismo de almacenamiento local proporcionado por el navegador.
- [Node.js](https://nodejs.org/): entorno de ejecución requerido para el desarrollo y la ejecución de los comandos del proyecto.
- [npm](https://www.npmjs.com/): administrador de paquetes utilizado para instalar dependencias y ejecutar scripts.
- [Git](https://git-scm.com/): sistema de control de versiones.

### Tecnologías principales

| Tecnología | Función |
| --- | --- |
| Next.js | Estructura y ejecución de la aplicación web. |
| React | Construcción de la interfaz y sus componentes. |
| TypeScript | Tipado y organización del código. |
| `@react-pdf/renderer` | Diseño y generación de documentos PDF. |
| `localStorage` | Persistencia local de los datos. |
| CSS | Estilos de la interfaz e identidad visual. |

La disponibilidad y las versiones exactas de las dependencias deben verificarse en `package.json` y en el archivo de bloqueo del proyecto.

---

# Requisitos

Antes de instalar y ejecutar la aplicación, asegúrate de disponer de las siguientes herramientas:

- **Node.js:** versión compatible con la versión de Next.js declarada en el proyecto.
- **npm:** administrador de paquetes compatible con la instalación de dependencias.
- **Git:** necesario para clonar el repositorio y administrar el código fuente.
- **Navegador moderno:** compatible con las funcionalidades web utilizadas por la aplicación, incluido `localStorage`.
- **Conexión a Internet:** necesaria para clonar el repositorio e instalar las dependencias. El uso de la aplicación después de su instalación dependerá de los recursos y servicios que incorpore la implementación.

No se requiere configurar una base de datos ni un backend propio para las funcionalidades locales descritas.

---

# Instalación

Clona el repositorio oficial:

```bash
git clone https://github.com/satcoresolutions/satcore-generador-cotizaciones.git
```

Accede al directorio del proyecto:

```bash
cd satcore-generador-cotizaciones
```

Instala las dependencias:

```bash
npm install
```

Verifica que la instalación finalice correctamente antes de continuar.

Si el proyecto utiliza un archivo de bloqueo, como `package-lock.json`, se recomienda conservarlo en el repositorio para facilitar instalaciones reproducibles.

---

# Configuración

El proyecto utiliza una configuración propia de una aplicación Next.js.

Para su funcionamiento habitual en desarrollo, no se requiere configurar credenciales de bases de datos ni servicios backend, de acuerdo con la arquitectura descrita.

### Configuración general

Revisa los siguientes archivos:

- `package.json`: dependencias y comandos disponibles.
- `next.config.ts`, `next.config.js` o `next.config.mjs`, si existe: configuración de Next.js.
- `tsconfig.json`: configuración de TypeScript.
- `app/globals.css`: estilos globales e identidad visual.
- `components/QuoteApp.tsx`: lógica de interacción y gestión de las cotizaciones.
- `components/QuotePDF.tsx`: estructura y presentación de los documentos PDF.
- `lib/calc.ts`: funciones de cálculo y formato de importes.

Los nombres y las ubicaciones anteriores corresponden a la estructura proporcionada para este proyecto y deben contrastarse con el código real.

### Variables de entorno

No se han especificado variables de entorno obligatorias para la versión descrita.

Si una versión posterior incorpora servicios externos, autenticación, APIs u otras integraciones, deberán documentarse aquí las variables necesarias y su propósito.

**Nunca publiques credenciales, tokens, claves privadas, contraseñas u otros secretos en el repositorio.**

---

# Desarrollo

Para ejecutar la aplicación en modo desarrollo:

```bash
npm run dev
```

Una vez iniciado el servidor, abre la siguiente dirección en el navegador:

```text
http://localhost:3000
```

Desde la interfaz podrás trabajar con las funciones disponibles para registrar información empresarial, administrar clientes, preparar cotizaciones y generar los documentos correspondientes.

Si el puerto 3000 está ocupado, Next.js puede utilizar otro puerto disponible. En ese caso, utiliza la dirección indicada por la terminal.

Para detener el servidor, utiliza `Ctrl + C` en la terminal donde se está ejecutando.

---

# Producción

Antes de desplegar una versión de producción, comprueba que las dependencias estén instaladas y que la configuración del proyecto sea correcta.

### Generar la compilación

```bash
npm run build
```

Este comando ejecuta el proceso de compilación definido por el proyecto.

### Iniciar la aplicación

```bash
npm start
```

El comando de inicio requiere que el proyecto tenga definido el script `start` correspondiente en `package.json` y que la compilación de producción se haya generado previamente.

### Verificaciones recomendadas

Antes de publicar una versión:

1. Comprueba que la compilación finalice correctamente.
2. Verifica el registro y la edición de los datos.
3. Comprueba los cálculos de subtotales, descuentos, IVA y total.
4. Genera una cotización y valida su presentación en PDF.
5. Comprueba la descarga de los documentos.
6. Verifica la persistencia de los datos después de recargar la página.
7. Prueba las funciones del historial de cotizaciones.
8. Revisa el comportamiento de la interfaz en diferentes tamaños de pantalla.

---

# Estructura del proyecto

La estructura principal proporcionada para el proyecto es la siguiente:

```text
satcore-generador-cotizaciones/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── QuoteApp.tsx
│   ├── QuotePDF.tsx
│   └── PdfActions.tsx
│
├── lib/
│   └── calc.ts
│
├── public/
│   └── logo.png
│
├── LICENSE
├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
└── ...
```

La estructura es ilustrativa. Algunos archivos, directorios o configuraciones pueden variar según la versión real del repositorio.

### Directorio `app/`

Contiene los elementos principales de la aplicación Next.js.

- `layout.tsx`: estructura compartida y configuración general del diseño.
- `page.tsx`: página principal de la aplicación.
- `globals.css`: estilos globales, colores y presentación visual.

### Directorio `components/`

Agrupa los componentes de la interfaz y la generación de documentos.

- `QuoteApp.tsx`: interfaz principal y gestión de las cotizaciones.
- `QuotePDF.tsx`: diseño y estructura visual de la cotización PDF.
- `PdfActions.tsx`: acciones relacionadas con la vista previa y la descarga de documentos.

### Directorio `lib/`

Contiene funciones auxiliares y lógica reutilizable.

- `calc.ts`: funciones de cálculo, operaciones sobre importes y formato de valores monetarios.

### Directorio `public/`

Almacena recursos estáticos accesibles desde la aplicación.

- `logo.png`: logotipo utilizado por la interfaz o por los elementos que lo referencien.

### Archivos de configuración

- `package.json`: metadatos, scripts y dependencias.
- `package-lock.json`: registro de versiones de dependencias instaladas mediante npm, cuando se utiliza este archivo.
- `tsconfig.json`: opciones de compilación y comprobación de TypeScript.
- `LICENSE`: términos de distribución y uso del proyecto.
- `README.md`: documentación principal del repositorio.

---

# Arquitectura

El Generador de Cotizaciones sigue una arquitectura de aplicación web centrada en el cliente, con separación entre la interfaz, las funciones de cálculo y la generación de documentos PDF.

La arquitectura descrita no requiere un backend ni una base de datos centralizada para las operaciones locales de la aplicación.

```text
Usuario
   │
   ▼
Interfaz web
Next.js / React
   │
   ▼
Gestión de cotizaciones
QuoteApp.tsx
   │
   ├───────────────┐
   ▼               ▼
Funciones de       Almacenamiento
cálculo            local
lib/calc.ts        localStorage
   │
   ▼
Generación del documento
QuotePDF.tsx
   │
   ▼
Vista previa y descarga
PdfActions.tsx
```

### Interfaz de usuario

La interfaz permite introducir y administrar los datos necesarios para preparar una cotización.

### Lógica de aplicación

La gestión de productos, servicios, cantidades, precios, descuentos, impuestos y totales se realiza mediante la lógica implementada en los componentes y funciones auxiliares.

### Persistencia local

La información se conserva en `localStorage`, de acuerdo con la implementación descrita. Este almacenamiento no equivale a una base de datos compartida ni proporciona sincronización automática entre dispositivos.

### Generación de documentos

`@react-pdf/renderer` permite construir los documentos PDF a partir de los componentes y los datos de la cotización.

La generación, vista previa y descarga dependen de la implementación de los componentes correspondientes y de la compatibilidad del entorno de ejecución.

---

# Datos y privacidad

La aplicación utiliza almacenamiento local del navegador mediante `localStorage` para conservar la información de las cotizaciones.

La información gestionada puede incluir datos empresariales, información de contacto, datos de clientes, descripciones de productos o servicios, cantidades, precios, descuentos, impuestos y totales comerciales.

### Funcionamiento del almacenamiento

- Los datos guardados permanecen asociados al origen del sitio web y al perfil del navegador utilizado.
- Los datos no se sincronizan automáticamente entre dispositivos o navegadores.
- El almacenamiento local no constituye una copia de seguridad centralizada.
- Borrar los datos del sitio, limpiar el almacenamiento del navegador o utilizar otro perfil puede provocar que la información guardada deje de estar disponible.
- La disponibilidad de los datos depende del navegador, del dispositivo y de la implementación de la persistencia.
- Los documentos PDF descargados se conservan de acuerdo con la ubicación y las condiciones de almacenamiento elegidas por el usuario.

### Responsabilidad sobre los datos

El usuario debe verificar la exactitud de la información introducida antes de generar o compartir una cotización.

Se recomienda:

- conservar copias seguras de los documentos importantes;
- evitar introducir información que no sea necesaria para elaborar una cotización;
- proteger el acceso al dispositivo y al perfil del navegador;
- revisar los documentos antes de enviarlos a sus destinatarios;
- eliminar de forma segura los archivos que ya no deban conservarse;
- evitar utilizar dispositivos compartidos o no confiables para gestionar información comercial confidencial.

El almacenamiento en `localStorage` no debe considerarse cifrado por defecto ni un mecanismo de protección de datos sensibles.

La aplicación no debe interpretarse como un sistema de respaldo, archivo empresarial centralizado o plataforma de sincronización.

Si una versión futura incorpora APIs, analítica, autenticación, servicios externos o almacenamiento remoto, deberán documentarse los datos transmitidos, sus finalidades y las medidas de protección correspondientes.

---

# Seguridad

La seguridad forma parte de los principios de desarrollo de SatCore Solutions.

Aunque el proyecto no requiere un backend propio para las funciones descritas, su uso implica gestionar información comercial que puede ser confidencial.

Se recomienda:

- mantener actualizadas las dependencias;
- revisar las vulnerabilidades conocidas de los paquetes utilizados;
- validar los datos introducidos antes de realizar cálculos o generar documentos;
- evitar la exposición innecesaria de información personal o comercial;
- proteger el acceso al dispositivo y al navegador;
- no almacenar secretos, contraseñas ni credenciales en `localStorage`;
- verificar los documentos generados antes de compartirlos;
- revisar las configuraciones de despliegue y los recursos publicados;
- comprobar que las versiones distribuidas no incluyan datos reales de clientes ni información privada.

La ausencia de un backend no elimina todos los riesgos de seguridad. Los datos almacenados en el navegador pueden quedar expuestos si un tercero obtiene acceso al dispositivo, al perfil del navegador o a la ejecución de la aplicación.

### Reporte de vulnerabilidades

Si encuentras una vulnerabilidad relacionada con este proyecto, evita publicar detalles técnicos sensibles de forma pública antes de que pueda ser evaluada.

**Email:** satcoresolutions@gmail.com

Incluye, cuando sea posible:

- descripción del problema;
- impacto potencial;
- pasos generales para reproducirlo;
- versión afectada;
- información adicional relevante.

No incluyas credenciales reales ni información personal innecesaria.

---

# Desarrollo y contribuciones

Las contribuciones, correcciones, mejoras y adaptaciones son bienvenidas siempre que respeten la licencia del proyecto.

Se recomienda mantener una estructura de código coherente, utilizar TypeScript de manera consistente y separar las responsabilidades de la interfaz, los cálculos y la generación de documentos.

### Recomendaciones para contribuir

1. Revisa la estructura y la documentación del repositorio.
2. Identifica el componente o módulo relacionado con el cambio.
3. Mantén la compatibilidad con la arquitectura existente.
4. Verifica los cálculos monetarios y los resultados generados.
5. Comprueba la generación y descarga de los PDF.
6. Ejecuta las verificaciones y la compilación disponibles.
7. Documenta los cambios funcionales relevantes.

Las contribuciones no eliminan ni sustituyen la autoría original de **SatCore Solutions**.

La aceptación, integración o distribución de contribuciones debe respetar las condiciones aplicables de la licencia y los derechos correspondientes.

---

# Proyectos derivados

Este proyecto puede utilizarse como base para desarrollar nuevas soluciones, de acuerdo con los términos de la SCSAL 1.0.

Dentro de los límites establecidos por la licencia, se permite:

- copiar;
- estudiar;
- modificar;
- adaptar;
- ampliar;
- integrar;
- redistribuir;
- utilizar comercialmente;
- crear proyectos derivados.

Los proyectos derivados deberán reconocer claramente a **SatCore Solutions** como fuente original cuando utilicen una parte sustancial del proyecto.

### Ejemplo de atribución

> Basado en SatCore Solutions — Generador de Cotizaciones, desarrollado originalmente por SatCore Solutions.

Cuando sea posible, deberá incluirse también un enlace al repositorio original:

```text
https://github.com/satcoresolutions/satcore-generador-cotizaciones
```

La atribución no deberá presentarse de manera que implique que SatCore Solutions respalda, patrocina, mantiene o garantiza un proyecto derivado cuando dicha relación no exista.

Las condiciones concretas de uso, modificación y redistribución serán las establecidas por el archivo `LICENSE`.

---

# Atribución

La atribución constituye una condición obligatoria de la licencia de este proyecto, conforme a los términos de la **SatCore Solutions Attribution License — SCSAL 1.0**.

Cuando el código sea copiado, modificado, integrado o redistribuido de manera sustancial, deberá conservarse una referencia razonablemente visible a **SatCore Solutions** como desarrollador original.

Una atribución válida puede adoptar, entre otras, la siguiente forma:

> Este proyecto está basado en SatCore Solutions — Generador de Cotizaciones, desarrollado originalmente por SatCore Solutions.

**Proyecto original:**

```text
https://github.com/satcoresolutions/satcore-generador-cotizaciones
```

**SatCore Solutions:**

```text
https://github.com/satcoresolutions
```

La atribución deberá conservar el reconocimiento de la autoría original sin inducir a confusión sobre la titularidad, el mantenimiento o el respaldo oficial del proyecto derivado.

Las modalidades y los requisitos exactos de atribución deben interpretarse conforme al texto completo de la licencia.

---

# Marca y propiedad intelectual

El código fuente de este proyecto está sujeto a la **SatCore Solutions Attribution License — SCSAL 1.0**, de acuerdo con los términos establecidos en el archivo `LICENSE`.

La licencia del código no transfiere automáticamente derechos sobre:

- SatCore Solutions;
- SOFTWARE AND TECHNOLOGY CORE SOLUTIONS;
- logotipos;
- identidad visual;
- nombres comerciales;
- marcas;
- dominios;
- elementos gráficos;
- otros signos distintivos asociados con SatCore Solutions.

El uso del código no constituye autorización para representar una relación oficial con SatCore Solutions.

La creación de un proyecto derivado tampoco otorga derechos para registrar o reclamar como propios los signos distintivos de SatCore Solutions.

El uso del nombre, logotipo o identidad visual fuera de los usos permitidos deberá evaluarse conforme a los derechos y las autorizaciones correspondientes.

---

# Dependencias de terceros

El proyecto utiliza bibliotecas y herramientas de terceros, entre ellas Next.js, React, TypeScript y `@react-pdf/renderer`, además de las dependencias adicionales que puedan estar declaradas en `package.json`.

Cada componente de terceros permanece sujeto a su propia licencia y a las condiciones aplicables de distribución y uso.

La **SCSAL 1.0** no modifica ni reemplaza las licencias de terceros.

Los usuarios, colaboradores y distribuidores deberán respetar las condiciones correspondientes a las dependencias utilizadas por el proyecto.

Para identificar las dependencias instaladas, sus versiones y sus licencias, consulta:

- `package.json`;
- `package-lock.json`, si existe;
- la documentación oficial de cada dependencia;
- los archivos de licencia distribuidos con los paquetes correspondientes.

La lista de tecnologías presentada en este documento no sustituye una auditoría completa de las dependencias del proyecto.

---

# Despliegue

El Generador de Cotizaciones puede desplegarse en plataformas compatibles con aplicaciones Next.js.

Una opción es [Vercel](https://vercel.com), aunque también pueden utilizarse otros proveedores compatibles con la arquitectura del proyecto.

### Procedimiento general

1. Sube el proyecto al repositorio de GitHub.
2. Importa el repositorio en la plataforma de despliegue.
3. Verifica la configuración de compilación y el comando de inicio.
4. Comprueba la versión de Node.js compatible con el proyecto.
5. Configura las variables de entorno que correspondan, si existen.
6. Ejecuta el despliegue.
7. Comprueba el funcionamiento de la aplicación publicada.
8. Verifica los cálculos, la generación de PDF, la descarga y el almacenamiento local.

### Consideraciones de producción

- `localStorage` está asociado al origen de la aplicación y al navegador del usuario.
- Los datos guardados en un entorno local o de pruebas no se transfieren automáticamente al dominio de producción.
- El cambio de dominio u origen puede hacer que el navegador no muestre los datos guardados bajo el origen anterior.
- Los documentos PDF descargados permanecen sujetos a la gestión de archivos del usuario.
- La disponibilidad del sitio depende de la plataforma de alojamiento y de su configuración.
- La plataforma de despliegue y sus servicios permanecen sujetos a sus propios términos y condiciones.

Antes de publicar una versión estable, verifica que el proceso de generación de documentos funcione correctamente en el entorno de producción.

---

# Estado del proyecto

**Estado:** En desarrollo o activo, según la situación real del repositorio.

**Versión:** Por confirmar en la configuración o en los registros de versiones del proyecto.

**Última actualización:** Consultar la fecha de la última actualización efectiva del repositorio.

Los valores definitivos deberán actualizarse cuando se confirme el estado de mantenimiento y la versión publicada.

---

# Roadmap

Las siguientes propuestas constituyen posibles líneas de evolución y no implican que estas funcionalidades estén implementadas actualmente.

- [ ] Mejorar la validación de los datos de clientes y productos.
- [ ] Ampliar las opciones de personalización de los documentos PDF.
- [ ] Incorporar opciones adicionales de presentación de cotizaciones.
- [ ] Mejorar las herramientas para exportar y respaldar la información.
- [ ] Fortalecer las verificaciones de integridad de los cálculos.
- [ ] Ampliar las pruebas de compatibilidad y funcionamiento en producción.
- [ ] Revisar las opciones futuras de migración o sincronización de datos, si las necesidades del proyecto lo justifican.

Las prioridades del roadmap podrán cambiar según las necesidades, los recursos disponibles y la evolución del proyecto.

---

# Licencia

Este proyecto se distribuye bajo:

## SatCore Solutions Attribution License — SCSAL 1.0

La licencia permite utilizar, estudiar, modificar, integrar y redistribuir el software, incluido su uso comercial, siempre que se respeten las condiciones de atribución y los demás términos establecidos en la licencia.

Consulta el archivo:

```text
LICENSE
```

para conocer los términos completos.

El presente README resume aspectos generales de la licencia, pero no reemplaza el texto legal completo. En caso de diferencias, deberán consultarse las disposiciones del archivo `LICENSE` distribuido con la versión correspondiente del proyecto.

Las dependencias de terceros permanecen sujetas a sus respectivas licencias.

---

# Autoría

## SatCore Solutions

**SOFTWARE AND TECHNOLOGY CORE SOLUTIONS**

*Soluciones digitales seguras, accesibles y funcionales para todos.*

**Proyecto:** SatCore Solutions — Generador de Cotizaciones

**Repositorio oficial:**

https://github.com/satcoresolutions/satcore-generador-cotizaciones

**GitHub:**

https://github.com/satcoresolutions

**Email:**

satcoresolutions@gmail.com

---

<div align="center">

**Desarrollado originalmente por SatCore Solutions.**

**© SatCore Solutions — Todos los derechos reservados, excepto los derechos concedidos mediante SCSAL 1.0.**

</div>
