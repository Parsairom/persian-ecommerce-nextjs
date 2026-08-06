"use client";

import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/auth";

export default function AccountProfilePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 md:p-8">
      <h1 className="mb-6 text-lg font-bold">پروفایل من</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("اطلاعات با موفقیت به‌روزرسانی شد");
        }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <div>
          <label className="mb-1.5 block text-xs text-foreground-muted">نام و نام خانوادگی</label>
          <input
            defaultValue={user?.name ?? ""}
            placeholder="نام و نام خانوادگی"
            className="h-11 w-full rounded-xl border border-border bg-background-secondary px-3 text-sm outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-foreground-muted">شماره موبایل</label>
          <input
            defaultValue={user?.phone ?? ""}
            placeholder="شماره موبایل"
            dir="ltr"
            className="h-11 w-full rounded-xl border border-border bg-background-secondary px-3 text-sm outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-foreground-muted">ایمیل</label>
          <input
            type="email"
            placeholder="ایمیل"
            dir="ltr"
            className="h-11 w-full rounded-xl border border-border bg-background-secondary px-3 text-sm outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-foreground-muted">کد ملی</label>
          <input
            placeholder="کد ملی"
            dir="ltr"
            className="h-11 w-full rounded-xl border border-border bg-background-secondary px-3 text-sm outline-none focus:border-gold"
          />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit">ذخیره تغییرات</Button>
        </div>
      </form>
    </div>
  );
}
