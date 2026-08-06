"use client";

import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Ticket, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ProductRender } from "@/components/product/ProductRender";
import { useCartStore } from "@/store/cart";
import { getCartDetails, isValidCoupon } from "@/lib/cart-helpers";
import { faDigits, formatToman } from "@/lib/utils";

export default function CartPage() {
  const { lines, couponCode, setQty, removeItem, applyCoupon, clearCoupon } = useCartStore();
  const [code, setCode] = useState(couponCode ?? "");
  const { items, subtotal, discount, shipping, tax, total } = getCartDetails(lines, couponCode);

  const submitCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    if (isValidCoupon(code.trim().toUpperCase())) {
      applyCoupon(code.trim().toUpperCase());
      toast.success("کد تخفیف با موفقیت اعمال شد");
    } else {
      toast.error("کد تخفیف نامعتبر است");
    }
  };

  if (items.length === 0) {
    return (
      <Container className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <ShoppingBag className="size-16 text-foreground-muted opacity-30" />
        <h1 className="text-xl font-bold">سبد خرید شما خالی است</h1>
        <p className="text-sm text-foreground-muted">محصولات مورد نظر خود را به سبد خرید اضافه کنید</p>
        <LinkButton href="/products">مشاهده محصولات</LinkButton>
      </Container>
    );
  }

  return (
    <Container className="py-8 md:py-10">
      <h1 className="mb-6 text-xl font-bold md:text-2xl">سبد خرید</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.map(({ line, product, lineTotal }) => (
            <div key={product.id + (line.colorId ?? "")} className="flex gap-4 rounded-2xl border border-border bg-surface p-4">
              <Link href={`/products/${product.slug}`}>
                <ProductRender
                  icon={product.gallery[0]?.icon ?? "Smartphone"}
                  gradient={product.gallery[0]?.gradient ?? "linear-gradient(135deg,#0b1d3a,#1c2c52)"}
                  className="size-24 shrink-0 md:size-28"
                  iconClassName="size-11 md:size-12"
                />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <Link href={`/products/${product.slug}`} className="text-sm font-medium leading-6 hover:text-gold">
                    {product.title}
                  </Link>
                  <button onClick={() => removeItem(product.id, line.colorId)} className="shrink-0 text-foreground-muted hover:text-red-500">
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 rounded-full border border-border px-2 py-1">
                    <button onClick={() => setQty(product.id, line.qty - 1, line.colorId)} className="flex size-7 items-center justify-center">
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-5 text-center text-sm">{faDigits(line.qty)}</span>
                    <button onClick={() => setQty(product.id, line.qty + 1, line.colorId)} className="flex size-7 items-center justify-center">
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <span className="text-sm font-bold">{faDigits(formatToman(lineTotal))} تومان</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit space-y-4 rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-base font-bold">خلاصه سفارش</h2>
          <form onSubmit={submitCoupon} className="flex gap-2">
            <div className="relative flex-1">
              <Ticket className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-foreground-muted" />
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="کد تخفیف"
                className="h-10 w-full rounded-full border border-border bg-background-secondary pr-9 pl-3 text-sm outline-none focus:border-gold"
              />
            </div>
            <button type="submit" className="rounded-full border border-border px-4 text-sm hover:bg-background-secondary">
              اعمال
            </button>
          </form>
          {couponCode && (
            <div className="flex items-center justify-between rounded-lg bg-emerald-500/10 px-3 py-2 text-xs text-emerald-600">
              <span>کد «{couponCode}» فعال است</span>
              <button onClick={clearCoupon} className="underline">
                حذف
              </button>
            </div>
          )}

          <div className="space-y-2 border-t border-border pt-4 text-sm">
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
            <div className="flex justify-between text-foreground-muted">
              <span>مالیات بر ارزش افزوده</span>
              <span>{faDigits(formatToman(tax))} تومان</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
              <span>مبلغ قابل پرداخت</span>
              <span>{faDigits(formatToman(total))} تومان</span>
            </div>
          </div>

          <LinkButton href="/checkout" className="w-full" size="lg">
            ادامه فرآیند خرید
          </LinkButton>
        </div>
      </div>
    </Container>
  );
}
