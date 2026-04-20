import { cn } from "@/lib/utils"

interface TechChipProps {
  label: string
  variant?: "default" | "primary" | "secondary" | "tertiary"
  className?: string
}

export function TechChip({ label, variant = "default", className }: TechChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full font-label text-[10px] tracking-wider uppercase transition-all duration-200",
        variant === "default" && "bg-surface-container-highest/60 text-on-surface-variant hover:bg-surface-container-highest",
        variant === "primary" && "bg-primary/10 border border-primary/25 text-primary hover:bg-primary/20",
        variant === "secondary" && "bg-secondary/10 border border-secondary/25 text-secondary hover:bg-secondary/20",
        variant === "tertiary" && "bg-tertiary/10 border border-tertiary/25 text-tertiary hover:bg-tertiary/20",
        className
      )}
    >
      {label}
    </span>
  )
}
