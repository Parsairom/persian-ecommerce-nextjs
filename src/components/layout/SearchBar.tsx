"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { products } from "@/lib/mock/products";
import { ProductRender } from "@/components/product/ProductRender";
import { PriceTag } from "@/components/ui/PriceTag";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

export function SearchBar({ onNavigate, autoFocus }: { onNavigate?: () => void; autoFocus?: boolean }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setOpen(false));

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.trim().toLowerCase();
    return products.filter((p) => p.title.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/products?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
    onNavigate?.();
  };

  return (
    <div ref={ref} className="relative w-full">
      <form onSubmit={submit} className="relative">
        <Search className="pointer-events-none absolute right-4 top-1/2 size-4.5 -translate-y-1/2 text-foreground-muted" />
        <input
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="جستجوی محصول، دسته‌بندی یا برند..."
          className="h-11 w-full rounded-full border border-border bg-background-secondary pr-11 pl-10 text-sm outline-none transition-colors focus:border-gold"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </form>

      {open && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
          {results.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              className="flex items-center gap-3 border-b border-border p-3 last:border-0 hover:bg-background-secondary"
            >
              <ProductRender
                icon={p.gallery[0]?.icon ?? "Smartphone"}
                gradient={p.gallery[0]?.gradient ?? "linear-gradient(135deg,#0b1d3a,#1c2c52)"}
                className="size-12 shrink-0"
                iconClassName="size-6"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{p.title}</p>
                <PriceTag price={p.price} compareAtPrice={p.compareAtPrice} size="sm" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
