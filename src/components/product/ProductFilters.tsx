"use client";

import { Icon } from "@/components/ui/Icon";
import { categories } from "@/lib/mock/categories";
import { brands } from "@/lib/mock/brands";
import { cn, faDigits, formatToman } from "@/lib/utils";

export interface Filters {
  category: string | null;
  brand: string | null;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
}

export const PRICE_MIN = 0;
export const PRICE_MAX = 100_000_000;

export function ProductFilters({
  filters,
  onChange,
  className,
}: {
  filters: Filters;
  onChange: (next: Partial<Filters>) => void;
  className?: string;
}) {
  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h3 className="mb-3 text-sm font-bold">دسته‌بندی</h3>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onChange({ category: null })}
            className={cn(
              "flex items-center gap-2 rounded-lg px-2.5 py-2 text-right text-sm transition-colors",
              !filters.category ? "bg-navy text-white" : "hover:bg-background-secondary"
            )}
          >
            همه دسته‌ها
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => onChange({ category: filters.category === c.id ? null : c.id })}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2.5 py-2 text-right text-sm transition-colors",
                filters.category === c.id ? "bg-navy text-white" : "hover:bg-background-secondary"
              )}
            >
              <Icon name={c.icon} className="size-4 shrink-0" />
              {c.title}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-5">
        <h3 className="mb-3 text-sm font-bold">برند</h3>
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => (
            <button
              key={b.id}
              onClick={() => onChange({ brand: filters.brand === b.id ? null : b.id })}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs transition-colors",
                filters.brand === b.id ? "border-gold bg-gold/10 text-gold" : "border-border hover:border-gold/50"
              )}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-5">
        <h3 className="mb-3 text-sm font-bold">محدوده قیمت (تومان)</h3>
        <div className="flex flex-col gap-3">
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={500_000}
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
            className="w-full accent-[var(--gold)]"
          />
          <div className="flex justify-between text-xs text-foreground-muted">
            <span>{faDigits(formatToman(PRICE_MIN))}</span>
            <span className="font-medium text-gold">تا {faDigits(formatToman(filters.maxPrice))}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-5">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ inStockOnly: e.target.checked })}
            className="size-4 accent-[var(--gold)]"
          />
          فقط کالاهای موجود
        </label>
      </div>

      <button
        onClick={() => onChange({ category: null, brand: null, minPrice: PRICE_MIN, maxPrice: PRICE_MAX, inStockOnly: false })}
        className="w-full rounded-full border border-border py-2.5 text-sm hover:bg-background-secondary"
      >
        حذف همه فیلترها
      </button>
    </div>
  );
}
