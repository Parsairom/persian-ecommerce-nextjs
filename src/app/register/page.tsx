"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Phone, User } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/otp?phone=${encodeURIComponent(phone)}&name=${encodeURIComponent(name)}`);
  };

  return (
    <AuthShell title="ثبت‌نام در موبایل پیشرو" subtitle="با ثبت‌نام از تخفیف‌های ویژه اعضا بهره‌مند شوید">
      <form onSubmit={submit} className="space-y-4">
        <div className="relative">
          <User className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-foreground-muted" />
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام و نام خانوادگی"
            className="h-12 w-full rounded-xl border border-border bg-background-secondary pr-10 pl-4 text-sm outline-none focus:border-gold"
          />
        </div>
        <div className="relative">
          <Phone className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-foreground-muted" />
          <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="شماره موبایل"
            className="h-12 w-full rounded-xl border border-border bg-background-secondary pr-10 pl-4 text-sm outline-none focus:border-gold"
          />
        </div>
        <div className="relative">
          <Lock className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-foreground-muted" />
          <input
            required
            type="password"
            placeholder="رمز عبور"
            className="h-12 w-full rounded-xl border border-border bg-background-secondary pr-10 pl-4 text-sm outline-none focus:border-gold"
          />
        </div>
        <Button type="submit" className="w-full" size="lg">
          دریافت کد تایید و ثبت‌نام
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground-muted">
        قبلا ثبت‌نام کرده‌اید؟{" "}
        <Link href="/login" className="font-medium text-gold hover:underline">
          وارد شوید
        </Link>
      </p>
    </AuthShell>
  );
}
