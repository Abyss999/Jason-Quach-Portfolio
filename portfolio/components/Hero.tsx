"use client";

import { useState, useEffect, useRef } from "react";

const stats = [
  { prefix: "$", target: 8,   suffix: "K+", label: "Revenue"  },
  { prefix: "",  target: 100, suffix: "K+", label: "Users"    },
  { prefix: "",  target: 650, suffix: "+",  label: "Commands" },
  { prefix: "",  target: 12,  suffix: "",   label: "Projects"  },
];

export default function Hero() {
  const roles = ["Full-Stack Developer", "Backend Engineer", "Software Developer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const [counts, setCounts] = useState(stats.map(() => 0));
  const [started, setStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        if (displayedText.length < currentRole.length) {
          setDisplayedText(currentRole.substring(0, displayedText.length + 1));
          setTypingSpeed(100);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentRole.substring(0, displayedText.length - 1));
          setTypingSpeed(50);
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, typingSpeed]);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = t * (2 - t);
      setCounts(stats.map((s) => Math.round(eased * s.target)));
      if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [started]);

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] scroll-mt-16 py-20 flex items-center"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute right-[-140px] bottom-[-140px] h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto text-center">
        {/* Badge */}
        <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-700 dark:text-orange-300">
          <span className="text-[10px]">◈</span>
          Computer Science · University of Houston
        </p>

        {/* Two-line name */}
        <h1 className="mt-6 font-[family-name:var(--font-syne)] font-extrabold leading-[0.9] tracking-tight">
          <span className="block text-6xl sm:text-8xl md:text-[118px] text-gray-900 dark:text-white">
            Jason
          </span>
          <span className="block text-6xl sm:text-8xl md:text-[118px] bg-gradient-to-r from-orange-500 via-orange-400 to-orange-200 bg-clip-text text-transparent">
            Quach
          </span>
        </h1>

        {/* Typing role */}
        <div className="mt-6 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl md:text-3xl min-h-[2rem] sm:min-h-[2.5rem]">
          <span>{displayedText}</span>
          <span className="animate-blink text-orange-500">|</span>
        </div>

        {/* Description */}
        <p className="mt-4 mx-auto max-w-2xl text-lg leading-relaxed text-gray-700 dark:text-white/80">
          Building scalable web applications that generate real revenue.
          Creator of a Discord bot with 650+ commands that made{" "}
          <strong className="text-gray-900 dark:text-white font-semibold">$8K+</strong> in sales, serving{" "}
          <strong className="text-gray-900 dark:text-white font-semibold">100,000+</strong> users across 1,000+ servers.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <a
            href="/#projects"
            className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-orange-400 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
          >
            View Projects
          </a>
          <a
            href="#about"
            className="rounded-full border border-orange-500 dark:border-orange-500/40 px-6 py-3 text-sm font-semibold text-orange-600 dark:text-orange-300 transition-all hover:bg-orange-500/10 hover:-translate-y-0.5"
          >
            About Me
          </a>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="mt-10 flex items-center justify-center gap-0">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="flex flex-col gap-0.5 pr-3 sm:pr-6 md:pr-8">
                <span className="font-[family-name:var(--font-syne)] text-2xl font-bold text-orange-500 leading-none">
                  {stat.prefix}{counts[i]}{stat.suffix}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 dark:text-white/35">
                  {stat.label}
                </span>
              </div>
              {i < stats.length - 1 && (
                <div className="w-px h-9 bg-gray-300/60 dark:bg-white/10 mr-3 sm:mr-6 md:mr-8" />
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </section>
  );
}
