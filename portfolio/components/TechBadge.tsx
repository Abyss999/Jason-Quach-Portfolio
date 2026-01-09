import { cn } from "@/lib/utils";

type TechBadgeProps = {
  label: string;
  className?: string;
  size?: "sm" | "md";
  icon?: React.ReactNode;
};

export default function TechBadge({
  label,
  className,
  size = "md",
  icon,
}: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border font-medium transition-colors",
        // DEFAULT (orange) — overridden if className provides new colors
        "border-orange-500/40 text-orange-500 hover:bg-orange-500/15 hover:text-orange-400",
        size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-4 py-2 text-sm",
        className
      )}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{label}</span>
    </span>
  );
}