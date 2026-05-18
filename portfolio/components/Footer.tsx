import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/40 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold text-orange-500">
              Jason Quach
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-white/50">
              Computer Science · Full-Stack Developer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Abyss999"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/25 text-orange-500 transition-all hover:border-orange-500 hover:bg-orange-500/10"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/jason-tran-quach/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/25 text-orange-500 transition-all hover:border-orange-500 hover:bg-orange-500/10"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="mailto:jtquach@cougarnet.uh.edu"
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/25 text-orange-500 transition-all hover:border-orange-500 hover:bg-orange-500/10"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500 dark:text-white/50">
            © {currentYear} Jason Quach
          </p>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-white/5 pt-6 text-center">
          <p className="text-xs text-gray-400 dark:text-white/30">
            Built with Next.js · React · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
