import {ProjectCategory} from "@/data/projects";

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  SWE: "Software Engineering",
  DS: "Data Science",
  ML: "Machine Learning",
  DE: "Data Engineering",
}

type Props = {
  active: ProjectCategory | "ALL";
  onChange: (category: ProjectCategory | "ALL") => void;
}

export default function ProjectCategoryFilter({ active, onChange }: Props) {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-3">
      <CategoryPill
        label="All"
        active={active === "ALL"}
        onClick={() => onChange("ALL")}
      />
      
      {Object.entries(CATEGORY_LABELS).map(([category, label]) => (
        <CategoryPill
          key={category}
          label={label}
          active={active === category}
          onClick={() => onChange(category as ProjectCategory)}
        />
      ))}
    </div>
  )
}

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-orange-500/20 text-orange-500"
          : "text-orange-500 hover:bg-orange-500/15",
      ].join(" ")}
    >
      {label}
    </button>
  );
}