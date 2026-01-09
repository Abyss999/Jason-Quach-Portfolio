"use client";

import { useState, useEffect } from "react";

export default function Hero() {
    const roles = ["Full-Stack Developer", "Backend Engineer", "Software Developer"];
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);

    useEffect(() => {
        const currentRole = roles[currentRoleIndex];

        const handleTyping = () => {
            if (!isDeleting) {
                // Typing forward
                if (displayedText.length < currentRole.length) {
                    setDisplayedText(currentRole.substring(0, displayedText.length + 1));
                    setTypingSpeed(100);
                } else {
                    // Pause before deleting
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                // Deleting
                if (displayedText.length > 0) {
                    setDisplayedText(currentRole.substring(0, displayedText.length - 1));
                    setTypingSpeed(50);
                } else {
                    // Move to next role
                    setIsDeleting(false);
                    setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
                }
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentRoleIndex, typingSpeed]);

    return (
        <section 
            id="hero"
            className="relative min-h-[calc(100vh-4rem)] scroll-mt-16 py-20 flex items-center"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
            >
                <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
                <div className="absolute right-[-140px] bottom-[-140px] h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
            </div>

            <div className="max-w-3xl">
                {/* small intro */}
                <p className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-300 dark:text-orange-300">
                    Computer Science • University of Houston
                </p>

                {/* headline */}
                <h1 className="mt-6 text-5xl font-extrabold tracking-tight sm:text-6xl">
                    <span className="text-gray-900 dark:text-white">Hello, I'm </span>
                    <span className="text-orange-500">Jason</span>
                    <span className="text-gray-900 dark:text-white"> 👋</span>
                </h1>

                {/* Dynamic role with typing effect */}
                <div className="mt-5 text-2xl font-semibold text-gray-900 dark:text-white sm:text-3xl min-h-[2.5rem]">
                    <span>{displayedText}</span>
                    <span className="animate-blink">|</span>
                </div>

                {/* description */}
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700 dark:text-white/80">
                    Building scalable web applications that generate real revenue. 
                    Creator of a bot with 650+ commands that made <b>$8K+</b> in sales.
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap gap-3">
                    <a
                        href="/#projects"
                        className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-orange-400"
                    >
                        View Projects
                    </a>

                    <a
                        href="#about"
                        className="rounded-full border border-orange-500/40 px-6 py-3 text-sm font-semibold text-orange-500 dark:text-orange-300 transition-colors hover:bg-orange-500/10 hover:text-orange-400 dark:hover:text-orange-200"
                    >
                        About Me
                    </a>
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