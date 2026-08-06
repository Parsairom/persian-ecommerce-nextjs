"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist";
import { products } from "@/lib/mock/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { LinkButton } from "@/components/ui/Button";

export default function WishlistPage() {
  const productIds = useWishlistStore((s) => s.productIds);
  const items = products.filter((p) => productIds.includes(p.id));

  return (
    <div>
      <h1 className="mb-6 text-lg font-bold">علاقه‌مندی‌های من</h1>
      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center text-foreground-muted">
          <Heart className="size-10 opacity-30" />
          <p>لیست علاقه‌مندی‌های شما خالی است</p>
          <LinkButton href="/products" size="sm">
            مشاهده محصولات
          </LinkButton>
        </div>
      ) : (
        <ProductGrid products={items} />
      )}
    </div>
  );
}
