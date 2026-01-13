"use client";
import {useMemo, useState} from "react";
import AboutMe from "@/components/AboutMe";
import Hero from "@/components/Hero";

import SkillCard from "@/components/SkillCard";
import ProjectCard from "@/components/ProjectCard";

import {projects, Tech, ProjectCategory} from "@/data/projects";
import ProjectCategoryFilter from "@/components/ProjectCategoryFilter";

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

const databaseStack = [
  Tech.postgresql,
  Tech.mysql,
  Tech.mongodb,
];

const dataStack = [
  Tech.pandas,
  Tech.numpy,
  Tech.scikitlearn,
  Tech.tensorflow,
]

const cloudStack = [
  Tech.docker,
  Tech.heroku,
  Tech.vercel,
]

const otherSkills = [
  Tech.github,
  Tech.vscode,
  Tech.jwt,
  Tech.rest,
]

export default function HomePage() {

  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "ALL">("ALL");
  const [activeTech, setActiveTech] = useState<string | null>(null);


  const filteredProjects = useMemo(() => {
    let list = projects;

    if (activeCategory !== "ALL") {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (activeTech) {
      list = list.filter((p) =>
        p.techStack.some((tech) => tech.label === activeTech)
      );
    }

    return list;
  }, [activeCategory, activeTech]);

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
          <SkillCard title="Databases" skills={databaseStack} />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <SkillCard title="Data" skills={dataStack} />
          <SkillCard title="Cloud" skills={cloudStack} />
          <SkillCard title="Other" skills={otherSkills} />
        </div>

        {/* SKILL OVERVIEW */}
        <div className="mt-12 grid gap-4 text-center md:grid-cols-4">

          <div className="rounded-lg bg-orange-500/10 p-6">
            <div className="text-3xl font-bold text-orange-500">{languageStack.length}</div>
            <div className="mt-2 text-sm text-gray-400">Languages</div>
          </div>

          <div className="rounded-lg bg-orange-500/10 p-6">
            <div className="text-3xl font-bold text-orange-500">{frameworkStack.length}</div>
            <div className="mt-2 text-sm text-gray-400">Frameworks</div>
          </div>

          <div className="rounded-lg bg-orange-500/10 p-6">
            <div className="text-3xl font-bold text-orange-500">{databaseStack.length}</div>
            <div className="mt-2 text-sm text-gray-400">Databases</div>
          </div>

          <div className="rounded-lg bg-orange-500/10 p-6">
            <div className="text-3xl font-bold text-orange-500">{projects.length}</div>
            <div className="mt-2 text-sm text-gray-400">Projects</div>
          </div>
          

        </div>



      </section>

      {/* PROJECTS */}
      <section id="projects" className="scroll-mt-16 min-h-[calc(100vh-4rem)] py-20">
        <h2 className="mb-10 text-center text-5xl font-bold text-orange-500">
          Projects
        </h2>

        <ProjectCategoryFilter
          active={activeCategory}
          onChange={(category) => setActiveCategory(category)}
        />

        {activeTech && (
          <div className="mb-6 flex justify-center">
            <button
              onClick={() => setActiveTech(null)}
              className="rounded-full px-4 py-2 text-sm text-orange-500 hover:bg-orange-500/15 transition-colors"
            >
              Filtered by: {activeTech} · Clear
            </button>
          </div>
        )}

        <div className="grid items-start gap-12 md:grid-cols-2">
          {filteredProjects.map((p) => (
            <ProjectCard key={p.id} {...p} onTechClick={(tech) => setActiveTech(tech)} />
          ))}
        </div>

        
      </section>
    </main>
  );
}
