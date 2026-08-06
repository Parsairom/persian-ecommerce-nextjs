"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { KeyRound, Lock, Phone } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [mode, setMode] = useState<"password" | "otp">("password");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const submitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    login({ name: "ایلیا اکبری", phone });
    router.push("/account");
  };

  const submitOtp = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/otp?phone=${encodeURIComponent(phone)}`);
  };

  return (
    <AuthShell title="ورود به حساب کاربری" subtitle="برای مشاهده سفارش‌ها و ادامه خرید وارد شوید">
      <div className="mb-6 flex gap-1 rounded-full bg-background-secondary p-1">
        <button
          onClick={() => setMode("password")}
          className={cn("flex-1 rounded-full py-2 text-sm font-medium transition-colors", mode === "password" ? "bg-navy text-white" : "text-foreground-muted")}
        >
          ورود با رمز
        </button>
        <button
          onClick={() => setMode("otp")}
          className={cn("flex-1 rounded-full py-2 text-sm font-medium transition-colors", mode === "otp" ? "bg-navy text-white" : "text-foreground-muted")}
        >
          ورود با کد یکبار مصرف
        </button>
      </div>

      {mode === "password" ? (
        <form onSubmit={submitPassword} className="space-y-4">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور"
              className="h-12 w-full rounded-xl border border-border bg-background-secondary pr-10 pl-4 text-sm outline-none focus:border-gold"
            />
          </div>
          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-xs text-gold hover:underline">
              رمز عبور را فراموش کرده‌اید؟
            </Link>
          </div>
          <Button type="submit" className="w-full" size="lg">
            ورود
          </Button>
        </form>
      ) : (
        <form onSubmit={submitOtp} className="space-y-4">
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
          <Button type="submit" className="w-full" size="lg">
            <KeyRound className="size-4" />
            ارسال کد یکبار مصرف
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-foreground-muted">
        حساب کاربری ندارید؟{" "}
        <Link href="/register" className="font-medium text-gold hover:underline">
          ثبت‌نام کنید
        </Link>
      </p>
    </AuthShell>
  );
}
