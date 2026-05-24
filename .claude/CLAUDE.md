# Jason Quach Portfolio — Claude Context

## Project
Personal portfolio website for Jason Quach — CS graduate at University of Houston, Software Engineer at Techemet, Lead Software Engineer at CougarAI, SWE Intern at Energy AI Solutions. Accepted to UT Austin M.S. Computer Science (Spring 2027).

## Tech Stack
- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 4 — utility classes only, no CSS modules or inline styles
- **UI primitives:** Radix UI (Dialog, Slot), Lucide React icons
- **Theming:** `next-themes` — dark mode toggled via `.dark` class; primary accent is `orange-500`
- **Class merging:** `cn()` from `lib/utils.ts` (wraps `clsx` + `tailwind-merge`)

## Root
All source code lives in `Jason-Quach-Portfolio/portfolio/` relative to the repo root.

## Key Files
| File | Purpose |
|------|---------|
| `app/page.tsx` | Homepage — renders Hero, AboutMe, Skills, Projects, Contact sections |
| `app/layout.tsx` | Root layout — metadata, fonts, NavBar, Footer, ThemeProvider |
| `app/globals.css` | Tailwind import + OKLCh CSS custom properties for theme colors |
| `app/icon.tsx` | Favicon — `ImageResponse` renders "JQ" in Syne 800 on dark background; reads `public/fonts/syne-800.ttf` |
| `app/api/github-stats/route.ts` | Server-side API route — proxies GitHub GraphQL + contributor stats; reads `GITHUB_TOKEN` |
| `components/NavBar.tsx` | Transparent-to-blur navbar, centered nav links, active section tracking, mobile sheet |
| `components/AboutMe.tsx` | About section — profile pic carousel, bio, Spotify panel, education & work experience timelines |
| `components/Hero.tsx` | Hero with typing animation, centered layout, 4 stats |
| `components/SiteBackground.tsx` | Animated neural-net canvas + glow/grid layers; mobile-responsive node count |
| `components/ProjectCard.tsx` | Project card — image-on-top layout with gallery modal |
| `components/ProjectCategoryFilter.tsx` | Category filter pills + result count / tech-filter hint line |
| `components/TechBadge.tsx` | Reusable skill pill — `size="sm"` or `size="md"`, orange-500 by default |
| `components/SkillCard.tsx` | Category skill card used in the Skills section |
| `components/ContactMe.tsx` | Legacy contact modal — no longer wired up (superseded by inline Contact section) |
| `data/projects.tsx` | All project data and tech stack definitions |
| `public/fonts/syne-800.ttf` | Syne ExtraBold TTF used by `app/icon.tsx` favicon generator |
| `.env.local` | `GITHUB_TOKEN=...` — gitignored, never commit; required for contributions + diff stats |

## Page Sections (in order)
`Hero` → `AboutMe` → `Skills` → `Projects` → `Contact`

NavBar tracks all five via `IntersectionObserver`: `["hero", "about", "skills", "projects", "contact"]`

## NavBar
- **Layout:** 3-column grid (`logo | centered links | resume+theme`) — logo left, nav links centered, Resume+ThemeToggle right
- **Transparency:** fully transparent at top; on scroll past 8px → `bg-white/85 dark:bg-[rgba(8,6,4,0.88)]` with `backdrop-blur-lg` + bottom border
- **Logo:** "JQ" in Syne extrabold, orange-500
- **Nav links:** inactive = muted gray/white, active = orange-500; `rounded-lg px-3 py-1.5`
- **Resume button:** bordered pill (`border border-orange-500/40`), not filled
- **Active section:** `IntersectionObserver` with `-40% 0px -40% 0px` rootMargin + scroll-to-bottom check that forces `contact` active when within 80px of page bottom
- **Mobile:** Radix Sheet (hamburger) — closes on all nav taps; ThemeToggle shown inline next to hamburger

## Contact Section (`app/page.tsx`)
- Inline form at the bottom of the page (id=`contact`), centered title + label
- State lives in `page.tsx`: `contactName`, `contactEmail`, `contactMessage`
- "Send Message" builds a `mailto:` link with subject + body pre-filled
- Email: `jtquach@cougarnet.uh.edu`

## Project Filtering (`app/page.tsx` + `ProjectCategoryFilter.tsx`)
- **Category filter:** OR logic — multi-selecting shows projects matching *any* selected category
- **Tech filter:** clicking a TechBadge on a ProjectCard sets `activeTech`; filters independently
- **"All" pill** clears both category and tech filters via `clearAllFilters()`
- **Active filter bar:** appears below pills when any filter is active — shows dismissable tech chip + "Clear all" button
- **Empty state:** shown when no projects match, with a "Clear all filters" button
- **Result count:** `ProjectCategoryFilter` shows `"X of N projects"` when filtered, otherwise shows a tip about tech-badge filtering
- Filter state: `activeCategories: Set<ProjectCategory>`, `activeTech: string | null`
- **Categories:** `"SWE" | "DS" | "ML" | "DE" | "WIP" | "Hackathon"` — `CATEGORY_LABELS` in `ProjectCategoryFilter.tsx` must be kept in sync when adding new categories

## ProjectCard
- Layout: image on top (`aspect-video`, `object-cover`, zoom on hover) → content below
- Category badges overlaid top-left on the image
- Photo count hint appears bottom-right on hover
- Content: title → `line-clamp-3` description → `flex-wrap` tech badges → GitHub/Live buttons
- Whole card lifts on hover (`-translate-y-1`)
- Clicking the image opens a modal gallery (keyboard nav: ←/→/Esc, thumbnail strip)

### Modal layout (two-column)
- `sm:max-w-none w-[min(96vw,1500px)] h-[88vh]` — must include `sm:max-w-none` to override the Radix Dialog base class `sm:max-w-lg` (512px cap)
- **Left panel** (`flex-1`): main image + prev/next arrow buttons (dark translucent circles) + optional caption + thumbnail strip
- **Right panel** (`md:w-72 lg:w-80`, scrollable): title → category badges → full `description` → `longDescription` if present → "Tech Stack" label + badges → GitHub/Live buttons
- Card shows `line-clamp-3`; modal shows the full text — no truncation

## Projects Grid (`app/page.tsx`)
```tsx
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
```
1 col mobile → 2 col tablet → 3 col desktop.

## Skills Section (`app/page.tsx`)
Order within the section:
1. Skill card grids (Languages, Frameworks, Databases / Data, Cloud, Other)
2. Stat overview tiles (Languages count, Frameworks count, Databases count, Projects count)
3. GitHub Activity (see below)

Skill stacks defined in `page.tsx`:
- **Languages:** TypeScript, JavaScript, Python, C++, R, CFML
- **Frameworks:** Tailwind CSS, Express.js, Streamlit, Node.js, Next.js, React, Flask, jQuery, Vue.js
- **Databases:** PostgreSQL, MySQL, SQL Server, MongoDB
- **Data:** Pandas, NumPy, scikit-learn, TensorFlow
- **Cloud:** Docker, Heroku, Vercel, Azure
- **Other:** GitHub, VS Code, JWT, REST APIs, ChatGPT, Claude

TechBadge has no tooltip — the hover tooltip feature was removed.

## GitHub Activity (`app/page.tsx` + `app/api/github-stats/route.ts`)

### Client-side fetches (unauthenticated, in `page.tsx` useEffect)
| Data | Endpoint |
|------|----------|
| Public repos + followers | `GET /users/Abyss999` |
| Top languages | `GET /users/Abyss999/repos?per_page=100` → count by `language` field |

### Server-side fetches (authenticated, in `/api/github-stats`)
| Data | Method |
|------|--------|
| All-time contributions | GitHub GraphQL — yearly aliases summed server-side |
| Lines added / deleted | `GET /repos/Abyss999/{repo}/stats/contributors` for top 10 non-fork repos |

`GitHubStats` type: `{ repos, contributions, additions, deletions, topLangs: { name, count }[] }`
- `contributions`, `additions`, `deletions` are `number | null` — `null` means token not set; those stat rows are hidden gracefully

**Cards rendered:**
- **Stats card** — Public Repos / Contributions / Lines Added / Lines Removed; links to `github.com/Abyss999`
- **Top Languages card** — uses `LANG_TO_TECH` map to render `TechBadge` for known langs (TypeScript, JavaScript, Python, C++, R), plain orange pill for unknowns
- **Contribution graph** — full-width `<img src="https://ghchart.rshah.org/f97316/Abyss999">` (orange-tinted SVG, no auth needed)

**Security architecture:**
```
Browser → GET /api/github-stats → Next.js server (reads GITHUB_TOKEN) → GitHub → { contributions, additions, deletions }
```
Token never reaches the browser. Never prefix it with `NEXT_PUBLIC_`.

**API route caching:** `next: { revalidate: 86400 }` — GitHub is only hit once per day per server instance.

**Diff stat caveat:** additions/deletions only cover repos the user *owns* (not contributions to other people's repos). Top 10 non-fork repos sorted by most recently pushed.

**GitHub API rate limits:**
- Unauthenticated REST: 60 req/hour per IP
- Authenticated REST: 5,000 req/hour
- GraphQL (authenticated): 5,000 points/hour
- The real contributions count is NOT available via unauthenticated REST — requires GraphQL + token

Skeleton loaders shown while fetching; entire section hidden on fetch error (silent fail).

`LANG_TO_TECH` map lives at the top of `page.tsx` — extend it when new languages are added to Tech in `data/projects.tsx`.

## AboutMe.tsx Structure

### Layout
- **Top grid:** `grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] md:items-start`
  - Column 1: profile photo carousel (capped at `sm:max-w-sm`)
  - Column 2: bio paragraphs → social links → Spotify panel (`mt-6 w-full`)
- **Below grid:** `md:col-span-2` education + work experience timelines (centered, `max-w-5xl lg:grid-cols-2`)

### Timeline cards (Education & Work Experience)
- Both cards have an **"Expand all" / "Collapse all"** button in the card header (top-right)
- Implemented via `React.useRef<HTMLDetailsElement[]>` — imperatively sets `.open` on all `<details>` elements; individual toggles still work independently
- State: `eduAllExpanded`, `workAllExpanded` booleans; refs: `eduDetailsRefs`, `workDetailsRefs`
- Each entry: orange dot → card with logo (40×40) → title/org/dates → `<details>` bullets → `TechBadge` tags
- `EduEntry` supports `status?: string` — renders a pill next to the degree; yellow for "Applied", green for "Accepted"

### Types
```ts
type EduEntry  = { degree, school, gpa, location, dates, logo, logoColor, logoImg?, bullets[], tags[], status? }
type WorkEntry = { role, company, type, location, dates, logo, logoColor, logoImg?, bullets[], tags[] }
```

### logoMap (`AboutMe.tsx`)
All logo images live in `public/logos/` and are referenced via `logoMap`:
- `CAI` → `/logos/cai.jpeg` (CougarAI)
- `EAI` → `/logos/eai.jpeg` (Energy AI Solutions)
- `Righteous` → `/logos/righteous.webp`
- `UH` → `/logos/uh.png` (University of Houston)
- `HCC` → `/logos/hcc.png` (Houston Community College)
- `SLHS` → `/logos/SLHS.jpeg` (Seven Lakes High School)
- `UT` → `/logos/UT.png` (University of Texas at Austin)
- `TE` → `/logos/techemet.png` (Techemet)

Logo rendering: `<Image>` if `logoImg` is set, otherwise letter initials on `logoColor` background. When `logoImg` is set, the box background becomes `bg-white` for contrast.

## Spotify Section (`components/AboutMe.tsx`)

Collapsible "My Music Taste" panel inside the **right bio column** (after the social links), not below the timelines. Uses `mt-6 w-full` — no `md:col-span-2` wrapper.

### API
- Route: `app/api/spotify/route.ts` — single `GET` endpoint, accepts `?timeRange=short_term|medium_term|long_term`
- Returns: `{ nowPlaying, topTracks, topArtists }`
- Env vars required: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`
- Required Spotify scopes: `user-read-currently-playing user-top-read`
- Redirect URI registered in Spotify dashboard: `https://jason-portfolio-one.vercel.app/`
- Token refresh flow: client credentials → exchange refresh token → get access token each request

### UI
- **Toggle button** — "My Music Taste" with Music icon + ChevronDown/Up
- **Time range filter pills** — "Recent" (`short_term`), "This Year" (`medium_term`), "All Time" (`long_term`); refetches on change
- **Now Playing** — green-bordered card, pulsing green dot when `is_playing`, links to Spotify; shows "Not currently playing" when null
- **Top Tracks + Top Artists** — 2-column grid (`lg:grid-cols-2`), top 5 each, album/artist thumbnails, ranked, each row links to Spotify
- Skeleton loaders shown while fetching

### Next.js image config
`i.scdn.co` added to `remotePatterns` in `next.config.ts` for Spotify album/artist images.

## Hero (`components/Hero.tsx`)
- Content block: `max-w-3xl mx-auto text-center`
- Name: `text-6xl sm:text-8xl md:text-[118px]` in Syne extrabold, two lines (Jason / Quach gradient)
- Typing role: `text-xl sm:text-2xl md:text-3xl`
- CTAs: `flex flex-wrap gap-3 justify-center`
- Stats row: `flex flex-wrap items-center justify-center` — 4 stats: Revenue, Users, Commands, Projects
- Description references $8K+, 100K+ users, 1,000+ servers

## SiteBackground (`components/SiteBackground.tsx`)
- Fixed full-screen canvas + layered glow/grid divs, `z-0`
- **Neural net canvas:** animated nodes with connecting lines; **mobile-responsive** — on screens < 768px uses 28 nodes / `maxDist: 120`; on desktop uses 62 nodes / `maxDist: 190`
- Layers (dark mode): warm dark base → neural canvas → hero glow → edge vignette → orange grid → bottom fade
- Light mode uses the same layers with softer colors

## Favicon (`app/icon.tsx`)
- Uses `ImageResponse` (Node.js runtime, no `export const runtime = 'edge'`)
- Reads `public/fonts/syne-800.ttf` from disk via `fs/promises`
- Renders "JQ" in Syne 800, orange-500 (`#f97316`), on dark background (`#080604`), 32×32px with `borderRadius: 6`
- **Font must be TTF** — `ImageResponse` does not support woff2

## Responsive / Mobile Conventions
- Section headings: `text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] pb-1`
  - The `pb-1` prevents descender clipping (e.g. the J in "Projects") at tight line-heights
  - Contact section heading also has `text-center`; all other section headings are left-aligned
- Section labels (`▸ label`): `text-xs font-semibold uppercase tracking-widest text-orange-500`
  - Contact label is `text-center`; all others left-aligned
- Hero h1: `text-6xl sm:text-8xl md:text-[118px]`
- Typing animation: `text-xl sm:text-2xl md:text-3xl`
- Always use mobile-first breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px)
- `overflow-x-hidden` on `<html>` and `<body>` to prevent horizontal scroll

## Workspace root issue
If `npm run dev` fails with "Can't resolve 'tailwindcss'" error, Turbopack is inferring the wrong workspace root. **Solution:** ensure a `package.json` exists at `Jason-Quach-Portfolio/` (parent of `portfolio/`) with a workspaces declaration:
```json
{
  "name": "jason-quach-portfolio-root",
  "private": true,
  "workspaces": ["portfolio"]
}
```
This tells Turbopack that `portfolio/` is the actual workspace to resolve dependencies from. Do NOT add a `package-lock.json` at this level.

## Data
All content (work experience, education, projects, skills) is hardcoded directly in component or data files — no external API or CMS.

### Projects (`data/projects.tsx`)
Current project order (matches display order on the page):
1. Righteous Bot
2. CougarAI Website
3. Comic Bot
4. CougarAI Bot
5. SortLab
6. **DishMatch** — HCCHack 2025, 1st place DigitalOcean track; SwiftUI + FastAPI + MongoDB + Gemini + DigitalOcean
7. Coog Zoo
8. Volunteer Management App
9. Personal Portfolio
10. DBLP Venue Analysis
11. Student Dropout Prediction
12. UH Dining Macros
13. Pneumonia X-Ray Classifier

### Tech object (`data/projects.tsx`)
Reuse existing entries from `Tech` wherever possible. Current entries include all common icons plus:
- `Tech.fastapi` — FastAPI (SiFastapi)
- `Tech.gemini` — Gemini AI (SiGooglegemini)
- `Tech.digitalocean` — DigitalOcean (SiDigitalocean)
- `Tech.swift` — SwiftUI (SiSwift)
- `Tech.cfml` — CFML (FileCode lucide icon)
- `Tech.yolo` — YOLO (Eye lucide icon)
- `Tech.jquery` — jQuery (SiJquery)
- `Tech.vue` — Vue.js (SiVuedotjs)

When adding a new tech that has no react-icons/si entry, use a Lucide icon inline (see `Tech.playwright`, `Tech.rest`, etc.).

## Conventions
- `"use client"` at top of any component using hooks or browser APIs
- `public/` is organized: `logos/` (org logos), `profile/` (personal photos), `projects/<name>/` (project screenshots), `docs/` (PDFs), `fonts/` (local fonts)
- Resume is at `/docs/resume.pdf`; project images use `/projects/<name>/filename.ext`; logos use `/logos/filename.ext`; profile photos use `/profile/filename.ext`
- No tests currently in the project
- Never add new files for one-off changes — extend existing components

## Dev
```bash
cd Jason-Quach-Portfolio/portfolio
npm run dev      # starts on http://localhost:3000
npm run build    # production build
```
