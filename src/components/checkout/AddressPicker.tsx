"use client";

import { useState } from "react";
import { Plus, MapPin } from "lucide-react";
import { mockAddresses } from "@/lib/mock/account";
import { cn } from "@/lib/utils";

export function AddressPicker({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-3">
      {mockAddresses.map((a) => (
        <button
          key={a.id}
          onClick={() => onSelect(a.id)}
          className={cn(
            "flex w-full items-start gap-3 rounded-2xl border p-4 text-right transition-colors",
            selectedId === a.id ? "border-gold bg-gold/5" : "border-border hover:border-gold/40"
          )}
        >
          <MapPin className="mt-0.5 size-4.5 shrink-0 text-gold" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">{a.title}</span>
              {a.isDefault && <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] text-gold">پیش‌فرض</span>}
            </div>
            <p className="mt-1 text-xs text-foreground-muted">
              {a.province}، {a.city}، {a.full}
            </p>
            <p className="mt-1 text-xs text-foreground-muted">{a.receiver} - {a.phone}</p>
          </div>
        </button>
      ))}

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-3 text-sm text-foreground-muted hover:border-gold hover:text-gold"
        >
          <Plus className="size-4" />
          افزودن آدرس جدید
        </button>
      ) : (
        <div className="grid grid-cols-1 gap-3 rounded-2xl border border-border p-4 sm:grid-cols-2">
          <input placeholder="نام گیرنده" className="h-10 rounded-lg border border-border bg-background-secondary px-3 text-sm outline-none focus:border-gold sm:col-span-2" />
          <input placeholder="شماره موبایل" className="h-10 rounded-lg border border-border bg-background-secondary px-3 text-sm outline-none focus:border-gold" />
          <input placeholder="کد پستی" className="h-10 rounded-lg border border-border bg-background-secondary px-3 text-sm outline-none focus:border-gold" />
          <input placeholder="استان" className="h-10 rounded-lg border border-border bg-background-secondary px-3 text-sm outline-none focus:border-gold" />
          <input placeholder="شهر" className="h-10 rounded-lg border border-border bg-background-secondary px-3 text-sm outline-none focus:border-gold" />
          <textarea placeholder="آدرس کامل" className="h-20 rounded-lg border border-border bg-background-secondary px-3 py-2 text-sm outline-none focus:border-gold sm:col-span-2" />
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="rounded-full bg-navy py-2.5 text-sm text-white sm:col-span-2"
          >
            ذخیره آدرس
          </button>
        </div>
      )}
    </div>
  );
}
