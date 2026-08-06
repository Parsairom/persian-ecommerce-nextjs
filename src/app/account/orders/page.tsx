import Link from "next/link";
import { Package } from "lucide-react";
import { mockOrders } from "@/lib/mock/account";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { faDigits, formatToman } from "@/lib/utils";

export default function OrdersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">سفارش‌های من</h1>
      {mockOrders.map((o) => (
        <Link
          key={o.id}
          href={`/account/orders/${o.id}`}
          className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-gold/40 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-background-secondary text-navy dark:text-white">
              <Package className="size-5" />
            </span>
            <div>
              <p className="text-sm font-bold">سفارش {o.number}</p>
              <p className="text-xs text-foreground-muted">{o.date} - {faDigits(o.items.length)} کالا</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold">{faDigits(formatToman(o.total))} تومان</span>
            <OrderStatusBadge status={o.status} />
          </div>
        </Link>
      ))}
    </div>
  );
}
