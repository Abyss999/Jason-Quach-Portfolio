import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Left side - Name/Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-orange-500">Jason Quach</h3>
            <p className="mt-1 text-sm text-white/60">Computer Science • Full-Stack</p>
          </div>

          {/* Center - Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Abyss999"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-orange-500/30 bg-transparent text-orange-500 transition-all hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-400"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/jason-tran-quach/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-orange-500/30 bg-transparent text-orange-500 transition-all hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-400"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:jtquach@cougarnet.uh.edu"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-orange-500/30 bg-transparent text-orange-500 transition-all hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-400"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          {/* Right side - Copyright */}
          <div className="text-center text-sm text-white/60 md:text-right">
            <p>© {currentYear} Jason Quach</p>
            <p className="mt-1">All rights reserved.</p>
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-8 border-t border-white/5 pt-8 text-center">
          <p className="text-xs text-white/40">
            Built with Next.js, React, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}