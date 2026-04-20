import { cn } from "@/lib/utils"

interface GhostCardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glowColor?: "primary" | "secondary" | "tertiary" | "none"
  as?: React.ElementType
}

export function GhostCard({
  children,
  className,
  hover = true,
  glowColor = "none",
  as: Tag = "div",
  ...rest
}: GhostCardProps) {
  return (
    <Tag
      {...rest}
      className={cn(
        "ghost-border rounded-xl bg-surface-container-low overflow-hidden transition-all duration-300 kinetic-shadow",
        hover && "hover:scale-[1.01]",
        hover && glowColor === "primary" && "hover:border-primary/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(173,198,255,0.08)]",
        hover && glowColor === "secondary" && "hover:border-secondary/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(221,183,255,0.08)]",
        hover && glowColor === "tertiary" && "hover:border-tertiary/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(255,183,134,0.08)]",
        hover && glowColor === "none" && "hover:border-outline-variant/25",
        className
      )}
    >
      {children}
    </Tag>
  )
}
