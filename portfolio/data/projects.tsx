import type { ReactNode } from "react";
import { Brain, Code2, Calendar, Layers, Search, TreePine, Trees, Globe } from "lucide-react";
import {
  SiTypescript, SiPython, SiJavascript, SiCplusplus, SiR,
  SiNodedotjs, SiReact, SiTailwindcss, SiExpress, SiFlask, SiNextdotjs,
  SiPostgresql, SiMysql, SiMongodb, SiDocker, SiGithub, SiPandas,
  SiScikitlearn, SiDiscord, SiSocketdotio,
} from "react-icons/si";

export const Tech = {
  typescript: { label: "TypeScript", icon: <SiTypescript className="h-4 w-4" /> },
  python: { label: "Python", icon: <SiPython className="h-4 w-4" /> },
  javascript: { label: "JavaScript", icon: <SiJavascript className="h-4 w-4" /> },
  cpp: { label: "C++", icon: <SiCplusplus className="h-4 w-4" /> },
  r: { label: "R", icon: <SiR className="h-4 w-4" /> },
  nodejs: { label: "Node.js", icon: <SiNodedotjs className="h-4 w-4" /> },
  react: { label: "React", icon: <SiReact className="h-4 w-4" /> },
  tailwindcss: { label: "Tailwind CSS", icon: <SiTailwindcss className="h-4 w-4" /> },
  expressjs: { label: "Express.js", icon: <SiExpress className="h-4 w-4" /> },
  flask: { label: "Flask", icon: <SiFlask className="h-4 w-4" /> },
  nextjs: { label: "Next.js", icon: <SiNextdotjs className="h-4 w-4" /> },
  postgresql: { label: "PostgreSQL", icon: <SiPostgresql className="h-4 w-4" /> },
  mysql: { label: "MySQL", icon: <SiMysql className="h-4 w-4" /> },
  mongodb: { label: "MongoDB", icon: <SiMongodb className="h-4 w-4" /> },
  docker: { label: "Docker", icon: <SiDocker className="h-4 w-4" /> },
  github: { label: "GitHub", icon: <SiGithub className="h-4 w-4" /> },
  pandas: { label: "Pandas", icon: <SiPandas className="h-4 w-4" /> },
  scikitlearn: { label: "scikit-learn", icon: <SiScikitlearn className="h-4 w-4" /> },
  discordjs: { label: "Discord.js", icon: <SiDiscord className="h-4 w-4" /> },
  socketio: { label: "Socket.IO", icon: <SiSocketdotio className="h-4 w-4" /> },
  playwright: { label: "Playwright", icon: <Globe className="h-4 w-4" /> },
  webscraping: { label: "Web Scraping", icon: <Search className="h-4 w-4" /> },
  decisiontrees: { label: "Decision Trees", icon: <TreePine className="h-4 w-4" /> },
  bagging: { label: "Bagging", icon: <Layers className="h-4 w-4" /> },
  randomforest: { label: "Random Forest", icon: <Trees className="h-4 w-4" /> },
  lightgbm: { label: "LightGBM", icon: <Brain className="h-4 w-4" /> },
  vscode: { label: "VS Code", icon: <Code2 className="h-4 w-4" /> },
  calendar: { label: "APScheduler", icon: <Calendar className="h-4 w-4" /> },
  express: { label: "Express", icon: <SiExpress className="h-4 w-4" /> },
  apscheduler: { label: "APScheduler", icon: <Calendar className="h-4 w-4" /> },
} satisfies Record<string, ProjectTech>;


export type ProjectCategory = "SWE" | "DS" | "ML" | "DE";

export type ProjectImage = { src: string; caption?: string; alt?: string };
export type ProjectTech = { label: string; icon: ReactNode };

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  githubLink?: string | null | undefined;  
  liveLink?: string | null | undefined;  
  category: ProjectCategory;
  techStack: ProjectTech[];
  images: ProjectImage[];
};

export const projects: Project[] = [
{
    id: "righteous-bot",
    title: "Righteous Bot",
    description: "Feature-rich Discord bot with 650+ commands, API integrations (Spotify/Reddit/Twitter/TikTok), and web scraping. Built custom automation tools for moderation and interactive community features.",
    githubLink: null,
    techStack: [
      Tech.nodejs,
      Tech.discordjs,
      Tech.mongodb,
      Tech.javascript,
    ],
    images: [
      { src: "/righteous.png", caption: "Connect 4 Command" },
      { src: "/righteous_1.png", caption: "Righteous Server Statistics" },
      { src: "/righteous_2.png", caption: "XXXTENTACION Colab" },
      { src: "/righteous_3.png", caption: "Spotify Integration" },
      { src: "/righteous_4.png", caption: "Youtube Integration" },
      { src: "/righteous_5.png", caption: "LastFM Integration" },
      { src: "/righteous_6.png", caption: "Wordle Command " },
    ],
    category: "SWE",
  },
  {
    id: "cougarai-website",
    title: "CougarAI Website",
    description: "Revamped club website with React/Tailwind and Google Calendar API integration.",
    githubLink: "https://github.com/Abyss999/CougarAI-Website-Revamp",
    liveLink: "https://www.cougarai.org/",
    techStack: [
      Tech.react,
      Tech.tailwindcss,
      Tech.flask,
      Tech.postgresql,
      Tech.python,
      Tech.nextjs,
    ],
    images: [
      { src: "/cai_old_1.png", caption: "Homepage" },
      { src: "/cai_old_2.png", caption: "Calendar" },
      { src: "/cai_old_3.png", caption: "Members" },
      { src: "/cai_old_4.png", caption: "About Us" },
    ],
    category: "SWE"
  },{
    id: "coog-zoo",
    title: "Coog Zoo",
    category: "SWE",
    description: "Multi-role zoo management web app with secure authentication, dynamic data entry for animals/staff/events, and automated SQL triggers. Built dashboards for sales, donations, and event reporting.",
    githubLink: "https://github.com/Abyss999/Zoo-DB-Project-Final",
    techStack: [
      Tech.react,
      Tech.express,
      Tech.nodejs,
      Tech.mysql,
      Tech.javascript,
      Tech.tailwindcss,
    ],
    images: [
      { src: "/zoo_5.png", caption: "Dashboard" },
      { src: "/zoo_1.png", caption: "Schema" },
      { src: "/zoo_2.png", caption: "Tickets" },
      { src: "/zoo_3.png", caption: "Calendar // Events" },
      { src: "/zoo_4.png", caption: "Membership" },
    ],
  },
  {
    id: "comic-bot",
    title: "Comic Bot",
    description: "Comic Bot is a Discord bot that lets users search, browse, and read comics from free comics online sources directly in Discord. Built with Node.js, it uses web scraping and MongoDB to index series and issues, supporting fast search, pagination, and page-by-page comic images.",
    longDescription: "Comic Bot is a Discord bot that enables users to search, browse, and read comics sourced from free comics online platforms directly within Discord. Built with Node.js, the bot automates comic discovery through web scraping, parses series and issue data, and stores structured metadata in MongoDB for fast lookup and pagination. The bot supports interactive search flows, issue navigation, and image-based reading, delivering a seamless reading experience without leaving Discord",
    githubLink: "https://github.com/Abyss999/comicbot",
    liveLink: null,
    techStack: [
        { label: "Discord.js", icon: <SiDiscord className="h-4 w-4" /> },
        Tech.nodejs,
        Tech.mongodb,
        Tech.webscraping,
        Tech.javascript,
    ],
    images: [
        { src: "/comic_1.png", caption: "Reading Spider-Man comics" },
        { src: "/comic_2.png", caption: "Scraping query" },
    ],
    category: "SWE",
}, {
    id: "volunteer-management-app",
    title: "Volunteer Management Web App",
    description: "Full-stack volunteer platform with JWT auth, email verification, and role-based access. Built admin/volunteer dashboards and implemented real-time reminders using Socket.IO + APScheduler.",
    githubLink: "https://github.com/Abyss999/volunteer-app",
    category: "SWE",
    techStack: [
      Tech.react,
      Tech.typescript,
      Tech.flask,
      Tech.postgresql,
      Tech.tailwindcss,
      Tech.docker,
      Tech.socketio,
      Tech.apscheduler,
    ],
    images: [
      { src: "/vol_1.png", caption: "Slideshow" },
      { src: "/vol_2.png", caption: "Admin Management Table" },
      { src: "/vol_3.png", caption: "Dashboard" },
    ],
  }, {
    id: "dblp-venue-analysis",
  title: "DBLP Venue Analysis",
  description:
    "Data science analysis of DBLP research venues using TF-IDF text features and citation metadata. Built classification, clustering, anomaly detection, and citation-network EDA pipelines, and evaluated models including LightGBM, Random Forest, SVM, and KNN.",
  githubLink: "https://github.com/Abyss999/DBLP-data-science",
  liveLink: "https://github.com/Abyss999/DBLP-data-science/blob/main/COSC%203337%20Group%20Project%20Report.pdf",
  techStack: [
    Tech.python,
    Tech.pandas,
    Tech.scikitlearn,
    Tech.lightgbm,
  ],
  images: [
    { src: "/DBLP_1.png"},
    { src: "/DBLP_2.png"},
    { src: "/DBLP_3.png"},
    { src: "/DBLP_4.png"},
  ],
  category: "DS",
}, {
    id: "student-dropout-prediction",
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
    },{
    id: "uh-dining-macros",
    title: "UH Dining Macros",
    description:
        "Python-based web scraper that extracts full nutritional data from University of Houston dining hall menus (Moody Towers) using Playwright. Automatically caches daily results into CSV files and computes macro efficiency metrics like protein-per-calorie for fast analysis and comparison.",
    githubLink: "https://github.com/Abyss999/UH-Dining-Macros",
    liveLink: null,
    techStack: [
        Tech.python,
        Tech.pandas,
        Tech.playwright,
        Tech.webscraping,
    ],
    images: [
        { src: "/uh_dining.gif", caption: "Gif of scraping process" },
        { src: "/uh_dining.png", caption: "Cached CSV output" },
        { src: "/uh_dining_1.png", caption: "Macro efficiency analysis"},
    ],
    category: "DE",
    },
]
