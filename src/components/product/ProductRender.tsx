import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function ProductRender({
  icon,
  gradient,
  className,
  iconClassName,
}: {
  icon: string;
  gradient: string;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div
      className={cn("relative flex items-center justify-center overflow-hidden rounded-2xl", className)}
      style={{ background: gradient }}
    >
      <div className="absolute -inset-6 opacity-30 blur-2xl animate-float" style={{ background: gradient }} />
      <Icon name={icon} className={cn("relative z-10 text-white/90 drop-shadow-lg", iconClassName)} strokeWidth={1.25} />
    </div>
  );
}
