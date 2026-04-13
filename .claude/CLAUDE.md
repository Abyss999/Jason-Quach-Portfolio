# Jason Quach Portfolio — Claude Context

## Project
Personal portfolio website for Jason Quach — CS student at University of Houston, President of CougarAI, SWE Intern at Energy AI Solutions.

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
| `app/api/github-stats/route.ts` | Server-side API route — proxies GitHub GraphQL + contributor stats; reads `GITHUB_TOKEN` |
| `components/NavBar.tsx` | Sticky navbar with scroll-aware backdrop blur, active section tracking, mobile sheet |
| `components/AboutMe.tsx` | About section — profile pic carousel, bio, education & work experience timelines |
| `components/Hero.tsx` | Hero with typing animation |
| `components/ProjectCard.tsx` | Project card — image-on-top layout with gallery modal |
| `components/ProjectCategoryFilter.tsx` | Category filter pills + result count / tech-filter hint line |
| `components/TechBadge.tsx` | Reusable skill pill — `size="sm"` or `size="md"`, orange-500 by default |
| `components/SkillCard.tsx` | Category skill card used in the Skills section |
| `components/ContactMe.tsx` | Legacy contact modal — no longer wired up (superseded by inline Contact section) |
| `data/projects.tsx` | All project data and tech stack definitions |
| `.env.local` | `GITHUB_TOKEN=...` — gitignored, never commit; required for contributions + diff stats |

## Page Sections (in order)
`Hero` → `AboutMe` → `Skills` → `Projects` → `Contact`

NavBar tracks all five via `IntersectionObserver`: `["hero", "about", "skills", "projects", "contact"]`

## NavBar
- `sticky top-0 z-50` — always visible
- Scroll-aware: past 8px scroll → `bg-white/80 dark:bg-black/80 backdrop-blur-md` + bottom border + shadow. At top → solid `bg-white dark:bg-black`
- Uses `IntersectionObserver` to track active section (`hero`, `about`, `skills`, `projects`, `contact`)
- Mobile: Radix Sheet (hamburger) — closes on all nav taps including non-Contact links
- "Contact" nav link scrolls to `#contact` section (previously opened a modal — `ContactMe.tsx` is now unused)

## Contact Section (`app/page.tsx`)
- Inline form at the bottom of the page (id=`contact`), no modal
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
Both Education and Work Experience use the same vertical timeline pattern:
- Outer `relative pl-6` container with an absolute orange gradient line at `left-[11px]`
- Each entry: orange dot at `-left-[19px] top-[14px]`, card with logo box (40×40) → title/org/dates → bullets with `▸` → `TechBadge` tags
- `EduEntry` supports `status?: string` — renders a yellow pill (e.g. "Applied") next to the degree

### Types
```ts
type EduEntry  = { degree, school, gpa, location, dates, logo, logoColor, logoImg?, bullets[], tags[], status? }
type WorkEntry = { role, company, type, location, dates, logo, logoColor, logoImg?, bullets[], tags[] }
```

### logoMap (`AboutMe.tsx`)
All logo images live in `public/` and are referenced via `logoMap`:
- `CAI` → `/cai.svg` (CougarAI)
- `EAI` → `/eai.jpeg` (Energy AI Solutions)
- `Righteous` → `/righteous.webp`
- `UH` → `/uh.svg` (University of Houston)
- `HCC` → `/hcc.png` (Houston Community College / Houston City College)
- `SLHS` → no image, falls back to initials on `bg-indigo-600`

Logo rendering: `<Image>` if `logoImg` is set, otherwise letter initials on `logoColor` background. When `logoImg` is set, the box background becomes `bg-white` for contrast.

## Responsive / Mobile Conventions
- Section headings: `text-3xl sm:text-4xl md:text-5xl` — never just `text-5xl`
- Hero h1: `text-4xl sm:text-5xl md:text-6xl`
- Typing animation: `text-xl sm:text-2xl md:text-3xl`
- Always use mobile-first breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px)
- `overflow-x-hidden` on `<html>` and `<body>` to prevent horizontal scroll

## Data
All content (work experience, education, projects, skills) is hardcoded directly in component or data files — no external API or CMS.

## Conventions
- `"use client"` at top of any component using hooks or browser APIs
- All images in `public/` — referenced as `/filename.ext`
- No tests currently in the project
- Never add new files for one-off changes — extend existing components

## Dev
```bash
cd Jason-Quach-Portfolio/portfolio
npm run dev      # starts on http://localhost:3000
npm run build    # production build
```
