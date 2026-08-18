# Amparo Salud

Landing page para **Amparo Salud**, servicios legales de amparos de salud frente a prepagas y obras sociales (Entre Ríos y Santa Fe Capital, Argentina). Formulario de contacto con notificación por EmailJS y toasts de confirmación.

Este proyecto está construido con **React + Vite** con HMR y algunas reglas de ESLint.

Actualmente hay dos plugins oficiales disponibles:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) usa [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) usa [SWC](https://swc.rs/)

## Stack

- **Framework:** React 19 + Vite
- **Estilos:** Tailwind CSS v4 (`@tailwindcss/vite`, sin archivo de configuración), soporte Dark/Light Mode
- **Íconos:** `lucide-react`
- **Notificaciones:** `react-hot-toast`
- **Envío de formulario:** `@emailjs/browser`
- **Backend/Storage (pendiente de integrar):** Firebase (Firestore / Auth)

## Comandos

- `npm run dev` — levanta el servidor de desarrollo de Vite con HMR
- `npm run build` — build de producción (salida en `dist/`)
- `npm run preview` — previsualiza el build de producción localmente
- `npm run lint` — corre ESLint sobre el proyecto

No hay test runner configurado todavía.

## Estructura

- `src/main.jsx` — entry point, monta `<App />` en `#root`.
- `src/App.jsx` — layout principal: renderiza `<Toaster />`, `Header` y `Hero`.
- `src/components/Header.jsx` — marca + botón de toggle de tema.
- `src/components/Hero.jsx` — contenido de landing/propuesta de valor, renderiza `ContactForm`.
- `src/components/ContactForm.jsx` — formulario de captación de leads; envía por EmailJS usando `VITE_EMAILJS_SERVICE_ID` / `VITE_EMAILJS_TEMPLATE_ID` / `VITE_EMAILJS_PUBLIC_KEY` desde `.env.local`, y muestra el resultado con `react-hot-toast`. La persistencia en Firestore todavía no está integrada.
- `src/hooks/useTheme.js` — estado del tema (`light`/`dark`), persistido en `localStorage` bajo `amparo-salud-theme`, con default en `prefers-color-scheme`.
- `src/index.css` — hoja de estilos global única (`@import "tailwindcss";`).

Todavía no existen router, librería de manejo de estado ni `src/firebase/` — se incorporan solo cuando el Mini-CRM privado (pendiente) lo requiera.

## Variables de entorno

Crear `.env.local` con:

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

## React Compiler

El React Compiler no está habilitado en este template por su impacto en el rendimiento de dev & build. Para agregarlo, ver [esta documentación](https://react.dev/learn/react-compiler/installation).

## Expandiendo la configuración de ESLint

Si estás desarrollando una aplicación de producción, recomendamos usar TypeScript con reglas de lint type-aware habilitadas. Revisá el [template de TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) para integrar TypeScript y [`typescript-eslint`](https://typescript-eslint.io) en tu proyecto.
