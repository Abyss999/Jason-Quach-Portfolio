
import AboutMe from "@/components/AboutMe";
import Hero from "@/components/Hero";

import SkillCard from "@/components/SkillCard";
import ProjectCard from "@/components/ProjectCard";

import {projects, Tech} from "@/data/projects";

const languageStack = [
  Tech.typescript,
  Tech.javascript,
  Tech.python,
  Tech.cpp,
  Tech.r,
];

const frameworkStack = [
  Tech.tailwindcss,
  Tech.expressjs,
  Tech.nodejs,
  Tech.nextjs,
  Tech.react,
  Tech.flask,
];

const toolStack = [
  Tech.postgresql,
  Tech.mysql,
  Tech.mongodb,
  Tech.docker,
  Tech.github,
  Tech.vscode,
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
            <ProjectCard key={p.id} {...p} />
          ))}
        </div>

        
      </section>
    </main>
  );
}
