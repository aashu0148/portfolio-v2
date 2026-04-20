import { cn } from "@/lib/utils"

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-label text-[10px] tracking-[0.25em] uppercase text-primary",
        className
      )}
    >
      <span className="h-px w-6 bg-primary/50" />
      {children}
    </span>
  )
}
