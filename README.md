# Jason Quach — Portfolio

Personal portfolio website showcasing my software engineering, data science, and machine learning projects.

**Live:** https://jason-portfolio-one.vercel.app/

## Tech Stack

- **Framework:** Next.js 15 (App Router), React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI:** Radix UI, Lucide React, react-icons
- **Theming:** next-themes (dark mode via `.dark` class)
- **Deployment:** Vercel

## Features

- Scroll-aware fixed navbar with active section tracking
- Animated typing hero
- Work & education timelines (LinkedIn-style)
- Filterable projects grid with tech-stack filter pills
- Project gallery modal with keyboard navigation (← → Esc) and thumbnail strip
- Skills section
- Dark / light mode toggle
- Fully responsive (mobile-first)

## Getting Started

All commands must be run from the `portfolio/` subdirectory:

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio/
├── app/
│   ├── page.tsx          # Homepage — Hero, About, Skills, Projects sections
│   ├── layout.tsx        # Root layout — NavBar, Footer, ThemeProvider
│   └── globals.css       # Tailwind import + CSS custom properties
├── components/
│   ├── NavBar.tsx        # Scroll-aware navbar, mobile sheet
│   ├── Hero.tsx          # Hero with typing animation
│   ├── AboutMe.tsx       # Bio, work & education timelines
│   ├── ProjectCard.tsx   # Project card + gallery modal
│   ├── SkillCard.tsx     # Skill category cards
│   └── TechBadge.tsx     # Reusable tech pill badge
├── data/
│   └── projects.tsx      # All project data and Tech definitions
└── public/               # All images (logos, project screenshots)
```

## Adding Projects

Projects are defined in `data/projects.tsx`. Each project includes:

```ts
{
  id: string;
  title: string;
  description: string;       // shown on card (truncated to 3 lines)
  longDescription?: string;  // shown in full in the modal
  githubLink?: string | null;
  liveLink?: string | null;
  categories: ("SWE" | "DS" | "ML" | "DE" | "WIP" | "Hackathon")[];
  techStack: ProjectTech[];  // use entries from the Tech object or inline
  images: { src: string; caption?: string; alt?: string }[];
}
```

Project images go in `public/`. Reference them as `/filename.ext`.

## Adding Work / Education Entries

Edit the `work_experience` and `education` arrays in `components/AboutMe.tsx`.
To add a logo image, drop the file in `public/` and add it to the `logoMap` at the top of that file.

## Deployment

Deployed on Vercel. To build locally:

```bash
cd portfolio
npm run build
npm start
```
