"use client";

import Image from "next/image";
import React from "react";
import {Mail, Github, Linkedin, FileText} from "lucide-react"; 
import { profile } from "console";
import next from "next";

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
]

export default function AboutMe() {
    const [currentProfile, setCurrentProfile] = React.useState(0);

    const nextProfile = () => {
        setCurrentProfile((currentProfile + 1) % profileImages.length);
    }

    const prevProfile = () => {
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
                    <div className = "relative aspect-square w-full max-w-xs sm:max-w-sm md:max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                        <Image
                            key={profileImages[currentProfile]}
                            src={profileImages[currentProfile]}
                            alt="Profile Picture"
                            fill
                            className="object-cover opacity-0 animate-fadeIn"
                            priority
                        />

                        {/* left arrow */}
                        {profileImages.length > 1 && (
                        <button onClick={prevProfile} 
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80">
                            ‹
                        </button>
                        )}

                        {/* right arrow */}
                        {profileImages.length > 1 && (
                        <button onClick={nextProfile} 
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80">
                            ›
                        </button>
                        )}

                        {/* dots */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                            {profileImages.map((_, i) => (
                                <span
                                key={i}
                                className={`h-2 w-2 rounded-full ${
                                    i === currentProfile ? "bg-orange-500" : "bg-white/40"
                                }`}
                                />
                            ))}
                            </div>

                    </div>

                    

                </div>
            

                {/* Texts & Socials*/}

                <div>
                    <p className="text-lg leading-relaxed text-white/80">
                        I'm a Computer Science student at the University of Houston with a passion for full-stack web development.
                        I enjoy creating clean, scalable applications that provide excellent user experiences. 
                        When I'm not coding, I love exploring new technologies, hiking, and playing video games.
                    </p>

                    <p className="mt-4 text-lg leading-relaxed text-white/80">
                        I’ve built projects using React, Next.js, Flask, PostgreSQL, and
                        Docker, and I’m currently looking to keep growing through real-world
                        team projects and internships.
                    </p>  

                    {/* Links */}
                    <div className = "mt-8 flex flex-wrap gap-3">
                        {socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target={social.href.startsWith("http") || social.href.endsWith("pdf") ? "_blank" : undefined}
                                rel={social.href.startsWith("http") || social.href.endsWith("pdf") ? "noopener noreferrer" : undefined}
                                className="inline-flex items-center gap-2 rounded-full border border-orange-500/40
                                    px-4 py-2 text-orange-500 transition-colors
                                    hover:bg-orange-500/15 hover:text-orange-400"
                            >
                                {social.icon}
                                <span className="text-sm font-medium">{social.label}</span>
                            </a>
                        ))}

                    </div>
                </div>
            </div>

        </section>
    )
}

