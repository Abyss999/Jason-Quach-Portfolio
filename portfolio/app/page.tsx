"use client";
import {useMemo, useState, useEffect} from "react";
import AboutMe from "@/components/AboutMe";
import Hero from "@/components/Hero";

import SkillCard from "@/components/SkillCard";
import ProjectCard from "@/components/ProjectCard";
import TechBadge from "@/components/TechBadge";

import {projects, Tech, ProjectCategory} from "@/data/projects";
import ProjectCategoryFilter from "@/components/ProjectCategoryFilter";
import { Button } from "@/components/ui/button";
import { X, BookOpen, GitCommit, Users } from "lucide-react";

// Map GitHub API language names → Tech entries for badge rendering
const LANG_TO_TECH: Record<string, { label: string; icon: React.ReactNode }> = {
  TypeScript: Tech.typescript,
  JavaScript: Tech.javascript,
  Python: Tech.python,
  "C++": Tech.cpp,
  R: Tech.r,
};

type GitHubStats = {
  repos: number;
  followers: number;
  contributions: number | null; // null = token not set yet, hides the stat gracefully
  topLangs: { name: string; count: number }[];
};

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
  Tech.streamlit,
  Tech.nodejs,
  Tech.nextjs,
  Tech.react,
  Tech.flask,
];

const databaseStack = [
  Tech.postgresql,
  Tech.mysql,
  Tech.sql_server,
  Tech.mongodb,
];

const dataStack = [
  Tech.pandas,
  Tech.numpy,
  Tech.scikitlearn,
  Tech.tensorflow,
];

const cloudStack = [
  Tech.docker,
  Tech.heroku,
  Tech.vercel,
  Tech.azure,
];

const otherSkills = [
  Tech.github,
  Tech.vscode,
  Tech.jwt,
  Tech.rest,
];

export default function HomePage() {

  const [activeCategories, setActiveCategories] = useState<Set<ProjectCategory>>(new Set());
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [githubLoading, setGithubLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const [userRes, reposRes, contributionsRes] = await Promise.all([
          fetch("https://api.github.com/users/Abyss999"),
          fetch("https://api.github.com/users/Abyss999/repos?per_page=100&sort=stars"),
          // Our own API route — the token never leaves the server
          fetch("/api/github-stats"),
        ]);
        const user = await userRes.json();
        const repos: { language: string | null }[] = await reposRes.json();
        const contributionsData = await contributionsRes.json();

        const langMap: Record<string, number> = {};
        repos.forEach((r) => {
          if (r.language) langMap[r.language] = (langMap[r.language] ?? 0) + 1;
        });
        const topLangs = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({ name, count }));

        setGithubStats({ repos: user.public_repos, followers: user.followers, contributions: contributionsData.contributions, topLangs });
      } catch {
        // silently fail — section just won't render
      } finally {
        setGithubLoading(false);
      }
    }
    fetchGitHub();
  }, []);

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const toEmail = "jtquach@cougarnet.uh.edu";
  const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(`Portfolio Contact from ${contactName} || Portfolio`)}&body=${encodeURIComponent(`Name: ${contactName}\nEmail: ${contactEmail}\n\nMessage:\n${contactMessage}`)}`;

  const clearAllFilters = () => {
    setActiveCategories(new Set());
    setActiveTech(null);
  };

  const toggleCategory = (category: ProjectCategory | "ALL") => {
    if (category === "ALL") {
      clearAllFilters();
    } else {
      setActiveCategories((prev) => {
        const next = new Set(prev);
        if (next.has(category)) {
          next.delete(category);
        } else {
          next.add(category);
        }
        return next;
      });
    }
  };

  const filteredProjects = useMemo(() => {
    let list = projects;

    // Filter by categories — show projects that match ANY selected category (OR logic)
    if (activeCategories.size > 0) {
      list = list.filter((p) =>
        Array.from(activeCategories).some((cat) => p.categories.includes(cat))
      );
    }

    if (activeTech) {
      list = list.filter((p) =>
        p.techStack.some((tech) => tech.label === activeTech)
      );
    }

    return list;
  }, [activeCategories, activeTech]);

  return (
    <main className="mx-auto max-w-6xl px-4 text-white">
      <Hero />
      <AboutMe />

      {/* SKILLS */}
      <section id="skills" className="scroll-mt-16 min-h-[calc(100vh-4rem)] py-20">
        <h2 className="mb-10 text-center text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500">
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
          <div className="rounded-lg bg-orange-500/10 p-6 transition-transform hover:-translate-y-1">
            <div className="text-3xl font-bold text-orange-500">{languageStack.length}</div>
            <div className="mt-2 text-sm text-gray-400">Languages</div>
          </div>

          <div className="rounded-lg bg-orange-500/10 p-6 transition-transform hover:-translate-y-1">
            <div className="text-3xl font-bold text-orange-500">{frameworkStack.length}</div>
            <div className="mt-2 text-sm text-gray-400">Frameworks</div>
          </div>

          <div className="rounded-lg bg-orange-500/10 p-6 transition-transform hover:-translate-y-1">
            <div className="text-3xl font-bold text-orange-500">{databaseStack.length}</div>
            <div className="mt-2 text-sm text-gray-400">Databases</div>
          </div>

          <div className="rounded-lg bg-orange-500/10 p-6 transition-transform hover:-translate-y-1">
            <div className="text-3xl font-bold text-orange-500">{projects.length}</div>
            <div className="mt-2 text-sm text-gray-400">Projects</div>
          </div>
        </div>

        {/* GITHUB STATS */}
        {(githubLoading || githubStats) && (
          <div className="mt-12">
            <h3 className="mb-6 text-center text-xl font-semibold text-gray-400">
              GitHub Activity
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">

              {/* Stats card */}
              <div className="rounded-xl border border-orange-500/10 bg-orange-500/5 p-6">
                <a
                  href="https://github.com/Abyss999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-orange-500 transition-colors"
                >
                  github.com/Abyss999 ↗
                </a>
                {githubLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-6 animate-pulse rounded bg-orange-500/10" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[
                      { icon: <BookOpen className="h-4 w-4" />, label: "Public Repos",  value: githubStats!.repos },
                      { icon: <Users    className="h-4 w-4" />, label: "Followers",     value: githubStats!.followers },
                      ...(githubStats!.contributions !== null ? [
                        { icon: <GitCommit className="h-4 w-4" />, label: "Contributions", value: githubStats!.contributions! },
                      ] : []),
                    ].map(({ icon, label, value }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm text-gray-400">
                          <span className="text-orange-500">{icon}</span>
                          {label}
                        </span>
                        <span className="font-bold text-orange-500">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Top languages card */}
              <div className="rounded-xl border border-orange-500/10 bg-orange-500/5 p-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Top Languages
                </p>
                {githubLoading ? (
                  <div className="flex flex-wrap gap-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-7 w-24 animate-pulse rounded-full bg-orange-500/10" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {githubStats!.topLangs.map(({ name, count }) => {
                      const tech = LANG_TO_TECH[name];
                      return (
                        <div key={name} className="flex items-center justify-between">
                          {tech ? (
                            <TechBadge label={tech.label} icon={tech.icon} size="sm" />
                          ) : (
                            <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-500">
                              {name}
                            </span>
                          )}
                          <span className="text-sm text-gray-500">
                            {count} {count === 1 ? "repo" : "repos"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            {/* Contribution graph */}
            <div className="sm:col-span-2 rounded-xl border border-orange-500/10 bg-orange-500/5 p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Contribution Graph
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://ghchart.rshah.org/f97316/Abyss999"
                alt="Abyss999's GitHub contribution graph"
                className="w-full"
              />
            </div>

            </div>
          </div>
        )}

      </section>

      {/* PROJECTS */}
      <section id="projects" className="scroll-mt-16 min-h-[calc(100vh-4rem)] py-20">
        <h2 className="mb-10 text-center text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500">
          Projects
        </h2>

        <ProjectCategoryFilter
          activeCategories={activeCategories}
          onChange={toggleCategory}
          resultCount={filteredProjects.length}
          total={projects.length}
        />

        {(activeTech || activeCategories.size > 0) && (
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            {activeTech && (
              <button
                onClick={() => setActiveTech(null)}
                className="flex items-center gap-1.5 rounded-full bg-orange-500/15 px-3 py-1.5 text-sm text-orange-500 hover:bg-orange-500/25 transition-all"
              >
                <span>{activeTech}</span>
                <X className="h-3 w-3" />
              </button>
            )}
            <button
              onClick={clearAllFilters}
              className="rounded-full border border-orange-500/20 px-3 py-1.5 text-sm text-gray-400 hover:text-orange-500 hover:border-orange-500/40 transition-all"
            >
              Clear all
            </button>
          </div>
        )}

        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <p className="text-lg text-gray-400">No projects match these filters.</p>
            <button
              onClick={clearAllFilters}
              className="rounded-full bg-orange-500/15 px-5 py-2 text-sm text-orange-500 hover:bg-orange-500/25 transition-all"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((p) => (
              <ProjectCard key={p.id} {...p} onTechClick={(tech) => setActiveTech(tech)} />
            ))}
          </div>
        )}


      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-16 min-h-[calc(100vh-4rem)] py-20">
        <h2 className="mb-10 text-center text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500">
          Get In Touch
        </h2>

        <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 dark:border-orange-500/20 bg-white dark:bg-white/5 p-8">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-orange-500/20 bg-gray-50 dark:bg-white/5 px-4 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 outline-none focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/20"
            />
            <input
              type="text"
              placeholder="Your Email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-orange-500/20 bg-gray-50 dark:bg-white/5 px-4 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 outline-none focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/20"
            />
            <textarea
              placeholder="Your Message"
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              rows={6}
              className="w-full resize-none rounded-xl border border-gray-200 dark:border-orange-500/20 bg-gray-50 dark:bg-white/5 px-4 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 outline-none focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          <Button asChild className="mt-6 w-full border border-orange-500/30 bg-orange-500/15 text-orange-500 hover:bg-orange-500/20 hover:text-orange-300">
            <a href={mailtoLink}>Send Message</a>
          </Button>

          <p className="mt-4 text-center text-sm text-gray-600 dark:text-white/60">
            Or email me directly at{" "}
            <a href={`mailto:${toEmail}`} className="text-orange-500 hover:text-orange-400 hover:underline">
              {toEmail}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}