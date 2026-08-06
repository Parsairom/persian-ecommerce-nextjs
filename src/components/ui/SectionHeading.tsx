import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function SectionHeading({
  title,
  subtitle,
  href,
  hrefLabel = "مشاهده همه",
}: {
  title: string;
  subtitle?: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
      <div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-foreground-muted mt-1">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-foreground-muted hover:text-gold transition-colors shrink-0"
        >
          {hrefLabel}
          <ChevronLeft className="size-4" />
        </Link>
      )}
    </div>
  );
}
