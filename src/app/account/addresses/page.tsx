"use client";

import { useState } from "react";
import { MapPin, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { mockAddresses } from "@/lib/mock/account";
import type { Address } from "@/lib/types";
import { Button } from "@/components/ui/Button";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-bold">آدرس‌های من</h1>
        <Button size="sm" onClick={() => setShowForm(true)}>
          <Plus className="size-4" />
          افزودن آدرس
        </Button>
      </div>

      <div className="space-y-3">
        {addresses.map((a) => (
          <div key={a.id} className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
            <MapPin className="mt-0.5 size-4.5 shrink-0 text-gold" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{a.title}</span>
                {a.isDefault && <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] text-gold">پیش‌فرض</span>}
              </div>
              <p className="mt-1 text-xs text-foreground-muted">
                {a.province}، {a.city}، {a.full}
              </p>
              <p className="mt-1 text-xs text-foreground-muted">
                {a.receiver} - {a.phone}
              </p>
            </div>
            <button
              onClick={() => {
                setAddresses((prev) => prev.filter((x) => x.id !== a.id));
                toast.success("آدرس حذف شد");
              }}
              className="text-foreground-muted hover:text-red-500"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>

      {showForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowForm(false);
            toast.success("آدرس جدید اضافه شد");
          }}
          className="mt-4 grid grid-cols-1 gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-2"
        >
          <input required placeholder="عنوان آدرس (مثل منزل)" className="h-10 rounded-lg border border-border bg-background-secondary px-3 text-sm outline-none focus:border-gold sm:col-span-2" />
          <input required placeholder="نام گیرنده" className="h-10 rounded-lg border border-border bg-background-secondary px-3 text-sm outline-none focus:border-gold" />
          <input required placeholder="شماره موبایل" className="h-10 rounded-lg border border-border bg-background-secondary px-3 text-sm outline-none focus:border-gold" />
          <input required placeholder="استان" className="h-10 rounded-lg border border-border bg-background-secondary px-3 text-sm outline-none focus:border-gold" />
          <input required placeholder="شهر" className="h-10 rounded-lg border border-border bg-background-secondary px-3 text-sm outline-none focus:border-gold" />
          <textarea required placeholder="آدرس کامل" className="h-20 rounded-lg border border-border bg-background-secondary px-3 py-2 text-sm outline-none focus:border-gold sm:col-span-2" />
          <div className="flex gap-2 sm:col-span-2">
            <Button type="submit" size="sm">ذخیره آدرس</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setShowForm(false)}>
              انصراف
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
