# Sarthak Walke Portfolio

Production-ready 3D interactive portfolio website built with Vite + React + TypeScript.

## Stack

- React + TypeScript (Vite)
- Three.js (interactive WebGL hero scene)

## Setup

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (default `http://localhost:5173`).

## Build and Preview

```bash
npm run lint
npm run build
npm run preview
```

## Editing Portfolio Content

All primary profile/project content is centralized in:

- `/home/runner/work/sarthakwalke-portfolio/sarthakwalke-portfolio/src/data/portfolio.ts`

Update this module to change bio text, skills, projects, education/experience, certifications, and social links.

## Accessibility and Fallbacks

- Keyboard-friendly sticky navigation + skip link
- Semantic section headings and contrast-conscious dark theme
- `prefers-reduced-motion` handling to simplify animation
- WebGL capability/error fallback so content stays usable without 3D rendering

## Deployment

This is a static site. You can deploy the `dist/` output from `npm run build` to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc.).
