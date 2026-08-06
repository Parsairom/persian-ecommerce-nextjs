"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Heart, Minus, Plus, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import type { Product } from "@/lib/types";
import { PriceTag } from "@/components/ui/PriceTag";
import { Rating } from "@/components/ui/Rating";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { getBrandById } from "@/lib/mock/brands";
import { faDigits, cn } from "@/lib/utils";

export function ProductInfo({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [colorId, setColorId] = useState(product.colors?.[0]?.id);
  const brand = getBrandById(product.brandId);
  const addItem = useCartStore((s) => s.addItem);
  const { has, toggle } = useWishlistStore();
  const wished = has(product.id);
  const router = useRouter();

  const addToCart = () => {
    addItem(product.id, qty, colorId);
    toast.success("به سبد خرید افزوده شد");
  };

  const buyNow = () => {
    addItem(product.id, qty, colorId);
    router.push("/checkout");
  };

  return (
    <div>
      {brand && <Badge variant="navy">{brand.name}</Badge>}
      <h1 className="mt-3 text-xl font-bold leading-8 md:text-2xl">{product.title}</h1>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Rating value={product.rating} count={product.reviewCount} size="md" />
        <span className="text-xs text-foreground-muted">|</span>
        <span className="text-xs text-foreground-muted">{faDigits(product.soldCount)} فروش</span>
      </div>

      <div className="mt-5 rounded-2xl border border-border bg-background-secondary/50 p-4">
        <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />
        <p className="mt-2 text-xs text-foreground-muted">{product.shortDescription}</p>
      </div>

      {product.colors && (
        <div className="mt-5">
          <p className="mb-2 text-sm font-medium">رنگ‌بندی</p>
          <div className="flex items-center gap-2">
            {product.colors.map((c) => (
              <button
                key={c.id}
                onClick={() => setColorId(c.id)}
                title={c.name}
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border-2 transition-transform",
                  colorId === c.id ? "border-gold scale-110" : "border-transparent"
                )}
              >
                <span className="size-6 rounded-full border border-black/10" style={{ background: c.hex }} />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 flex items-center gap-4">
        <div className="flex items-center gap-3 rounded-full border border-border px-2 py-1.5">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex size-8 items-center justify-center">
            <Minus className="size-4" />
          </button>
          <span className="w-6 text-center text-sm font-medium">{faDigits(qty)}</span>
          <button onClick={() => setQty((q) => Math.min(product.stock || 1, q + 1))} className="flex size-8 items-center justify-center">
            <Plus className="size-4" />
          </button>
        </div>
        <span className={cn("text-sm", product.stock > 5 ? "text-emerald-600" : product.stock > 0 ? "text-amber-600" : "text-red-500")}>
          {product.stock === 0 ? "ناموجود" : product.stock <= 5 ? `تنها ${faDigits(product.stock)} عدد در انبار` : "موجود در انبار"}
        </span>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button onClick={addToCart} disabled={product.stock === 0} className="flex-1" size="lg">
          <ShoppingBag className="size-4.5" />
          افزودن به سبد خرید
        </Button>
        <Button onClick={() => toggle(product.id)} variant="outline" size="lg" className="px-4">
          <Heart className="size-5" fill={wished ? "#e0455f" : "none"} stroke={wished ? "#e0455f" : "currentColor"} />
        </Button>
      </div>
      <button onClick={buyNow} disabled={product.stock === 0} className="mt-3 w-full text-center text-sm font-medium text-gold hover:underline disabled:opacity-40">
        خرید سریع (بدون بازگشت به فروشگاه)
      </button>

      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-5">
        <div className="flex items-center gap-2 text-sm text-foreground-muted">
          <ShieldCheck className="size-4.5 shrink-0 text-gold" />
          {product.warranty}
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground-muted">
          <Truck className="size-4.5 shrink-0 text-gold" />
          ارسال سریع از کرمان
        </div>
      </div>
    </div>
  );
}
