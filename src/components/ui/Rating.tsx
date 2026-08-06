import { Star } from "lucide-react";
import { faDigits } from "@/lib/utils";

export function Rating({ value, count, size = "sm" }: { value: number; count?: number; size?: "sm" | "md" }) {
  const iconSize = size === "sm" ? "size-3.5" : "size-4";
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={iconSize}
            fill={i < Math.round(value) ? "var(--gold)" : "none"}
            stroke={i < Math.round(value) ? "var(--gold)" : "var(--foreground-muted)"}
          />
        ))}
      </div>
      <span className="text-xs text-foreground-muted">
        {faDigits(value.toFixed(1))}
        {count !== undefined && ` (${faDigits(count)})`}
      </span>
    </div>
  );
}
