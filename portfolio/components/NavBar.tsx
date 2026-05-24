"use client";

import {useEffect, useState} from "react";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";

import { Menu } from "lucide-react";

const RESUME_HREF = "/docs/resume.pdf";

function NavLink({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}) {

  const classes = cn(
    "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
    "text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/6",
    isActive && "text-orange-500 dark:text-orange-500 hover:text-orange-500 dark:hover:text-orange-500"
  );

    if (onClick) {
      return (
        <button  type="button" onClick={onClick} className={classes}>
          {label}
        </button>
      )
    }

    return (
      <Link
        href={href}
        onClick={onClick}
        className={classes}
      >
        {label}
      </Link>
    );
  }

export default function NavBar() {

  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("hero");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (atBottom) setActiveSection("contact");
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "About", path: "/#about", id: "about" },
    { label: "Skills", path: "/#skills", id: "skills" },
    { label: "GitHub", path: "/#github", id: "github" },
    { label: "Projects", path: "/#projects", id: "projects" },
    { label: "Contact", path: "/#contact", id: "contact" },
  ];

  useEffect(() => {
    const sections = ["hero", "about", "skills", "github", "projects", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        })
      }, {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    )

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
      
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 z-[60] h-[2px] bg-orange-500 transition-[width] duration-75"
        style={{ width: `${scrollProgress}%` }}
      />
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/85 dark:bg-[rgba(8,6,4,0.88)] backdrop-blur-lg dark:[backdrop-filter:blur(18px)_saturate(1.4)] border-b border-gray-200/60 dark:border-white/8"
          : "bg-transparent"
      )}>
        <div>
          <div className="mx-auto grid h-16 max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4">
            {/* Brand */}
            <Link
              href="/"
              className="font-[family-name:var(--font-syne)] text-xl font-extrabold tracking-tight text-orange-500"
            >
              JQ
            </Link>

            {/* Desktop Nav — centered */}
            <nav className="hidden items-center justify-center gap-1 md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  href={item.path}
                  label={item.label}
                  isActive={activeSection === item.id}
                />
              ))}
            </nav>

            {/* Right side — Resume + Theme */}
            <div className="hidden items-center gap-2 md:flex">
              <a
                href={RESUME_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-orange-500/40 px-5 py-1.5 text-sm font-semibold text-orange-500 transition-colors hover:bg-orange-500/14"
              >
                Resume
              </a>
              <ThemeToggle/>
            </div>

            {/* Mobile Nav */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle/>
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  
                  <button
                      aria-label="Open menu"
                      className="inline-flex items-center justify-center rounded-md 
                              p-2 text-orange-500 
                              hover:bg-orange-500/15 
                              transition-colors"
                  >
                      <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>

                <SheetContent side="right" className="bg-white dark:bg-black text-gray-900 dark:text-white">
                  <SheetHeader>
                    <SheetTitle className="text-gray-900 dark:text-orange-500">Navigation</SheetTitle>
                  </SheetHeader>
                  
                  <div className="mt-6 flex flex-col gap-2">
                      {navItems.map((item) => (
                          <NavLink
                              key={item.path}
                              href={item.path}
                              label={item.label}
                              isActive={activeSection === item.id}
                              onClick={() => setOpen(false)}
                          />
                      ))}

                    <div className="mt-4">
                      <Button
                        asChild
                        className="w-full rounded-full bg-orange-500 text-black hover:bg-orange-400"
                      >
                        <a href={RESUME_HREF} target="_blank" rel="noopener noreferrer">
                          Resume
                        </a>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

    </>
  );
}