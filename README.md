# Jason Quach — Portfolio

Personal portfolio website showcasing my software engineering, data science, and machine learning projects.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI:** Radix UI, Lucide React, react-icons
- **Theming:** next-themes

## Getting Started

All commands must be run from the `portfolio/` subdirectory:

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding Projects

Projects are defined in `portfolio/data/projects.tsx`. Each project includes a title, description, tech stack, images, and categories (`SWE`, `DS`, `ML`, `DE`, `WIP`).

Project images go in `portfolio/public/`.

## Deployment

```bash
cd portfolio
npm run build
npm start
```
