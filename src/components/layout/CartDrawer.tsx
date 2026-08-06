"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useUiStore } from "@/store/ui";
import { getCartDetails } from "@/lib/cart-helpers";
import { ProductRender } from "@/components/product/ProductRender";
import { LinkButton } from "@/components/ui/Button";
import { faDigits, formatToman } from "@/lib/utils";

export function CartDrawer() {
  const cartOpen = useUiStore((s) => s.cartOpen);
  const setCartOpen = useUiStore((s) => s.setCartOpen);
  const { lines, couponCode, setQty, removeItem } = useCartStore();
  const { items, subtotal, discount, shipping, total } = getCartDetails(lines, couponCode);

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="absolute left-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border p-4">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <ShoppingBag className="size-5" />
                سبد خرید ({faDigits(items.length)})
              </h2>
              <button onClick={() => setCartOpen(false)} aria-label="بستن">
                <X className="size-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-foreground-muted">
                  <ShoppingBag className="size-12 opacity-30" />
                  <p>سبد خرید شما خالی است</p>
                  <LinkButton href="/products" size="sm" onClick={() => setCartOpen(false)}>
                    مشاهده محصولات
                  </LinkButton>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map(({ line, product, lineTotal }) => (
                    <div key={product.id + (line.colorId ?? "")} className="flex gap-3">
                      <Link href={`/products/${product.slug}`} onClick={() => setCartOpen(false)}>
                        <ProductRender
                          icon={product.gallery[0]?.icon ?? "Smartphone"}
                          gradient={product.gallery[0]?.gradient ?? "linear-gradient(135deg,#0b1d3a,#1c2c52)"}
                          className="size-20 shrink-0"
                          iconClassName="size-9"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col justify-between">
                        <p className="line-clamp-2 text-sm">{product.title}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-border px-1">
                            <button
                              onClick={() => setQty(product.id, line.qty - 1, line.colorId)}
                              className="flex size-7 items-center justify-center"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="w-5 text-center text-sm">{faDigits(line.qty)}</span>
                            <button
                              onClick={() => setQty(product.id, line.qty + 1, line.colorId)}
                              className="flex size-7 items-center justify-center"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-bold">{faDigits(formatToman(lineTotal))} تومان</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(product.id, line.colorId)}
                        className="self-start text-foreground-muted hover:text-red-500"
                        aria-label="حذف"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border p-4">
                <div className="mb-3 space-y-1.5 text-sm">
                  <div className="flex justify-between text-foreground-muted">
                    <span>جمع کل</span>
                    <span>{faDigits(formatToman(subtotal))} تومان</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>تخفیف</span>
                      <span>-{faDigits(formatToman(discount))} تومان</span>
                    </div>
                  )}
                  <div className="flex justify-between text-foreground-muted">
                    <span>هزینه ارسال</span>
                    <span>{shipping === 0 ? "رایگان" : `${faDigits(formatToman(shipping))} تومان`}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
                    <span>مبلغ قابل پرداخت</span>
                    <span>{faDigits(formatToman(total))} تومان</span>
                  </div>
                </div>
                <LinkButton href="/checkout" onClick={() => setCartOpen(false)} className="w-full" size="lg">
                  ادامه فرآیند خرید
                </LinkButton>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
