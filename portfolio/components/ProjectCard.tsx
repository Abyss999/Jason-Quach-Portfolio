"use client";
import * as React from "react";
import Image from "next/image";
import { ExternalLink, Github, ChevronLeft, ChevronRight, X, Code2, BarChart3, Brain, Database, Globe} from "lucide-react";
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
    category?: string;
};


const CATEGORY_MAP: Record<
  string,
  {
    label: string;
    icon: React.ReactNode;
    className: string;
  }
> = {
  SWE: {
    label: "Software Engineering",
    icon: <Code2 />,
    className:
      "border-orange-500/40 text-orange-500 hover:bg-orange-500/15 hover:text-orange-400",
  },
  DS: {
    label: "Data Science",
    icon: <BarChart3 />,
    className:
      "border-blue-500/40 text-blue-500 hover:bg-blue-500/15 hover:text-blue-400",
  },
  ML: {
    label: "Machine Learning",
    icon: <Brain />,
    className:
      "border-green-500/40 text-green-500 hover:bg-green-500/15 hover:text-green-400",
  },
  DE: {
    label: "Data Engineering",
    icon: <Database />,
    className:
      "border-purple-500/40 text-purple-500 hover:bg-purple-500/15 hover:text-purple-400",
  }
};


export default function ProjectCard({
    title, description, longDescription, images, techStack, githubLink, liveLink, category,
}: ProjectCardProps) {
    const [open, setOpen] = React.useState(false);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    images = images.filter((img) => !img.hidden);
    const hero = images?.[0];

    const canOpen = Array.isArray(images) && images.length > 0;
    images = images.filter((img) => !img.hidden);
    const prev = React.useCallback(() => {
        setCurrentImageIndex((index) => (index - 1 + images.length) % images.length);
    }, [images.length]);

    const next = React.useCallback(() => {
        setCurrentImageIndex((index) => (index + 1) % images.length);
    }, [images.length]);

    // keyboard 

    React.useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key == "ArrowLeft") prev();
            if (e.key == "ArrowRight") next();
            if (e.key == "Escape") setOpen(false);
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, prev, next]);

    const isGif = (src: string) => src.toLowerCase().endsWith(".gif");

    return (
        <>
        <section id ="projects"
            className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-6 md:p-8 backdrop-blur shadow-sm transition-colors hover:border-orange-500/35 flex flex-col h-full"
>   
            <div className="grid items-stretch gap-12 md:grid-cols-2">
                <div className="flex flex-col">
                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl text-orange-500">
                        {title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-white/70 md:text-base">
                    {description}
                    </p>
                </div>

            <div className="flex flex-col gap-6">
            {/* buttons (only this wraps) */}
            <div className="flex flex-wrap gap-2">
                {githubLink ? (
                <Button
                    asChild
                    className="gap-2 border border-orange-500/30 bg-transparent text-orange-500 
                    hover:bg-orange-500/10 hover:text-orange-300">
                    <a href={githubLink} target="_blank" rel="noreferrer">
                    <Github className="h-4 w-4" />
                    Github
                    </a>
                </Button>
                ) : null}

                {liveLink ? (
                <Button 
                    asChild 
                    className="gap-2 border border-orange-500/30 bg-transparent text-orange-500 
                    hover:bg-orange-500/10 hover:text-orange-300">
                    <a href={liveLink} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Visit
                    </a>
                </Button>
                ) : null}
            </div>

            {/* tech stack */}
            {techStack?.length ? (
                <div className="mt-6 min-h-[148px]">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-orange-500">
                        Technologies Used
                    </p>
                <div className="grid grid-cols-2 gap-2">
                    {techStack.map((t) => (
                    <TechBadge key={t.label} label={t.label} icon={t.icon} size="sm" />
                    ))}
                </div>
                </div>
            ) : null}

            {/* category (stable position) */}
            <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-orange-500">
                Category
                </p>
                <div className="flex justify-start">
                {category && CATEGORY_MAP[category] ? (
                    <TechBadge
                    label={CATEGORY_MAP[category].label}
                    icon={CATEGORY_MAP[category].icon}
                    size="sm"
                    className={CATEGORY_MAP[category].className}
                    />
                ) : (
                    <div className="invisible">
                    <TechBadge label="Placeholder" icon={CATEGORY_MAP.SWE.icon} size="sm" />
                    </div>
                )}
                </div>
            </div>
            </div>



            </div>

        {/* RIGHT: image */}
          <div className="mt-auto pt-6">
            <button
              type="button"
              onClick={() => {
                if (!canOpen) return;
                setCurrentImageIndex(0);
                setOpen(true);
              }}
              className={[
                "group relative h-full w-full overflow-hidden rounded-2xl border border-orange-500/20 bg-gray-100 dark:bg-muted hover:border-orange-500/35 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                !canOpen ? "cursor-default" : "cursor-pointer",
              ].join(" ")}
              aria-label={canOpen ? "Open project gallery" : "Project image"}
            >
              {hero ? (
                <>
                  {isGif(hero.src) ? (
                    <img
                        src={hero.src}
                        alt={hero.alt ?? `${title} demo`}
                        className="h-[340px] w-full object-contain md:h-[420px]"
                    />
                    ) : (
                    <Image
                        src={hero.src}
                        alt={hero.alt ?? `${title} screenshot`}
                        width={1200}
                        height={800}
                        className="h-[340px] w-full object-contain md:h-[420px]"
                    />
                    )}

                  {/* subtle overlay hint */}
                  {canOpen ? (
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  ) : null}
                  {canOpen ? (
                    <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                      Click to view gallery
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="flex h-full min-h-[220px] items-center justify-center text-sm text-gray-500 dark:text-muted-foreground">
                  No image provided
                </div>
              )}
            </button>
          </div>

        </section>

        {/* Modal slideshow */}
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[min(96vw,1100px)] p-0 bg-white dark:bg-black/95 text-gray-900 dark:text-white border border-gray-200 dark:border-orange-500/20">
                <DialogHeader className="border-b border-gray-200 dark:border-orange-500/20 px-5 py-4">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <DialogTitle className="text-base md:text-lg">
                            {title}
                            </DialogTitle>
                            {techStack?.length ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {techStack.map((t) => (
                                    <TechBadge key={t.label} label={t.label} icon={t.icon} size="sm" />
                                ))}
                            </div>
                            ) : null}
                        </div>

                    </div>
                </DialogHeader>


            <div className="flex h-[calc(95vh-100px)] min-h-0 flex-col px-4 py-4">

                {/* main image */}
                <div className="relative flex-1 min-h-0 rounded-2xl border border-gray-200 dark:border-orange-500/20 bg-gray-100 dark:bg-black/40 backdrop-blur flex items-center justify-center p-2">

                {images?.[currentImageIndex] ? (
                    <Image
                    src={images[currentImageIndex].src}
                    alt={images[currentImageIndex].alt ?? `${title} screenshot ${currentImageIndex + 1}`}
                    width={1600}
                    height={900}
                      className="h-full w-full object-contain"
                    />
                ) : null}

                {/* arrows */}
                {images.length > 1 ? (
                    <>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={prev}
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={next}
                        aria-label="Next image"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                    </>
                ) : null}
                </div>

                {/* caption */}
                {images?.[currentImageIndex]?.caption ? (
                <p className="mt-3 text-sm text-gray-600 dark:text-muted-foreground">
                    {images[currentImageIndex].caption}
                </p>
                ) : null}

                {/* thumbnails */}
                {images.length > 1 ? (
                <div className="mt-4">
                    <div className="grid grid-cols-4 gap-2">
                        {images.map((img, i) => (
                        <button
                            key={`${img.src}-${i}`}
                            type="button"
                            onClick={() => setCurrentImageIndex(i)}
                            className={[
                            "relative h-20 w-full overflow-hidden rounded-xl border transition-all",
                            i === currentImageIndex 
                                ? "border-orange-500 ring-2 ring-orange-500/50" 
                                : "border-gray-300 dark:border-orange-500/20 bg-gray-100 dark:bg-black/40 opacity-70 hover:opacity-100 hover:border-orange-500/40",
                            "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black",
                            ].join(" ")}
                            aria-label={`View image ${i + 1}`}
                        >
                            <Image
                            src={img.src}
                            alt={img.alt ?? `Thumbnail ${i + 1}`}
                            width={400}
                            height={240}
                            className="h-full w-full object-cover"
                            />
                        </button>
                        ))}
                    </div>
                </div>
                ) : null}
            </div>
            </DialogContent>
        </Dialog>
        </>
    )

}