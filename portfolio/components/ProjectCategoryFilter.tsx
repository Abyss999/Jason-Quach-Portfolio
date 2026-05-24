import {ProjectCategory} from "@/data/projects";

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  SWE: "Software Engineering",
  DS: "Data Science",
  ML: "Machine Learning",
  DE: "Data Engineering",
  WIP: "Work in Progress",
  Hackathon: "Hackathon",
}

type Props = {
  activeCategories: Set<ProjectCategory>;
  onChange: (category: ProjectCategory | "ALL") => void;
  resultCount: number;
  total: number;
}

export default function ProjectCategoryFilter({ activeCategories, onChange, resultCount, total }: Props) {
  const isAllActive = activeCategories.size === 0;
  const isFiltered = resultCount < total;

  return (
    <div className="mb-8 flex flex-col items-center gap-3">
      <div className="flex flex-wrap justify-center gap-3">
        <CategoryPill
          label="All"
          active={isAllActive}
          onClick={() => onChange("ALL")}
        />

        {Object.entries(CATEGORY_LABELS).map(([category, label]) => (
          <CategoryPill
            key={category}
            label={label}
            active={activeCategories.has(category as ProjectCategory)}
            onClick={() => onChange(category as ProjectCategory)}
          />
        ))}
      </div>

      <p className="text-xs text-gray-500">
        {isFiltered
          ? `${resultCount} of ${total} projects`
          : "Tip: click a tech badge on any card to filter by stack"}
      </p>
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
        "rounded-full px-4 py-2 text-sm font-medium transition-all",
        active
          ? "bg-orange-500 text-black shadow-lg shadow-orange-500/20"
          : "bg-orange-500/15 text-orange-500 hover:bg-orange-500/25",
      ].join(" ")}
    >
      {label}
    </button>
  );
}