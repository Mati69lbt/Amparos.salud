# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — production build (output to `dist/`)
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint over the project

There is no test runner configured yet.

## Architecture

React 19 + Vite scaffold (Tailwind CSS v4 via `@tailwindcss/vite`, no config file needed for Tailwind). Dark mode uses Tailwind's `dark:` class variant, toggled on `document.documentElement`.

- `src/main.jsx` — entry point, mounts `<App />` into `#root` (see `index.html`), wraps in `StrictMode`.
- `src/App.jsx` — top-level layout: renders `<Toaster />` (react-hot-toast), `Header`, `Hero`.
- `src/components/Header.jsx` — brand + theme toggle button, uses `useTheme`.
- `src/components/Hero.jsx` — landing pitch/value-prop content, renders `ContactForm`.
- `src/components/ContactForm.jsx` — the lead-capture form; on submit sends via EmailJS (`@emailjs/browser`) using `VITE_EMAILJS_SERVICE_ID`/`VITE_EMAILJS_TEMPLATE_ID`/`VITE_EMAILJS_PUBLIC_KEY` from `.env.local`, then shows a `react-hot-toast` result. Firestore persistence is not wired up yet — only the EmailJS notification exists today (see form requirements below for the intended full flow).
- `src/hooks/useTheme.js` — theme state (`light`/`dark`), persisted to `localStorage` under `amparo-salud-theme`, defaulting to `prefers-color-scheme`.
- `src/index.css` — single global stylesheet, just `@import "tailwindcss";`.
- No router, state management library, or `src/firebase/` integration exists yet — introduce these only as the app actually needs them (the private Mini-CRM described below is not built yet).

ESLint config (`eslint.config.js`) is flat-config style: `js.configs.recommended` + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` (Vite preset), browser globals, JSX enabled for `**/*.{js,jsx}`. `dist/` is ignored.


# Instructions for Amparo Salud Landing Page & Mini-CRM

## 📌 Project Overview
- **Brand Name:** Amparo Salud (Servicios legales para amparos de salud hacia prepagas y obras sociales).
- **Target Audience:** Afiliados que sufren aumentos desmedidos o faltas de cobertura en prepagas/obras sociales.
- **Geographic Scope:** Entre Ríos y Santa Fe Capital (Argentina).
- **Core Value Proposition:** Analizamos tu primera consulta de forma gratuita.
- **Primary Objective:** Captación directa de clientes a través de un formulario simple y efectivo.

---

## 🛠️ Tech Stack & Dependencies
- **Framework:** React + Vite
- **Styling:** Tailwind CSS (con soporte para Dark/Light Mode con toggle de sol/luna)
- **Icons:** `lucide-react`
- **Notifications:** `react-hot-toast`
- **Backend / Storage:** Firebase (Firestore / Auth)
- **Email Delivery:** EmailJS o similar (para enviar alertas simultáneas a Marcos y al Gmail oficial de Amparo Salud)
- **Deployment Target:** Vercel

---

## 🎨 Design & Layout Rules
1. **Tone:** Profesional, moderno, directo y sumamente confiable.
2. **Theme:** Modo Oscuro y Modo Claro (Toggle con icono de Sol ☀️ / Luna 🌙).
3. **Structure (Minimalist & Direct):**
   - **Public Landing Page:**
     - **Header:** Nombre/Logo "Amparo Salud", selector de tema (sol/luna) y enlace o acceso discreto.
     - **Hero + Form Section:** Todo en una sola vista limpia y libre de distracciones.
   - **Private Mini-CRM (Hidden Section):**
     - Ruta/vista oculta (solo accesible por contraseña/auth para el desarrollador Matias).
     - Visualización e historial de las consultas entrantes guardadas en Firebase.
4. **No WhatsApp Floating Button:** Todo el contacto pasa exclusivamente por el formulario.

---

## 📝 Form Requirements
- **Fields:**
  - Nombre completo (Requerido)
  - Teléfono / WhatsApp (Requerido)
  - Prepaga / Obra Social (Opcional)
  - Mensaje / Cuadro de texto con la consulta (Requerido)
- **Form Actions on Submit:**
  1. Guardar la consulta en **Firebase Firestore**.
  2. Enviar la notificación por **Email** a Marcos y al Gmail oficial de Amparo Salud.
  3. Disparar un **React Hot Toast** de éxito en la interfaz.

---

## 📁 Architecture
Mantener una estructura simple y limpia en `src/`:
- `src/components/`: Componentes modulares de la Landing, Formulario, Header y el CRM Oculto.
- `src/firebase/`: Configuración e integración con Firebase.
- `src/context/` o `src/hooks/`: Manejo de estado del tema (Dark/Light Mode) y autenticación rápida del CRM.

---

## ⚡ Specific AI Behaviors & Execution Rules
1. **Sound Effect / Bip:** Al finalizar cualquier tarea de generación de código o refactorización completa, ejecuta un sonido de confirmación o alerta terminal ("bip") automáticamente, sin preguntar.
2. **Code Style:** Escribir código limpio, funcional en React con JSX/JS, sin librerías de CSS innecesarias fuera de Tailwind.

## 🤖 Autonomous Execution & Noise-Reduction Rules

1. **Be Autonomous (Don't Ask Unnecessary Questions):**
   - Do NOT ask for confirmation regarding minor linting, ESLint fixes, or standard `npm` tasks.
   - Execute necessary build and check commands (`npm run dev`, `npm run build`, linting) automatically when relevant.
   - Make sensible defaults and proceed without prompting for non-critical developer decisions.

2. **Completion Bell / Terminal Bip:**
   - At the end of completing a task or code generation, ALWAYS trigger a terminal bell sound by echoing the ASCII bell character (`echo -e "\a"` or printing `\x07` to stdout) to alert the user.