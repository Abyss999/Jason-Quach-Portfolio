"use client";

import Image from "next/image";
import React from "react";
import {Mail, Github, Linkedin, FileText} from "lucide-react"; 

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

const profileImages = [
    "/pfp.jpg",
    "/pfp_2.png",
];

const education = [
    {
        title: "B.S. Computer Science",
        subtitle: ["University of Houston 2024-2026", "GPA: 3.6"].join("\n"),
        description: ["Coursework: Database Systems, Software Design, Algorithms & Data Structures"].join("\n"),
    }, {
        title: "A.S. Computer Science",
        subtitle: ["Houston Community College 2022-2024", "GPA: 3.9"].join("\n"),
        description: ["Coursework: Data Structures, Computer Architecture, Calculus I-II"].join("\n"),
    }
];

const work_experience = [
    {
        title: "Software Engineering Intern - EnergyAI Solutions",
        subtitle: ["Houston, TX | January 2026 – Present"].join("\n"),
        description: [
        "Contributed as part of a 5-person engineering team building internal applications.",
        "Focused on web scraping and data normalization, extracting job posting data from multiple external sources to support downstream analysis."
        ].join("\n")
    },
    {
        title: "Vice President – CougarAI",
        subtitle: ["Houston, TX | June 2025 – Present"].join("\n"),
        description: "Leading development of CougarAI's web platform and automation systems to improve member experience and operations."
    },
    {
        title: "Software Engineer – CougarAI",
        subtitle: ["Houston, TX | February 2025 – June 2025"].join("\n"),
        description: "Developed and maintained features for the club website and bot using Flask, React, and SQL."
    },
    {
        title: "Righteous Bot",
        subtitle: ["Personal Project | June 2019 – April 2025"].join("\n"),
        description: "Built and monetized a feature-rich Discord bot with 650+ commands, generating real revenue from production users."
    }
];

type EntryProps = {
    title: string;
    subtitle?: string;
    description: string;
}

function InfoEntry({ title, subtitle, description }: EntryProps) {
    return (
        <div className = "space-y-1">
            <p className="font-semibold text-orange-500 dark:text-orange-500">{title}</p>

            {subtitle && (
                <p className="text-sm text-gray-600 dark:text-white/60 whitespace-pre-line">
                    {subtitle}
                </p>
            )}

            {description && (
                <p className="text-sm text-gray-900 dark:text-white whitespace-pre-line">
                    {description}
                </p>
            )}
            
        </div>
    )
}

export default function AboutMe() {
    const [currentProfile, setCurrentProfile] = React.useState(0);
    const [imageLoaded, setImageLoaded] = React.useState(false);

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
            <h2 className = "mb-10 text-center text-5xl font-bold text-orange-500">
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
                        I'm a Computer Science student at the University of Houston and Vice President of CougarAI. 
                        I specialize in full-stack development with a passion for backend engineering—from Discord bots that generated <b>$8k+</b> in revenue to volunteer platforms with real-time features. 
                        I love building APIs, designing databases, and architecting scalable server-side systems.
                    </p>

                    <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-white/80">
                        My stack includes Flask, PostgreSQL, React, Next.js, MongoDB, and Docker. 
                        When I'm not coding, you'll find me at the gym, rewatching superhero movies, or exploring new tech. 
                        Currently seeking internships where I can build production-level applications and grow as a backend engineer.
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
                            {/* card 1 */}
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">📙 Education</h3>
                                <div className="flex flex-col gap-4">
                                    {education.map((edu) => (
                                        <InfoEntry
                                            key={edu.title} 
                                            title={edu.title}
                                            subtitle={edu.subtitle}
                                            description={edu.description}
                                        />
                                    ))}
                                </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-6 backdrop-blur">
                            {/* card 2 */}
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">💼 Work Experience</h3>
                                <div className="flex flex-col gap-4">
                                    {work_experience.map((work) => (
                                        <InfoEntry
                                            key={work.title} 
                                            title={work.title}
                                            subtitle={work.subtitle}
                                            description={work.description}
                                        />
                                    ))}
                                </div>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    )
}