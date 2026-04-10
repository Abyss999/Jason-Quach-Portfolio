"use client";
import * as React from "react";
import Image from "next/image";
import { ExternalLink, Github, ChevronLeft, ChevronRight, Code2, BarChart3, Brain, Database, Globe} from "lucide-react";
import TechBadge from "@/components/TechBadge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

type ProjectImage = {
    src: string;
    alt?: string;
    caption?: string;
    hidden?: boolean;
};

type Tech = {
    label: string;
    icon?: React.ReactNode;
}

type ProjectCardProps = {
    title: string;
    description: string;
    longDescription?: string;
    images: ProjectImage[];
    techStack: Tech[];
    githubLink?: string | null | undefined;
    liveLink?: string | null | undefined;
    categories?: string[];
    onTechClick?: (tech: string) => void;
};

const CATEGORY_MAP: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  SWE: {
    label: "Software Engineering",
    icon: <Code2 className="h-3 w-3" />,
    className: "border-orange-500/40 text-orange-500 bg-orange-500/10",
  },
  DS: {
    label: "Data Science",
    icon: <BarChart3 className="h-3 w-3" />,
    className: "border-blue-500/40 text-blue-500 bg-blue-500/10",
  },
  ML: {
    label: "Machine Learning",
    icon: <Brain className="h-3 w-3" />,
    className: "border-green-500/40 text-green-500 bg-green-500/10",
  },
  DE: {
    label: "Data Engineering",
    icon: <Database className="h-3 w-3" />,
    className: "border-purple-500/40 text-purple-500 bg-purple-500/10",
  },
  WIP: {
    label: "WIP",
    icon: <Globe className="h-3 w-3" />,
    className: "border-yellow-500/40 text-yellow-500 bg-yellow-500/10",
  },
};

export default function ProjectCard({
    title, description, longDescription, images, techStack, githubLink, liveLink, categories, onTechClick,
}: ProjectCardProps) {
    const [open, setOpen] = React.useState(false);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const visibleImages = images.filter((img) => !img.hidden);
    const hero = visibleImages?.[0];
    const canOpen = visibleImages.length > 0;

    const prev = React.useCallback(() => {
        setCurrentImageIndex((i) => (i - 1 + visibleImages.length) % visibleImages.length);
    }, [visibleImages.length]);

    const next = React.useCallback(() => {
        setCurrentImageIndex((i) => (i + 1) % visibleImages.length);
    }, [visibleImages.length]);

    React.useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, prev, next]);

    const isGif = (src: string) => src.toLowerCase().endsWith(".gif");

    return (
        <>
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 backdrop-blur shadow-sm transition-all duration-300 hover:border-orange-500/40 hover:-translate-y-1 h-full">

            {/* Image */}
            <button
                type="button"
                onClick={() => { if (!canOpen) return; setCurrentImageIndex(0); setOpen(true); }}
                className={["relative w-full aspect-video overflow-hidden bg-gray-100 dark:bg-black/30 focus:outline-none", canOpen ? "cursor-pointer" : "cursor-default"].join(" ")}
                aria-label={canOpen ? "Open project gallery" : title}
            >
                {hero ? (
                    <>
                        {isGif(hero.src) ? (
                            <img src={hero.src} alt={hero.alt ?? title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                        ) : (
                            <Image src={hero.src} alt={hero.alt ?? title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                        )}
                        {/* hover overlay */}
                        {canOpen && (
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        )}
                        {canOpen && visibleImages.length > 1 && (
                            <div className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                {visibleImages.length} photos
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400 dark:text-white/30">
                        No preview
                    </div>
                )}

                {/* Category badges overlaid top-left */}
                {categories && categories.length > 0 && (
                    <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                        {categories.map((cat) =>
                            CATEGORY_MAP[cat] ? (
                                <span
                                    key={cat}
                                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm ${CATEGORY_MAP[cat].className}`}
                                >
                                    {CATEGORY_MAP[cat].icon}
                                    {CATEGORY_MAP[cat].label}
                                </span>
                            ) : null
                        )}
                    </div>
                )}
            </button>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4 gap-3">
                <h3 className="text-base font-semibold text-orange-500 leading-snug">{title}</h3>

                <p className="text-sm leading-relaxed text-gray-700 dark:text-white/70 line-clamp-3 flex-1">
                    {description}
                </p>

                {/* Tech badges */}
                {techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {techStack.map((t) => (
                            <button
                                key={t.label}
                                type="button"
                                onClick={() => onTechClick?.(t.label)}
                                className={onTechClick ? "text-left" : "pointer-events-none"}
                            >
                                <TechBadge label={t.label} icon={t.icon} size="sm" className={onTechClick ? "cursor-pointer" : ""} />
                            </button>
                        ))}
                    </div>
                )}

                {/* Links */}
                {(githubLink || liveLink) && (
                    <div className="flex gap-2 pt-1">
                        {githubLink && (
                            <Button asChild size="sm" className="gap-1.5 border border-orange-500/30 bg-transparent text-orange-500 hover:bg-orange-500/10 hover:text-orange-300 h-8 px-3 text-xs">
                                <a href={githubLink} target="_blank" rel="noreferrer">
                                    <Github className="h-3.5 w-3.5" />
                                    GitHub
                                </a>
                            </Button>
                        )}
                        {liveLink && (
                            <Button asChild size="sm" className="gap-1.5 border border-orange-500/30 bg-transparent text-orange-500 hover:bg-orange-500/10 hover:text-orange-300 h-8 px-3 text-xs">
                                <a href={liveLink} target="_blank" rel="noreferrer">
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    Live
                                </a>
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>

        {/* Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-none w-[min(96vw,1500px)] h-[88vh] p-0 bg-white dark:bg-black/95 text-gray-900 dark:text-white border border-gray-200 dark:border-orange-500/20 overflow-hidden">
                {/* Hidden title for accessibility */}
                <DialogHeader className="sr-only">
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col md:flex-row h-full overflow-hidden">
                    {/* Left — gallery */}
                    <div className="flex flex-col min-h-0 md:flex-1 bg-gray-100 dark:bg-black/40 p-4 gap-3 h-full">
                        {/* Main image */}
                        <div className="relative flex-1 min-h-0 rounded-xl border border-gray-200 dark:border-orange-500/20 overflow-hidden flex items-center justify-center">
                            {visibleImages?.[currentImageIndex] ? (
                                <Image
                                    src={visibleImages[currentImageIndex].src}
                                    alt={visibleImages[currentImageIndex].alt ?? `${title} screenshot ${currentImageIndex + 1}`}
                                    width={1600}
                                    height={900}
                                    className="h-full w-full object-contain"
                                />
                            ) : null}

                            {visibleImages.length > 1 ? (
                                <>
                                    <Button variant="secondary" size="icon" className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-black/60 hover:bg-black/85 border border-white/20 text-white shadow-lg backdrop-blur-sm" onClick={prev} aria-label="Previous image">
                                        <ChevronLeft className="h-6 w-6" />
                                    </Button>
                                    <Button variant="secondary" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-black/60 hover:bg-black/85 border border-white/20 text-white shadow-lg backdrop-blur-sm" onClick={next} aria-label="Next image">
                                        <ChevronRight className="h-6 w-6" />
                                    </Button>
                                </>
                            ) : null}
                        </div>

                        {/* Caption */}
                        {visibleImages?.[currentImageIndex]?.caption ? (
                            <p className="text-xs text-gray-500 dark:text-white/50 text-center">
                                {visibleImages[currentImageIndex].caption}
                            </p>
                        ) : null}

                        {/* Thumbnail strip */}
                        {visibleImages.length > 1 ? (
                            <div className="grid grid-cols-4 gap-2 shrink-0">
                                {visibleImages.map((img, i) => (
                                    <button
                                        key={`${img.src}-${i}`}
                                        type="button"
                                        onClick={() => setCurrentImageIndex(i)}
                                        className={[
                                            "relative h-16 w-full overflow-hidden rounded-lg border transition-all",
                                            i === currentImageIndex
                                                ? "border-orange-500 ring-2 ring-orange-500/50"
                                                : "border-gray-300 dark:border-orange-500/20 bg-gray-100 dark:bg-black/40 opacity-60 hover:opacity-100 hover:border-orange-500/40",
                                            "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black",
                                        ].join(" ")}
                                        aria-label={`View image ${i + 1}`}
                                    >
                                        <Image src={img.src} alt={img.alt ?? `Thumbnail ${i + 1}`} width={400} height={240} className="h-full w-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    {/* Right — details */}
                    <div className="md:w-72 lg:w-80 shrink-0 flex flex-col overflow-y-auto border-t md:border-t-0 md:border-l border-gray-200 dark:border-orange-500/20 p-5 gap-4">
                        {/* Title */}
                        <h2 className="text-lg font-semibold text-orange-500 leading-snug">{title}</h2>

                        {/* Category badges */}
                        {categories && categories.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {categories.map((cat) =>
                                    CATEGORY_MAP[cat] ? (
                                        <span
                                            key={cat}
                                            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${CATEGORY_MAP[cat].className}`}
                                        >
                                            {CATEGORY_MAP[cat].icon}
                                            {CATEGORY_MAP[cat].label}
                                        </span>
                                    ) : null
                                )}
                            </div>
                        )}

                        {/* Description */}
                        <div className="flex flex-col gap-3">
                            <p className="text-sm leading-relaxed text-gray-700 dark:text-white/70">{description}</p>
                            {longDescription && (
                                <p className="text-sm leading-relaxed text-gray-600 dark:text-white/55">{longDescription}</p>
                            )}
                        </div>

                        {/* Tech stack */}
                        {techStack?.length ? (
                            <div className="flex flex-col gap-2">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-white/40">Tech Stack</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {techStack.map((t) => (
                                        <TechBadge key={t.label} label={t.label} icon={t.icon} size="sm" />
                                    ))}
                                </div>
                            </div>
                        ) : null}

                        {/* Links */}
                        {(githubLink || liveLink) && (
                            <div className="flex gap-2 pt-1 mt-auto">
                                {githubLink && (
                                    <Button asChild size="sm" className="gap-1.5 border border-orange-500/30 bg-transparent text-orange-500 hover:bg-orange-500/10 hover:text-orange-300 h-9 px-4 text-xs">
                                        <a href={githubLink} target="_blank" rel="noreferrer">
                                            <Github className="h-3.5 w-3.5" />
                                            GitHub
                                        </a>
                                    </Button>
                                )}
                                {liveLink && (
                                    <Button asChild size="sm" className="gap-1.5 border border-orange-500/30 bg-transparent text-orange-500 hover:bg-orange-500/10 hover:text-orange-300 h-9 px-4 text-xs">
                                        <a href={liveLink} target="_blank" rel="noreferrer">
                                            <ExternalLink className="h-3.5 w-3.5" />
                                            Live
                                        </a>
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
        </>
    );
}
