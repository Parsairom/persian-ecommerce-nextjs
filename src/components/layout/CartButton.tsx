"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useUiStore } from "@/store/ui";

export function CartButton() {
  const lines = useCartStore((s) => s.lines);
  const setCartOpen = useUiStore((s) => s.setCartOpen);
  const count = lines.reduce((sum, l) => sum + l.qty, 0);

  return (
    <button
      onClick={() => setCartOpen(true)}
      className="relative flex size-10 items-center justify-center rounded-full hover:bg-background-secondary"
      aria-label="سبد خرید"
    >
      <ShoppingBag className="size-5" />
      {count > 0 && (
        <span className="absolute -left-0.5 -top-0.5 flex size-4.5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-navy">
          {count}
        </span>
      )}
    </button>
  );
}
