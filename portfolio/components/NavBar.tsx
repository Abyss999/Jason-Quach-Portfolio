"use client";

import {useState} from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

const navItems = [
  { label: "Home", path: "/#hero" },
  { label: "About", path: "/#about" },
  { label: "Skills", path: "/#skills" },
  { label: "Projects", path: "/#projects" },
  { label: "Contact", path: "/contact" },
];

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
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
        "text-orange-400 hover:text-orange-500 hover:bg-orange-500/15",
        isActive && "text-orange-500 bg-orange-500/20"
      )}
    >
      {label}
    </Link>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
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
                const isActive =
                    item.path === pathname ||
                    (pathname === "/" && item.path.startsWith("/#"));
                return (
                    <NavLink
                        key={item.path}
                        href={item.path}
                        label={item.label}
                        isActive={!isActive}
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
          <div className="md:hidden">
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
                        const isActive =
                            item.path === pathname ||
                            (pathname === "/" && item.path.startsWith("/#"));
                        return (
                            <NavLink
                                key={item.path}
                                href={item.path}
                                label={item.label}
                                isActive={!isActive}
                                onClick={() => setOpen(false)}
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
  );
}