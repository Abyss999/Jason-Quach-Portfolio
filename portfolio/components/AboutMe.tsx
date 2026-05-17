"use client";

import Image from "next/image";
import React from "react";
import {Mail, Github, Linkedin, FileText, Music, ChevronDown, ChevronUp} from "lucide-react";
import TechBadge from "@/components/TechBadge";

const socials = [
    {
        label: "Github",
        icon: <Github className="h-6 w-6"/>,
        href: "https://github.com/Abyss999",
    },
    {
        label: "LinkedIn",
        icon: <Linkedin className="h-6 w-6"/>,
        href: "https://www.linkedin.com/in/jason-tran-quach/",
    },
    {
        label: "Email",
        icon: <Mail className="h-6 w-6"/>,
        href: "mailto:jtquach@cougarnet.uh.edu",
        onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            window.location.href = "mailto:jtquach@cougarnet.uh.edu";
        },
    },
    {
        label: "Resume",
        icon: <FileText className="h-6 w-6"/>,
        href: "/resume.pdf",
    },
];

const logoMap: {[key: string]: string} = {
    "CAI": "/cai.jpeg",
    "Righteous": "/righteous.webp",
    "HCC": "/hcc.png",
    "UH": "/uh.png",
    "EAI": "/eai.jpeg",
    "SLHS": "/SLHS.jpeg",
    "UT": "/UT.png",
}

const profileImages = [
    "/pfp_3.jpg",
    "/grad_2.jpg",
    "/pfp.jpg",
    "/grad_1.jpg",
    "/pfp_2.png",
];

type EduEntry = {
    degree: string;
    school: string;
    gpa: string;
    location: string;
    dates: string;
    logo: string;
    logoColor: string;
    logoImg?: string;
    bullets: string[];
    tags: string[];
    status?: string;
}

const education: EduEntry[] = [
    {
        degree: "M.S. Computer Science",
        school: "University of Texas at Austin",
        gpa: "",
        location: "Austin, TX",
        dates: "Fall 2026",
        logo: "UT",
        logoImg: logoMap["UT"],
        logoColor: "bg-orange-700",
        bullets: [],
        tags: [],
        status: "Applied",
    },
    {
        degree: "B.S. Computer Science, Minor in Mathematics",
        school: "University of Houston",
        gpa: "GPA: 3.65",
        location: "Houston, TX",
        dates: "Aug 2024 – May 2026",
        logo: "UH",
        logoColor: "bg-red-700",
        logoImg: logoMap["UH"],
        bullets: [
            "Coursework: Algorithms & Data Structures, Software Design, Operating Systems, Database Systems, Data Science I & II, Artificial Intelligence",
            "President of CougarAI — an AI/ML student org with 200+ active members.",
            "Dean's List: SP 2025, FA 2025 · 4.0 GPA in SU 2025",
        ],
        tags: ["Python", "JavaScript", "C++", "React", "Flask", "SQL", "Algorithms", "Data Science", "AI/ML"],
    },
    {
        degree: "A.S. Computer Science",
        school: "Houston Community College",
        gpa: "GPA: 3.9",
        location: "Houston, TX",
        dates: "Aug 2022 – Apr 2024",
        logo: "HCC",
        logoColor: "bg-teal-600",
        logoImg: logoMap["HCC"],
        bullets: [
            "Coursework: Programming Fundamentals I–III, Data Structures, Computer Organization, Calculus I–II",
            "Dean's List: Fall 2022, Spring 2023 · Honors List: Spring 2024",
            "Graduated with honors.",
        ],
        tags: ["Python", "Data Structures", "Algorithms"],
    },
    {
        degree: "High School Diploma — Computer Science",
        school: "Seven Lakes High School",
        gpa: "",
        location: "Katy, TX",
        dates: "2019 – 2022",
        logo: "SLHS",
        logoColor: "bg-indigo-600",
        logoImg: logoMap["SLHS"],
        bullets: [
            "Coursework: AP Computer Science A, Computer Science III (Data Structures), Independent Study",
            "Independent study focused on JavaScript and Python — built personal projects outside the standard curriculum.",
        ],
        tags: ["Java", "JavaScript", "Python", "Data Structures"],
    },
];

type WorkEntry = {
    role: string;
    company: string;
    type: string;
    location: string;
    dates: string;
    logo: string;
    logoColor: string;
    logoImg?: string;
    bullets: string[];
    tags: string[];
}

const work_experience: WorkEntry[] = [
    {
        role: "Lead Software Engineer",
        company: "CougarAI",
        type: "Part-time",
        location: "Houston, TX",
        dates: "May 2026 – Present",
        logo: "CAI",
        logoColor: "bg-red-600",
        logoImg: logoMap["CAI"],
        bullets: [
            "Lead technical architecture and full-stack development of CougarAI's production platform (React 19, TypeScript, Flask, PostgreSQL) with a team of 3 engineers, supporting 200+ active members and partner organizations.",
            "Designed and shipped role-based access control across 5 user tiers, event management with QR/geolocation check-in, Stripe membership payments, real-time in-app notifications, and a partner org portal.",
            "Mentor engineers and officer teams on REST API design, JWT auth patterns, system design, and production deployment workflows.",
            "Drove platform-wide security hardening — JWT token rotation, rate limiting, SQL injection prevention, webhook signature verification, and CORS configuration for production.",
        ],
        tags: ["Leadership", "React", "TypeScript", "Flask", "PostgreSQL", "Python", "JWT", "Stripe", "REST API", "System Design"],
    },
    {
        role: "Software Engineering Intern",
        company: "Energy AI Solutions",
        type: "Internship",
        location: "Spring, TX",
        dates: "Jan 2026 – May 2026",
        logo: "EAI",
        logoColor: "bg-blue-600",
        logoImg: "/eai.jpeg",
        bullets: [
            "Built and maintained full-stack internal tooling (React, Flask, T-SQL) on Azure within a 5-person agile team to support data-driven job market workflows.",
            "Engineered automated Workday scraping pipelines with configurable scheduling (hourly–monthly), pagination controls, and real-time status monitoring; scraped 100+ employers weekly.",
            "Developed a multi-tab job management dashboard with advanced filtering, paginated search, and employer-level rescrape scheduling, saving 2+ hrs/week.",
        ],
        tags: ["React", "Flask", "T-SQL", "Azure", "Python", "JavaScript", "Web Scraping", "REST API", "Agile"],
    },
    {
        role: "President",
        company: "CougarAI",
        type: "Part-time",
        location: "Houston, TX",
        dates: "Mar 2026 – Jun 2026",
        logo: "CAI",
        logoColor: "bg-red-600",
        logoImg: logoMap["CAI"],
        bullets: [
            "Direct a 6-person executive board and 23-person officer board, setting strategic direction across CougarAI's technical programs, events, and partnerships.",
            "Organized a CS/engineering hackathon with 20+ teams and 100+ participants across 5 UH student organizations.",
            "Forged hands-on industry partnerships — collaborated with Ferguson Control Systems to design and build a robot arm.",
            "Designed and led ML workshops on supervised & unsupervised learning, growing member technical depth.",
        ],
        tags: ["Leadership", "Python", "React", "Flask", "SQL", "AI/ML", "Event Planning", "Public Speaking"],
    },
    {
        role: "Vice President",
        company: "CougarAI",
        type: "Part-time",
        location: "Houston, TX",
        dates: "Jun 2025 – Mar 2026",
        logo: "CAI",
        logoColor: "bg-red-600",
        logoImg: logoMap["CAI"],
        bullets: [
            "Promoted from SWE to VP — led a team of 4 engineers in a ground-up rebuild of the club's website and Discord bot, owning architecture and code quality for 200+ members.",
            "Architected a points management system with Stripe API integration, increasing member engagement by 60%.",
            "Built automated Google Sheets/Forms → PostgreSQL pipelines for real-time points tracking across 200+ members.",
            "Recruited industry speakers from Microsoft, NASA, Aridia, and Harris County Toll Way to present to members.",
        ],
        tags: ["Leadership", "React", "Next.js", "Flask", "PostgreSQL", "Python", "Stripe API", "Discord.py", "Google Sheets API"],
    },
    {
        role: "Software Engineer",
        company: "CougarAI",
        type: "Part-time",
        location: "Houston, TX",
        dates: "Feb 2025 – Jun 2025",
        logo: "CAI",
        logoColor: "bg-red-600",
        logoImg: logoMap["CAI"],
        bullets: [
            "Contributed new features and redesigned key pages with a modular React/Tailwind component system, improving navigation and responsiveness.",
            "Integrated the Google Calendar API via Flask RESTful endpoints to automate officer event tracking, saving 2+ hrs/week.",
        ],
        tags: ["React", "Tailwind CSS", "JavaScript", "Flask", "Python", "REST API", "Google Calendar API", "Discord.py"],
    },
    {
        role: "Founder & Software Engineer",
        company: "Righteous Bot",
        type: "Self-employed",
        location: "Katy, TX",
        dates: "Jun 2019 – Apr 2025",
        logo: "RB",
        logoColor: "bg-purple-600",
        logoImg: logoMap["Righteous"],
        bullets: [
            "Independently developed, marketed, and sold a Discord bot with 650+ commands, generating $8,000+ in revenue and serving 100,000+ users across 1,000+ servers.",
            "Integrated Node.js, MongoDB, and web scraping to pull data from platforms like Spotify, Last.FM, Reddit, Twitter, and TikTok.",
            "Built interactive games (Tic-Tac-Toe, Connect 4, Wordle) and provided tailored support to 500+ customers.",
        ],
        tags: ["Node.js", "JavaScript", "MongoDB", "Discord.js", "Web Scraping", "REST API", "Spotify API", "Reddit API"],
    },
];


type SpotifyTrack = {
    name: string;
    artists: { name: string }[];
    album: { images: { url: string }[] };
    external_urls: { spotify: string };
}

type SpotifyArtist = {
    name: string;
    images: { url: string }[];
    external_urls: { spotify: string };
}

type SpotifyData = {
    nowPlaying: { is_playing: boolean; item: SpotifyTrack } | null;
    topTracks: SpotifyTrack[];
    topArtists: SpotifyArtist[];
}

const TIME_RANGE_LABELS: Record<string, string> = {
    short_term: "Recent",
    medium_term: "This Year",
    long_term: "All Time",
};

export default function AboutMe() {
    const [currentProfile, setCurrentProfile] = React.useState(0);
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [spotifyExpanded, setSpotifyExpanded] = React.useState(false);
    const [timeRange, setTimeRange] = React.useState<"short_term" | "medium_term" | "long_term">("short_term");
    const [spotifyData, setSpotifyData] = React.useState<SpotifyData | null>(null);
    const [spotifyLoading, setSpotifyLoading] = React.useState(false);

    React.useEffect(() => {
        if (!spotifyExpanded) return;
        setSpotifyLoading(true);
        fetch(`/api/spotify?timeRange=${timeRange}`)
            .then(r => r.json())
            .then(data => { setSpotifyData(data); setSpotifyLoading(false); })
            .catch(() => setSpotifyLoading(false));
    }, [spotifyExpanded, timeRange]);

    const nextProfile = () => {
        setImageLoaded(false);
        setCurrentProfile((currentProfile + 1) % profileImages.length);
    }

    const prevProfile = () => {
        setImageLoaded(false);
        setCurrentProfile((currentProfile - 1 + profileImages.length) % profileImages.length);
    }

    React.useEffect(() => {
        const id = setInterval(nextProfile, 7000);
        return () => clearInterval(id);
    }, [currentProfile]);

    return (
        <section id = "about" className = "min-h-[calc(100vh-4rem)] py-20 scroll-mt-16">
            <h2 className="mb-10 text-center text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500">
                About Me
            </h2>

            {/* Profile Picture  */}
            <div className = "grid gap-10 md:grid-cols-2 md:items-center">
                <div className="flex justify-center">
                    <div className = "relative aspect-square w-full max-w-xs sm:max-w-sm md:max-w-md overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                        <Image
                            key={profileImages[currentProfile]}
                            src={profileImages[currentProfile]}
                            alt="Profile Picture"
                            fill
                            sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 448px"
                            className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoadingComplete={() => setImageLoaded(true)}
                            priority
                        />

                        {/* left arrow */}
                        {profileImages.length > 1 && (
                        <button 
                            onClick={prevProfile} 
                            aria-label="Previous image"
                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors z-10">
                            ‹
                        </button>
                        )}

                        {/* right arrow */}
                        {profileImages.length > 1 && (
                        <button 
                            onClick={nextProfile}
                            aria-label="Next image"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors z-10">
                            ›
                        </button>
                        )}

                        {/* dots */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {profileImages.map((_, i) => (
                                <span
                                key={i}
                                className={`h-2 w-2 rounded-full ${
                                    i === currentProfile ? "bg-orange-500" : "bg-gray-400 dark:bg-white/40"
                                }`}
                                />
                            ))}
                        </div>

                    </div>

                </div>
            
                {/* Texts & Socials*/}

                <div>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-white/80">
                        I'm a Computer Science graduate from the University of Houston and Lead Software Engineer at CougarAI.
                        I specialize in full-stack development with a passion for backend engineering—from Discord bots that generated <b>$8k+</b> in revenue to production platforms serving 200+ active members.
                        I love building APIs, designing databases, and architecting scalable server-side systems.
                    </p>

                    <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-white/80">
                        My stack includes Flask, PostgreSQL, React, Next.js, MongoDB, and Docker.
                        When I'm not coding, you'll find me at the gym, rewatching superhero movies, or exploring new tech.
                    </p>  

                    {/* Links */}
                    <div className = "mt-8 flex flex-wrap gap-3">
                        {socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                onClick={social.onClick}
                                target={social.href.startsWith("http") || social.href.endsWith("pdf") ? "_blank" : undefined}
                                rel={social.href.startsWith("http") || social.href.endsWith("pdf") ? "noopener noreferrer" : undefined}
                                className="inline-flex items-center gap-2 rounded-full bg-orange-500/15
                                    px-4 py-2 text-orange-500 transition-all
                                    hover:bg-orange-500/25"
                            >
                                {social.icon}
                                <span className="text-sm font-medium">{social.label}</span>
                            </a>
                        ))}

                    </div>
                </div>

                {/* Education  */}
                <div className = "md:col-span-2 flex justify-center">
                    <div className = "grid max-w-5xl grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-6 backdrop-blur">
                            {/* card 1 — education timeline */}
                            <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">📙 Education</h3>
                            <div className="relative pl-6">
                                {/* vertical line */}
                                <span className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500/70 to-orange-500/5" />

                                {education.map((edu, i) => (
                                    <div key={i} className="relative mb-7 last:mb-0 group">
                                        {/* dot */}
                                        <span className="absolute -left-[19px] top-[14px] h-3 w-3 rounded-full border-2 border-orange-500 bg-gray-50 dark:bg-[oklch(0.145_0_0)] transition-colors group-hover:bg-orange-500" />

                                        <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-4 transition-all duration-300 hover:border-orange-500/40 hover:-translate-y-0.5">
                                            <div className="flex items-start gap-3">
                                                <div className={`shrink-0 w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center text-xs font-bold text-white ${edu.logoImg ? "bg-white" : edu.logoColor}`}>
                                                    {edu.logoImg
                                                        ? <Image src={edu.logoImg} alt={edu.school} width={40} height={40} className="object-contain w-full h-full" />
                                                        : edu.logo}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <p className="font-semibold text-gray-900 dark:text-white leading-tight">{edu.degree}</p>
                                                        {edu.status && (
                                                            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-yellow-400/40 text-yellow-400 bg-yellow-400/10">
                                                                {edu.status}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-orange-500 mt-0.5">{edu.school}</p>
                                                    <p className="text-xs text-gray-500 dark:text-white/40 mt-0.5">
                                                        {edu.dates} · {edu.location}{edu.gpa ? ` · ${edu.gpa}` : ""}
                                                    </p>
                                                </div>
                                            </div>
                                            {edu.bullets.length > 0 && (
                                                <ul className="mt-3 space-y-1">
                                                    {edu.bullets.map((b, j) => (
                                                        <li key={j} className="flex gap-2 text-sm text-gray-700 dark:text-white/75">
                                                            <span className="text-orange-500 shrink-0 mt-px">▸</span>
                                                            <span>{b}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            {edu.tags.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-1.5">
                                                    {edu.tags.map((tag) => (
                                                        <TechBadge key={tag} label={tag} size="sm" />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-6 backdrop-blur">
                            {/* card 2 — timeline */}
                            <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">💼 Work Experience</h3>
                            <div className="relative pl-6">
                                {/* vertical line */}
                                <span className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500/70 to-orange-500/5" />

                                {work_experience.map((work, i) => (
                                    <div key={i} className="relative mb-7 last:mb-0 group">
                                        {/* dot */}
                                        <span className="absolute -left-[19px] top-[14px] h-3 w-3 rounded-full border-2 border-orange-500 bg-gray-50 dark:bg-[oklch(0.145_0_0)] transition-colors group-hover:bg-orange-500" />

                                        <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-4 transition-all duration-300 hover:border-orange-500/40 hover:-translate-y-0.5">
                                            {/* header row */}
                                            <div className="flex items-start gap-3">
                                                {/* logo */}
                                                <div className={`shrink-0 w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center text-xs font-bold text-white ${work.logoImg ? "bg-white" : work.logoColor}`}>
                                                    {work.logoImg
                                                        ? <Image src={work.logoImg} alt={work.company} width={40} height={40} className="object-contain w-full h-full" />
                                                        : work.logo}
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="font-semibold text-gray-900 dark:text-white leading-tight">{work.role}</p>
                                                    <p className="text-sm text-orange-500 mt-0.5">{work.company} · {work.type}</p>
                                                    <p className="text-xs text-gray-500 dark:text-white/40 mt-0.5">{work.dates} · {work.location}</p>
                                                </div>
                                            </div>

                                            {/* bullets */}
                                            <ul className="mt-3 space-y-1">
                                                {work.bullets.map((b, j) => (
                                                    <li key={j} className="flex gap-2 text-sm text-gray-700 dark:text-white/75">
                                                        <span className="text-orange-500 shrink-0 mt-px">▸</span>
                                                        <span>{b}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* tags */}
                                            <div className="mt-3 flex flex-wrap gap-1.5">
                                                {work.tags.map((tag) => (
                                                    <TechBadge key={tag} label={tag} size="sm" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            {/* Spotify */}
            <div className="md:col-span-2 flex justify-center">
                <div className="w-full max-w-5xl">
                    <button
                        onClick={() => setSpotifyExpanded(v => !v)}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-white/60 hover:border-orange-500/40 hover:text-orange-500 dark:hover:text-orange-500 transition-all duration-200"
                    >
                        <Music className="h-4 w-4" />
                        <span className="text-sm font-medium">My Music Taste</span>
                        {spotifyExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>

                    {spotifyExpanded && (
                        <div className="mt-4 space-y-4">
                            {/* Time range filter */}
                            <div className="flex justify-center gap-2">
                                {(["short_term", "medium_term", "long_term"] as const).map(range => (
                                    <button
                                        key={range}
                                        onClick={() => setTimeRange(range)}
                                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                                            timeRange === range
                                                ? "bg-orange-500 text-white border-orange-500"
                                                : "border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 hover:border-orange-500/40 hover:text-orange-500"
                                        }`}
                                    >
                                        {TIME_RANGE_LABELS[range]}
                                    </button>
                                ))}
                            </div>

                            {spotifyLoading ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {[0, 1].map(i => (
                                        <div key={i} className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4 space-y-3">
                                            <div className="h-4 w-24 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                                            {[...Array(5)].map((_, j) => (
                                                <div key={j} className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded bg-gray-200 dark:bg-white/10 animate-pulse shrink-0" />
                                                    <div className="flex-1 space-y-1.5">
                                                        <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                                                        <div className="h-2.5 w-1/2 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ) : spotifyData && (
                                <div className="space-y-4">
                                    {/* Now Playing */}
                                    {spotifyData.nowPlaying?.item ? (
                                        <a
                                            href={spotifyData.nowPlaying.item.external_urls.spotify}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors ${
                                                spotifyData.nowPlaying.is_playing
                                                    ? "border-green-500/30 bg-green-500/5 hover:border-green-500/50"
                                                    : "border-orange-500/30 bg-orange-500/5 hover:border-orange-500/50"
                                            }`}
                                        >
                                            <div className="relative shrink-0">
                                                <Image
                                                    src={spotifyData.nowPlaying.item.album.images[0]?.url}
                                                    alt="Album art"
                                                    width={56}
                                                    height={56}
                                                    className="rounded-lg"
                                                />
                                                {spotifyData.nowPlaying.is_playing && (
                                                    <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-[oklch(0.145_0_0)] animate-pulse" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className={`text-xs font-medium mb-0.5 ${spotifyData.nowPlaying.is_playing ? "text-green-500" : "text-orange-500"}`}>
                                                    {spotifyData.nowPlaying.is_playing ? "▶ Currently listening to" : "⏸ Last played"}
                                                </p>
                                                <p className="font-semibold text-gray-900 dark:text-white truncate">{spotifyData.nowPlaying.item.name}</p>
                                                <p className="text-sm text-gray-500 dark:text-white/55 truncate">{spotifyData.nowPlaying.item.artists.map(a => a.name).join(", ")}</p>
                                            </div>
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-3 p-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                                            <Music className="h-5 w-5 text-gray-400 shrink-0" />
                                            <p className="text-sm text-gray-500 dark:text-white/50">Not currently playing anything</p>
                                        </div>
                                    )}

                                    {/* Top Tracks + Top Artists */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4">
                                            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">🎵 Top Tracks</h3>
                                            <div className="space-y-1">
                                                {spotifyData.topTracks?.map((track, i) => (
                                                    <a
                                                        key={i}
                                                        href={track.external_urls.spotify}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-orange-500/10 transition-colors group"
                                                    >
                                                        <span className="text-xs text-gray-400 dark:text-white/30 w-4 shrink-0 text-right">{i + 1}</span>
                                                        <Image
                                                            src={track.album.images[0]?.url}
                                                            alt={track.name}
                                                            width={36}
                                                            height={36}
                                                            className="rounded shrink-0"
                                                        />
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-orange-500 transition-colors">{track.name}</p>
                                                            <p className="text-xs text-gray-500 dark:text-white/50 truncate">{track.artists.map(a => a.name).join(", ")}</p>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4">
                                            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">🎤 Top Artists</h3>
                                            <div className="space-y-1">
                                                {spotifyData.topArtists?.map((artist, i) => (
                                                    <a
                                                        key={i}
                                                        href={artist.external_urls.spotify}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-orange-500/10 transition-colors group"
                                                    >
                                                        <span className="text-xs text-gray-400 dark:text-white/30 w-4 shrink-0 text-right">{i + 1}</span>
                                                        {artist.images[0]?.url ? (
                                                            <Image
                                                                src={artist.images[0].url}
                                                                alt={artist.name}
                                                                width={36}
                                                                height={36}
                                                                className="rounded-full shrink-0 object-cover"
                                                            />
                                                        ) : (
                                                            <div className="h-9 w-9 rounded-full shrink-0 bg-orange-500/20 flex items-center justify-center text-xs font-bold text-orange-500">
                                                                {artist.name[0]}
                                                            </div>
                                                        )}
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-orange-500 transition-colors">{artist.name}</p>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

        </div>

        </section>
    )
}