import { notFound } from "next/navigation";
import { CheckCircle2, PackageCheck, Truck, Warehouse } from "lucide-react";
import { mockOrders } from "@/lib/mock/account";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { InvoiceButton } from "@/components/account/InvoiceButton";
import { ProductRender } from "@/components/product/ProductRender";
import { faDigits, formatToman, cn } from "@/lib/utils";

const STEPS = [
  { key: "processing", label: "ثبت سفارش", icon: PackageCheck },
  { key: "shipped", label: "ارسال شده", icon: Truck },
  { key: "delivered", label: "تحویل به مشتری", icon: Warehouse },
];

export default async function OrderDetailPage(props: PageProps<"/account/orders/[id]">) {
  const { id } = await props.params;
  const order = mockOrders.find((o) => o.id === id);
  if (!order) notFound();

  const stepIndex = order.status === "delivered" ? 2 : order.status === "shipped" ? 1 : order.status === "processing" ? 0 : -1;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold">سفارش {order.number}</h1>
          <p className="text-xs text-foreground-muted">تاریخ ثبت: {order.date}</p>
        </div>
        <div className="flex items-center gap-3">
          <OrderStatusBadge status={order.status} />
          <InvoiceButton />
        </div>
      </div>

      {stepIndex >= 0 && (
        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s.key} className="flex flex-1 flex-col items-center gap-2 text-center">
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full border-2",
                    i <= stepIndex ? "border-gold bg-gold/10 text-gold" : "border-border text-foreground-muted"
                  )}
                >
                  {i < stepIndex ? <CheckCircle2 className="size-5" /> : <s.icon className="size-5" />}
                </span>
                <span className="text-xs">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="relative mt-[-38px] h-0.5 bg-border" style={{ marginInline: "5%" }}>
            <div className="h-full bg-gold transition-all" style={{ width: `${(stepIndex / (STEPS.length - 1)) * 100}%` }} />
          </div>
          {order.trackingCode && (
            <p className="mt-6 text-center text-sm text-foreground-muted">
              کد پیگیری مرسوله: <span className="font-mono font-bold text-foreground">{order.trackingCode}</span>
            </p>
          )}
        </div>
      )}

      <div className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="mb-4 text-sm font-bold">اقلام سفارش</h2>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.productId} className="flex items-center gap-3">
              <ProductRender icon={item.icon} gradient={item.gradient} className="size-14 shrink-0" iconClassName="size-6" />
              <div className="flex-1">
                <p className="text-sm">{item.title}</p>
                <p className="text-xs text-foreground-muted">تعداد: {faDigits(item.qty)}</p>
              </div>
              <span className="text-sm font-bold">{faDigits(formatToman(item.price * item.qty))} تومان</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-bold">
          <span>مبلغ کل</span>
          <span>{faDigits(formatToman(order.total))} تومان</span>
        </div>
      </div>
    </div>
  );
}
