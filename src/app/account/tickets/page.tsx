"use client";

import { useState } from "react";
import { MessageSquare, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const TICKETS = [
  { id: "t1", subject: "سوال درباره گارانتی گوشی", status: "پاسخ داده شده", date: "۱۴۰۳/۰۳/۱۲" },
  { id: "t2", subject: "مشکل در ثبت سفارش", status: "در حال بررسی", date: "۱۴۰۳/۰۴/۰۲" },
];

export default function TicketsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-bold">تیکت‌های پشتیبانی</h1>
        <Button size="sm" onClick={() => setShowForm((v) => !v)}>
          <Plus className="size-4" />
          تیکت جدید
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowForm(false);
            toast.success("تیکت شما با موفقیت ثبت شد");
          }}
          className="mb-6 space-y-3 rounded-2xl border border-border bg-surface p-4"
        >
          <input required placeholder="موضوع تیکت" className="h-10 w-full rounded-lg border border-border bg-background-secondary px-3 text-sm outline-none focus:border-gold" />
          <textarea required placeholder="توضیحات" className="h-28 w-full rounded-lg border border-border bg-background-secondary px-3 py-2 text-sm outline-none focus:border-gold" />
          <Button type="submit" size="sm">ارسال تیکت</Button>
        </form>
      )}

      <div className="space-y-3">
        {TICKETS.map((t) => (
          <div key={t.id} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
            <span className="flex size-10 items-center justify-center rounded-full bg-background-secondary text-navy dark:text-white">
              <MessageSquare className="size-5" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium">{t.subject}</p>
              <p className="text-xs text-foreground-muted">{t.date}</p>
            </div>
            <Badge variant={t.status === "پاسخ داده شده" ? "green" : "gold"}>{t.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
