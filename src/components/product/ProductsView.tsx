"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { products } from "@/lib/mock/products";
import { getCategoryById } from "@/lib/mock/categories";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductFilters, PRICE_MIN, PRICE_MAX, type Filters } from "@/components/product/ProductFilters";
import { Container } from "@/components/ui/Container";
import { faDigits } from "@/lib/utils";

type SortKey = "relevant" | "cheapest" | "expensive" | "newest" | "bestseller" | "rating";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "relevant", label: "مرتبط‌ترین" },
  { key: "bestseller", label: "پرفروش‌ترین" },
  { key: "newest", label: "جدیدترین" },
  { key: "cheapest", label: "ارزان‌ترین" },
  { key: "expensive", label: "گران‌ترین" },
  { key: "rating", label: "بالاترین امتیاز" },
];

export function ProductsView() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialBrand = searchParams.get("brand");
  const query = searchParams.get("q") ?? "";
  const dealOnly = searchParams.get("deal") === "true";
  const featuredOnly = searchParams.get("featured") === "true";
  const initialSort = (searchParams.get("sort") as SortKey) ?? "relevant";

  const [filters, setFilters] = useState<Filters>({
    category: initialCategory,
    brand: initialBrand,
    minPrice: PRICE_MIN,
    maxPrice: PRICE_MAX,
    inStockOnly: false,
  });
  const [sort, setSort] = useState<SortKey>(["bestseller", "newest"].includes(initialSort) ? initialSort : "relevant");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (filters.category && p.categoryId !== filters.category) return false;
      if (filters.brand && p.brandId !== filters.brand) return false;
      if (p.price > filters.maxPrice) return false;
      if (filters.inStockOnly && p.stock === 0) return false;
      if (dealOnly && !p.isDeal) return false;
      if (featuredOnly && !p.isFeatured) return false;
      if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });

    switch (sort) {
      case "cheapest":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "expensive":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      case "bestseller":
        list = [...list].sort((a, b) => b.soldCount - a.soldCount);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [filters, sort, query, dealOnly, featuredOnly]);

  const categoryTitle = filters.category ? getCategoryById(filters.category)?.title : null;

  return (
    <Container className="py-8 md:py-10">
      <div className="mb-6">
        <h1 className="text-xl font-bold md:text-2xl">
          {query ? `نتایج جستجو برای «${query}»` : categoryTitle ? categoryTitle : "همه محصولات"}
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">{faDigits(filtered.length)} محصول یافت شد</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <ProductFilters filters={filters} onChange={(next) => setFilters((f) => ({ ...f, ...next }))} />
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between gap-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm lg:hidden"
            >
              <SlidersHorizontal className="size-4" />
              فیلترها
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="mr-auto h-10 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-gold lg:mr-0"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <ProductGrid products={filtered} />
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative mr-0 mt-auto max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-background p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold">فیلترها</h2>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X className="size-6" />
              </button>
            </div>
            <ProductFilters filters={filters} onChange={(next) => setFilters((f) => ({ ...f, ...next }))} />
          </div>
        </div>
      )}
    </Container>
  );
}
