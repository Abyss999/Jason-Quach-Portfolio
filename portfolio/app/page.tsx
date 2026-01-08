import Image from "next/image";

import AboutMe from "@/components/AboutMe";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

import SkillCard from "@/components/SkillCard";
import TechBadge from "@/components/TechBadge";
import ProjectCard from "@/components/ProjectCard";

import {Brain, Code2, Laptop, Layers, Search, TreePine, Trees, Globe} from "lucide-react";
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
  SiPandas,
  SiScikitlearn,
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
    title: "Righteous Bot",
    description:
      "Feature-rich Discord bot with 650+ commands, API integrations (Spotify/Reddit/Twitter/TikTok), and web scraping. Built custom automation tools for moderation and interactive community features.",
    githubLink: null,
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
    category: "SWE",
  },
  {
    title: "Volunteer Management Web App",
    description:
      "Full-stack volunteer platform with JWT auth, email verification, and role-based access. Built admin/volunteer dashboards and implemented real-time reminders using Socket.IO + APScheduler.",
    githubLink: "https://github.com/Abyss999/volunteer-app",
    category: "SWE",
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
    githubLink: "https://github.com/Abyss999/CougarAI-Website-Revamp",
    liveLink: "https://www.cougarai.org/",
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
    category: "SWE"
  },
  {
    title: "Coog Zoo",
    category: "SWE",
    description:
      "Multi-role zoo management web app with secure authentication, dynamic data entry for animals/staff/events, and automated SQL triggers. Built dashboards for sales, donations, and event reporting.",
    githubLink: "https://github.com/Abyss999/Zoo-DB-Project-Final",
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
  title: "Comic Bot",
  description:
    "Discord bot that fetches and serves comic content using web scraping and MongoDB-backed storage. Built with Node.js to automate content retrieval, parsing, and fast lookup through bot commands.",
  githubLink: "https://github.com/Abyss999/comicbot",
  liveLink: null,
  techStack: [
    { label: "Node.js", icon: <SiNodedotjs className="h-4 w-4" /> },
    { label: "MongoDB", icon: <SiMongodb className="h-4 w-4" /> },
    { label: "Web Scraping", icon: <Search className="h-4 w-4" /> },
    { label: "JavaScript", icon: <SiJavascript className="h-4 w-4" /> },
  ],
  images: [
    { src: "/file.svg", caption: "Comic commands (placeholder)" },
    { src: "/window.svg", caption: "Scraping pipeline (placeholder)" },
  ],
  category: "SWE",
},
{
  title: "DBLP Venue Analysis",
  description:
    "Data science analysis of DBLP research venues using TF-IDF text features and citation metadata. Built classification, clustering, anomaly detection, and citation-network EDA pipelines, and evaluated models including LightGBM, Random Forest, SVM, and KNN.",
  githubLink: "https://github.com/Abyss999/DBLP-data-science",
  liveLink: "https://github.com/Abyss999/DBLP-data-science/blob/main/COSC%203337%20Group%20Project%20Report.pdf",
  techStack: [
    { label: "Python", icon: <SiPython className="h-4 w-4" /> },
    { label: "Pandas", icon: <SiPandas className="h-4 w-4" /> },
    { label: "scikit-learn", icon: <SiScikitlearn className="h-4 w-4" /> },
    { label: "LightGBM", icon: <Brain className="h-4 w-4" /> },
  ],
  images: [
    { src: "/DBLP_1.png"},
    { src: "/DBLP_2.png"},
    { src: "/DBLP_3.png"},
    { src: "/DBLP_4.png"},
  ],
  category: "DS",
},
{
  title: "Student Dropout Prediction",
  description:
    "Built tree-based ML models to predict student dropout using the UCI “Predict Students' Dropout and Academic Success” dataset (4,424 students, 36 features). Performed preprocessing to avoid leakage, converted the outcome into Dropout vs No Dropout, and compared Decision Trees (with pruning), Bagging, and Random Forests using an 80/20 split and error-rate evaluation.",
  githubLink: null,
  liveLink: "/Dropout.pdf",
  techStack: [
    { label: "R", icon: <SiR className="h-4 w-4" /> },
    { label: "Decision Trees", icon: <TreePine className="h-4 w-4" /> },
    { label: "Bagging", icon: <Layers className="h-4 w-4" /> },
    { label: "Random Forest", icon: <Trees className="h-4 w-4" /> },
  ],
  images: [
    { src: "/Dropout_1.png" },
    { src: "/Dropout_2.png" },
    { src: "/Dropout_3.png" },
    { src: "/Dropout_4.png" },
    { src: "/Dropout_5.png" },
    { src: "/Dropout_6.png" },
  ],
  category: "ML",
},
{
  title: "UH Dining Macros",
  description:
    "Python-based web scraper that extracts full nutritional data from University of Houston dining hall menus (Moody Towers) using Playwright. Automatically caches daily results into CSV files and computes macro efficiency metrics like protein-per-calorie for fast analysis and comparison.",
  githubLink: "https://github.com/Abyss999/UH-Dining-Macros",
  liveLink: null,
  techStack: [
    { label: "Python", icon: <SiPython className="h-4 w-4" /> },
    { label: "Pandas", icon: <SiPandas className="h-4 w-4" /> },
    { label: "Playwright", icon: <Globe className="h-4 w-4" /> },
    { label: "Web Scraping", icon: <Search className="h-4 w-4" /> },
  ],
  images: [
    { src: "/uh_dining.gif", caption: "Gif of scraping process" },
    { src: "/uh_dining.png", caption: "Cached CSV output" },
    { src: "/uh_dining_1.png", caption: "Macro efficiency analysis"},
  ],
  category: "DE",
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
