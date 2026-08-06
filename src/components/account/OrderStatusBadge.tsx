import { Badge } from "@/components/ui/Badge";
import type { Order } from "@/lib/types";

const STATUS_MAP: Record<Order["status"], { label: string; variant: "gold" | "navy" | "red" | "green" | "neutral" }> = {
  pending: { label: "در انتظار پرداخت", variant: "neutral" },
  processing: { label: "در حال پردازش", variant: "gold" },
  shipped: { label: "ارسال شده", variant: "navy" },
  delivered: { label: "تحویل شده", variant: "green" },
  cancelled: { label: "لغو شده", variant: "red" },
};

export function OrderStatusBadge({ status }: { status: Order["status"] }) {
  const s = STATUS_MAP[status];
  return <Badge variant={s.variant}>{s.label}</Badge>;
}
