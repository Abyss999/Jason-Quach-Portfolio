import Image from "next/image";
import {Mail, Github, Linkedin, FileText} from "lucide-react"; 

const socials = [
    {
        label: "Github",
        icon: <Github className="h-6 w-6"/>,
        href: "https://github.com/Abyss999",
    },
    {
        label: "LinkedIn",
        icon: <Linkedin className="h-6 w-6"/>,
        href: "https://www.linkedin.com/in/jason-tran-quach/",
    },
    {
        label: "Email",
        icon: <Mail className="h-6 w-6"/>,
        href: "mailto:jtquach@cougarnet.uh.edu",
    },
    {
        label: "Resume",
        icon: <FileText className="h-6 w-6"/>,
        href: "/Jason_Quach_Resume.pdf",
    },
];

export default function AboutMe() {
    return (
        <section id = "about" className = "min-h-[calc(100vh-4rem)] py-20 scroll-mt-16">
            <h2 className = "mb-10 text-center text-5xl font-bold text-orange-500">
            About Me
            </h2>

            {/* Profile Picture  */}
            <div className = "grid gap-10 md:grid-cols-2 md:items-center">
                <div className="flex justify-center">
                    <div className = "relative aspect-square w-full max-w-xs sm:max-w-sm md:max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                        <Image
                            src="/pfp.jpg"
                            alt="Profile Picture"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            

                {/* Texts & Socials*/}

                <div>
                    <p className="text-lg leading-relaxed text-white/80">
                        I'm a Computer Science student at the University of Houston with a passion for full-stack web development.
                        I enjoy creating clean, scalable applications that provide excellent user experiences. 
                        When I'm not coding, I love exploring new technologies, hiking, and playing video games.
                    </p>

                    <p className="mt-4 text-lg leading-relaxed text-white/80">
                        I’ve built projects using React, Next.js, Flask, PostgreSQL, and
                        Docker, and I’m currently looking to keep growing through real-world
                        team projects and internships.
                    </p>  

                    {/* Links */}
                    <div className = "mt-8 flex flex-wrap gap-3">
                        {socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target={social.href.startsWith("http") ? "_blank" : undefined}
                                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="inline-flex items-center gap-2 rounded-full border border-orange-500/40
                                    px-4 py-2 text-orange-500 transition-colors
                                    hover:bg-orange-500/15 hover:text-orange-400"
                            >
                                {social.icon}
                                <span className="text-sm font-medium">{social.label}</span>
                            </a>
                        ))}

                    </div>
                </div>
            </div>

        </section>
    )
}

