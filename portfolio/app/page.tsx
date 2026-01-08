import Image from "next/image";

import AboutMe from "@/components/AboutMe";
import Hero from "@/components/Hero";

import SkillCard from "@/components/SkillCard";
import TechBadge from "@/components/TechBadge";
import ProjectCard from "@/components/ProjectCard";

import { Code2, Laptop} from "lucide-react";
import {
  SiTypescript,
  SiPython,
  SiJavascript,
  SiCplusplus,
  SiR,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiExpress,
  SiFlask,
  SiNextdotjs,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiGithub,
} from "react-icons/si";

const languageStack = [
  { label: "TypeScript", icon: <SiTypescript className="h-4 w-4" /> },
  { label: "JavaScript", icon: <SiJavascript className="h-4 w-4" /> },
  { label: "Python", icon: <SiPython className="h-4 w-4" /> },
  { label: "C++", icon: <SiCplusplus className="h-4 w-4" /> },
  { label: "R", icon: <SiR className="h-4 w-4" /> },
];

const frameworkStack = [
  { label: "Tailwind CSS", icon: <SiTailwindcss className="h-4 w-4" /> },
  { label: "Express.js", icon: <SiExpress className="h-4 w-4" /> },
  { label: "Node.js", icon: <SiNodedotjs className="h-4 w-4" /> },
  { label: "Next.js", icon: <SiNextdotjs className="h-4 w-4" /> },
  { label: "React", icon: <SiReact className="h-4 w-4" /> },
  { label: "Flask", icon: <SiFlask className="h-4 w-4" /> },
];

const toolStack = [
  { label: "PostgreSQL", icon: <SiPostgresql className="h-4 w-4" /> },
  { label: "MySQL", icon: <SiMysql className="h-4 w-4" /> },
  { label: "MongoDB", icon: <SiMongodb className="h-4 w-4" /> },
  { label: "Docker", icon: <SiDocker className="h-4 w-4" /> },
  { label: "GitHub", icon: <SiGithub className="h-4 w-4" /> },
  { label: "VS Code", icon: <Code2 className="h-4 w-4" /> },
];

const projects = [
  {
    title: "Volunteer Management Web App",
    description:
      "Full-stack volunteer platform with JWT auth, email verification, and role-based access. Built admin/volunteer dashboards and implemented real-time reminders using Socket.IO + APScheduler.",
    githubUrl: "https://github.com/Abyss999/volunteer-app",
    techStack: [
      { label: "React", icon: <SiReact className="h-4 w-4" /> },
      { label: "TypeScript", icon: <SiTypescript className="h-4 w-4" /> },
      { label: "Flask", icon: <SiFlask className="h-4 w-4" /> },
      { label: "PostgreSQL", icon: <SiPostgresql className="h-4 w-4" /> },
      { label: "Tailwind CSS", icon: <SiTailwindcss className="h-4 w-4" /> },
      { label: "Docker", icon: <SiDocker className="h-4 w-4" /> },
    ],
    images: [
      { src: "/file.svg", caption: "Dashboard (placeholder)" },
      { src: "/window.svg", caption: "Schema (placeholder)" },
    ],
  },
  {
    title: "CougarAI Website",
    description:
      "Revamped the club website with a modular React/Tailwind design and integrated the Google Calendar API for dynamic event tracking. Synced backend data via Flask REST APIs using psycopg2.",
    githubUrl: "https://github.com/Abyss999/CougarAI-Website-Revamp",
    techStack: [
      { label: "React", icon: <SiReact className="h-4 w-4" /> },
      { label: "Tailwind CSS", icon: <SiTailwindcss className="h-4 w-4" /> },
      { label: "Flask", icon: <SiFlask className="h-4 w-4" /> },
      { label: "PostgreSQL", icon: <SiPostgresql className="h-4 w-4" /> },
      { label: "Python", icon: <SiPython className="h-4 w-4" /> },
    ],
    images: [
      { src: "/globe.svg", caption: "Homepage (placeholder)" },
      { src: "/next.svg", caption: "Calendar (placeholder)" },
    ],
  },
  {
    title: "Coog Zoo",
    description:
      "Multi-role zoo management web app with secure authentication, dynamic data entry for animals/staff/events, and automated SQL triggers. Built dashboards for sales, donations, and event reporting.",
    githubUrl: "https://github.com/Abyss999/Zoo-DB-Project-Final",
    techStack: [
      { label: "React", icon: <SiReact className="h-4 w-4" /> },
      { label: "Express.js", icon: <SiExpress className="h-4 w-4" /> },
      { label: "Node.js", icon: <SiNodedotjs className="h-4 w-4" /> },
      { label: "MySQL", icon: <SiMysql className="h-4 w-4" /> },
      { label: "JavaScript", icon: <SiJavascript className="h-4 w-4" /> },
      { label: "Tailwind CSS", icon: <SiTailwindcss className="h-4 w-4" /> },
    ],
    images: [
      { src: "/window.svg", caption: "Dashboard (placeholder)" },
      { src: "/file.svg", caption: "Roles (placeholder)" },
    ],
  },
  {
    title: "Righteous Bot",
    description:
      "Feature-rich Discord bot with 650+ commands, API integrations (Spotify/Reddit/Twitter/TikTok), and web scraping. Built custom automation tools for moderation and interactive community features.",
    githubUrl: null,
    techStack: [
      { label: "Node.js", icon: <SiNodedotjs className="h-4 w-4" /> },
      { label: "Discord.js", icon: <Laptop className="h-4 w-4" /> },
      { label: "MongoDB", icon: <SiMongodb className="h-4 w-4" /> },
      { label: "JavaScript", icon: <SiJavascript className="h-4 w-4" /> },
    ],
    images: [
      { src: "/vercel.svg", caption: "Commands (placeholder)" },
      { src: "/pfp.jpg", caption: "Integrations (placeholder)" },
    ],
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 text-white">
      <Hero />
      <AboutMe />

      {/* SKILLS */}
      <section id="skills" className="scroll-mt-16 min-h-[calc(100vh-4rem)] py-20">
        <h2 className="mb-10 text-center text-5xl font-bold text-orange-500">
          My Skills
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <SkillCard title="Languages" skills={languageStack} />
          <SkillCard title="Frameworks" skills={frameworkStack} />
          <SkillCard title="Tools" skills={toolStack} />
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="scroll-mt-16 min-h-[calc(100vh-4rem)] py-20">
        <h2 className="mb-10 text-center text-5xl font-bold text-orange-500">
          Projects
        </h2>

        <div className="grid items-start gap-12 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>

        
      </section>
    </main>
  );
}
