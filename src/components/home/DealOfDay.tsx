import { Flame } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Countdown } from "@/components/ui/Countdown";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

export function DealOfDay({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  const endsAt = products[0].dealEndsAt ?? "2030-01-01T00:00:00.000Z";

  return (
    <section className="py-8 md:py-12">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-l from-navy via-navy to-navy/90 p-6 text-white md:p-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-gold/20 text-gold">
                <Flame className="size-5" />
              </span>
              <div>
                <h2 className="text-xl font-bold md:text-2xl">پیشنهادهای شگفت‌انگیز</h2>
                <p className="text-sm text-white/60">فقط تا پایان زمان زیر، با تخفیف ویژه</p>
              </div>
            </div>
            <Countdown target={endsAt} />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {products.slice(0, 5).map((p) => (
              <div key={p.id} className="rounded-2xl bg-background p-1 text-foreground">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
