"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductRender } from "@/components/product/ProductRender";
import { PriceTag } from "@/components/ui/PriceTag";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { useWishlistStore } from "@/store/wishlist";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { has, toggle } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);
  const wished = has(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn(
        "group relative rounded-2xl border border-border bg-surface p-3 transition-shadow hover:shadow-xl hover:shadow-black/5",
        className
      )}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          toggle(product.id);
        }}
        className="absolute left-4 top-4 z-20 flex size-8 items-center justify-center rounded-full glass transition-transform hover:scale-110"
        aria-label="افزودن به علاقه‌مندی‌ها"
      >
        <Heart className="size-4" fill={wished ? "#e0455f" : "none"} stroke={wished ? "#e0455f" : "currentColor"} />
      </button>

      {(product.isNew || product.isDeal) && (
        <div className="absolute right-4 top-4 z-20 flex flex-col gap-1.5">
          {product.isNew && <Badge variant="navy">جدید</Badge>}
          {product.isDeal && <Badge variant="red">پیشنهاد شگفت‌انگیز</Badge>}
        </div>
      )}

      <Link href={`/products/${product.slug}`} className="block">
        <ProductRender
          icon={product.gallery[0]?.icon ?? "Smartphone"}
          gradient={product.gallery[0]?.gradient ?? "linear-gradient(135deg,#0b1d3a,#1c2c52)"}
          className="aspect-square w-full mb-4 transition-transform duration-500 group-hover:scale-[1.03]"
          iconClassName="size-16 md:size-20"
        />
        <h3 className="line-clamp-2 min-h-[2.6em] text-sm font-medium leading-6">{product.title}</h3>
        <div className="mt-2">
          <Rating value={product.rating} count={product.reviewCount} />
        </div>
        <div className="mt-2">
          <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
        </div>
      </Link>

      <button
        onClick={() => {
          addItem(product.id, 1);
          toast.success("به سبد خرید افزوده شد");
        }}
        disabled={product.stock === 0}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-background-secondary py-2.5 text-sm font-medium transition-colors hover:bg-navy hover:text-white disabled:opacity-40"
      >
        <ShoppingBag className="size-4" />
        {product.stock === 0 ? "ناموجود" : "افزودن به سبد"}
      </button>
    </motion.div>
  );
}
