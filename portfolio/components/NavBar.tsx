"use client";

import {useEffect, useState} from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import ContactMe from "@/components/ContactMe";

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

const RESUME_HREF = "/resume.pdf";

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
    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
        "text-orange-500 hover:text-orange-500 hover:bg-orange-500/15",
        isActive && "text-orange-500 bg-orange-500/20"
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

  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("hero");

  const navItems = [
    { label: "Home", path: "/#hero", id: "hero" },
    { label: "About", path: "/#about", id: "about" },
    { label: "Skills", path: "/#skills", id: "skills" },
    { label: "Projects", path: "/#projects", id: "projects" },
    { label: "Contact", path: "#", onClick: () => {
        setContactOpen(true)
      } 
    },
  ];

  useEffect(() => {
    const sections = ["hero", "about", "skills", "projects"];

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
      <header className="sticky top-0 z-50">
        <div className="bg-white dark:bg-black">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
            {/* Brand */}
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-orange-500"
            >
              Jason Quach
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
     
                  return (
                      <NavLink
                          key={item.path}
                          href={item.path}
                          label={item.label}
                          isActive={item.id ? activeSection === item.id : false}
                          onClick={item.onClick}
                      />
                  );
              })}
              <Button
                asChild
                className="ml-2 rounded-full bg-orange-500 text-black hover:bg-orange-400"
              >
                <a href={RESUME_HREF} target="_blank" rel="noopener noreferrer">
                  Resume
                </a>
              </Button>

              <ThemeToggle/>
            </nav>

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
                      {navItems.map((item) => {
                 
                          return (
                              <NavLink
                                  key={item.path}
                                  href={item.path}
                                  label={item.label}
                                  isActive={item.id ? activeSection === item.id : false}
                                  onClick={
                                    item.onClick
                                      ? () => {
                                          setOpen(false);
                                          item.onClick?.();
                                        }
                                      : () => setOpen(false)
                                  }

                              />
                          );
                      })}

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

      <ContactMe open={contactOpen} onOpenChange={setContactOpen} />
    </>   
  );
}