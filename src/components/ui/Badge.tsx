import { cn } from "@/lib/utils";

const variants = {
  gold: "bg-gold/15 text-gold border border-gold/30",
  navy: "bg-navy/10 text-navy border border-navy/20 dark:text-white/90 dark:bg-navy/40",
  red: "bg-red-500/10 text-red-500 border border-red-500/25",
  green: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/25",
  neutral: "bg-background-secondary text-foreground-muted border border-border",
};

export function Badge({
  variant = "neutral",
  className,
  children,
}: {
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}
