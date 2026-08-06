import { Bell, Package, Percent, Ticket } from "lucide-react";

const NOTIFICATIONS = [
  { id: "n1", icon: Package, title: "سفارش شما ارسال شد", body: "سفارش MP-140310-0198 تحویل پست شد.", date: "۲ ساعت پیش" },
  { id: "n2", icon: Percent, title: "پیشنهاد شگفت‌انگیز جدید", body: "تخفیف ویژه روی هدفون‌های بی‌سیم فعال شد.", date: "دیروز" },
  { id: "n3", icon: Ticket, title: "پاسخ تیکت پشتیبانی", body: "کارشناسان به تیکت شما پاسخ دادند.", date: "۳ روز پیش" },
];

export default function NotificationsPage() {
  return (
    <div>
      <h1 className="mb-6 text-lg font-bold">اعلان‌ها</h1>
      <div className="space-y-3">
        {NOTIFICATIONS.map((n) => (
          <div key={n.id} className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
              <n.icon className="size-5" />
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-bold">{n.title}</p>
                <span className="text-xs text-foreground-muted">{n.date}</span>
              </div>
              <p className="mt-1 text-xs text-foreground-muted">{n.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-foreground-muted">
        <Bell className="size-3.5" />
        اعلان جدیدی وجود ندارد
      </div>
    </div>
  );
}
