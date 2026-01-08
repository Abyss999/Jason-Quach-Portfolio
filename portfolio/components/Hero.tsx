"use client";

export default function Hero() {
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
                <p className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-300">
                    Computer Science • Full-Stack
                </p>

                {/* headline */}
                <h1 className="mt-6 text-5xl font-extrabold tracking-tight sm:text-6xl">
                    <span className="text-white">Hello, I'm</span>
                    <span className="text-orange-500"> Jason</span>
                    <span className="text-white"> 👋</span>
                </h1>

                {/* subheading */}
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
                I build stuff. I use a lot of stuff like React, 
                Next.JS, Flask, etc 
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
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-orange-500/40 px-6 py-3 text-sm font-semibold text-orange-300 transition-colors hover:bg-orange-500/10 hover:text-orange-200"
                    >
                        Resume
                    </a>
                </div>

            </div>

            </section>
    )
}