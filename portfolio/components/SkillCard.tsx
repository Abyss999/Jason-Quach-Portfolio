import TechBadge from "./TechBadge";

type SkillCardProps = {
    title: string;
    skills: {label: string; icon?: React.ReactNode}[];
}

export default function SkillCard({ title, skills }: SkillCardProps) {
    return (
        <div 
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>
            <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                    <TechBadge
                        key={skill.label}
                        label={skill.label}
                        icon={skill.icon}
                    />
                ))}
            </div>
        </div>
    )
}