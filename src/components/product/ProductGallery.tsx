"use client";

import { useRef, useState } from "react";
import { ProductRender } from "@/components/product/ProductRender";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function ProductGallery({ gallery }: { gallery: { icon: string; gradient: string }[] }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const current = gallery[active] ?? gallery[0];

  return (
    <div>
      <div
        ref={ref}
        onMouseMove={(e) => {
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          setZoom({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
        }}
        onMouseLeave={() => setZoom(null)}
        className="relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-3xl"
      >
        <ProductRender icon={current.icon} gradient={current.gradient} className="size-full" iconClassName="size-40 md:size-56" />
        {zoom && (
          <div
            className="pointer-events-none absolute inset-0 scale-[2.2]"
            style={{
              background: current.gradient,
              transformOrigin: `${zoom.x}% ${zoom.y}%`,
            }}
          >
            <div className="flex size-full items-center justify-center">
              <Icon name={current.icon} className="size-56 text-white/90" strokeWidth={1.1} />
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar">
        {gallery.map((g, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "relative size-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors md:size-20",
              active === i ? "border-gold" : "border-transparent"
            )}
          >
            <ProductRender icon={g.icon} gradient={g.gradient} className="size-full" iconClassName="size-7 md:size-8" />
          </button>
        ))}
      </div>
    </div>
  );
}
