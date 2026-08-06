"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MapPin, ShieldCheck, Truck, Wallet } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AddressPicker } from "@/components/checkout/AddressPicker";
import { PaymentMethodPicker } from "@/components/checkout/PaymentMethodPicker";
import { useCartStore } from "@/store/cart";
import { getCartDetails } from "@/lib/cart-helpers";
import { faDigits, formatToman } from "@/lib/utils";
import { mockAddresses } from "@/lib/mock/account";
import { siteConfig } from "@/lib/site-config";

const STEPS = [
  { key: "address", label: "آدرس", icon: MapPin },
  { key: "shipping", label: "روش ارسال", icon: Truck },
  { key: "payment", label: "پرداخت", icon: Wallet },
] as const;

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, couponCode, clear } = useCartStore();
  const { items, subtotal, discount, shipping, tax, total } = getCartDetails(lines, couponCode);

  const [addressId, setAddressId] = useState<string | null>(mockAddresses.find((a) => a.isDefault)?.id ?? mockAddresses[0]?.id ?? null);
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [gatewayId, setGatewayId] = useState<string | null>(siteConfig.paymentGateways.find((g) => g.enabled)?.id ?? null);
  const [processing, setProcessing] = useState(false);

  const canSubmit = items.length > 0 && addressId && gatewayId;

  const submit = () => {
    if (!canSubmit) return;
    setProcessing(true);
    setTimeout(() => {
      clear();
      router.push("/checkout/success");
    }, 1800);
  };

  if (items.length === 0 && !processing) {
    return (
      <Container className="flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="text-xl font-bold">سبد خرید شما خالی است</h1>
        <Button onClick={() => router.push("/products")}>مشاهده محصولات</Button>
      </Container>
    );
  }

  if (processing) {
    const gatewayName = siteConfig.paymentGateways.find((g) => g.id === gatewayId)?.name;
    return (
      <Container className="flex flex-col items-center gap-4 py-32 text-center">
        <Loader2 className="size-10 animate-spin text-gold" />
        <h1 className="text-lg font-bold">در حال انتقال به درگاه پرداخت {gatewayName}...</h1>
        <p className="text-sm text-foreground-muted">لطفا صبر کنید، این صفحه به‌زودی به‌روزرسانی می‌شود</p>
      </Container>
    );
  }

  return (
    <Container className="py-8 md:py-10">
      <h1 className="mb-6 text-xl font-bold md:text-2xl">تکمیل خرید</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <section>
            <div className="mb-3 flex items-center gap-2">
              {(() => {
                const Icon = STEPS[0].icon;
                return <Icon className="size-4.5 text-gold" />;
              })()}
              <h2 className="text-base font-bold">۱. انتخاب آدرس تحویل</h2>
            </div>
            <AddressPicker selectedId={addressId} onSelect={setAddressId} />
          </section>

          <section>
            <div className="mb-3 flex items-center gap-2">
              <Truck className="size-4.5 text-gold" />
              <h2 className="text-base font-bold">۲. روش ارسال</h2>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                onClick={() => setShippingMethod("standard")}
                className={`rounded-2xl border p-4 text-right ${shippingMethod === "standard" ? "border-gold bg-gold/5" : "border-border"}`}
              >
                <p className="text-sm font-bold">ارسال استاندارد</p>
                <p className="mt-1 text-xs text-foreground-muted">تحویل طی ۲ الی ۴ روز کاری</p>
              </button>
              <button
                onClick={() => setShippingMethod("express")}
                className={`rounded-2xl border p-4 text-right ${shippingMethod === "express" ? "border-gold bg-gold/5" : "border-border"}`}
              >
                <p className="text-sm font-bold">ارسال پیشتاز</p>
                <p className="mt-1 text-xs text-foreground-muted">تحویل طی ۲۴ ساعت (فقط کرمان)</p>
              </button>
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center gap-2">
              <Wallet className="size-4.5 text-gold" />
              <h2 className="text-base font-bold">۳. روش پرداخت</h2>
            </div>
            <PaymentMethodPicker selected={gatewayId} onSelect={setGatewayId} />
          </section>
        </div>

        <div className="h-fit space-y-4 rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-base font-bold">خلاصه سفارش</h2>
          <div className="max-h-52 space-y-2 overflow-y-auto border-b border-border pb-3 text-sm">
            {items.map(({ line, product, lineTotal }) => (
              <div key={product.id + (line.colorId ?? "")} className="flex justify-between text-foreground-muted">
                <span className="line-clamp-1">
                  {product.title} × {faDigits(line.qty)}
                </span>
                <span className="shrink-0">{faDigits(formatToman(lineTotal))}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm">
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
          <Button onClick={submit} disabled={!canSubmit} className="w-full" size="lg">
            پرداخت و ثبت سفارش
          </Button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-foreground-muted">
            <ShieldCheck className="size-3.5" />
            پرداخت امن با اتصال رمزنگاری‌شده
          </p>
        </div>
      </div>
    </Container>
  );
}
