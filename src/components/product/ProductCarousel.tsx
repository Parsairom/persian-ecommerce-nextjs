"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductCarousel({ products }: { products: Product[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ direction: "rtl", align: "start", dragFree: true });

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-3 md:gap-5">
          {products.map((p) => (
            <div key={p.id} className="min-w-[46%] sm:min-w-[32%] md:min-w-[24%] lg:min-w-[19%]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => emblaApi?.scrollNext()}
        aria-label="قبلی"
        className="absolute -right-3 top-1/3 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface shadow-md md:flex hover:bg-background-secondary"
      >
        <ChevronRight className="size-5" />
      </button>
      <button
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="بعدی"
        className="absolute -left-3 top-1/3 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface shadow-md md:flex hover:bg-background-secondary"
      >
        <ChevronLeft className="size-5" />
      </button>
    </div>
  );
}
