"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/auth";
import { faDigits } from "@/lib/utils";

export function OtpView() {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") ?? "";
  const name = searchParams.get("name") ?? "کاربر موبایل پیشرو";
  const isReset = searchParams.get("mode") === "reset";
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [digits, setDigits] = useState(["", "", "", "", ""]);
  const [seconds, setSeconds] = useState(60);
  const [verified, setVerified] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  const handleChange = (i: number, val: string) => {
    if (!/^[0-9۰-۹]?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < 4) refs.current[i + 1]?.focus();
  };

  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    if (digits.some((d) => !d)) {
      toast.error("لطفا کد ۵ رقمی را کامل وارد کنید");
      return;
    }
    if (isReset) {
      setVerified(true);
      return;
    }
    login({ name, phone });
    toast.success("ورود با موفقیت انجام شد");
    router.push("/account");
  };

  if (verified) {
    return (
      <AuthShell title="تعیین رمز عبور جدید" subtitle="کد تایید شد، رمز عبور جدید خود را وارد کنید">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("رمز عبور با موفقیت تغییر یافت");
            router.push("/login");
          }}
          className="space-y-4"
        >
          <input required type="password" placeholder="رمز عبور جدید" className="h-12 w-full rounded-xl border border-border bg-background-secondary px-4 text-sm outline-none focus:border-gold" />
          <input required type="password" placeholder="تکرار رمز عبور جدید" className="h-12 w-full rounded-xl border border-border bg-background-secondary px-4 text-sm outline-none focus:border-gold" />
          <Button type="submit" className="w-full" size="lg">
            تغییر رمز عبور
          </Button>
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="کد تایید را وارد کنید" subtitle={`کد ۵ رقمی ارسال شده به ${phone || "شماره موبایل شما"} را وارد نمایید`}>
      <form onSubmit={verify} className="space-y-6">
        <div className="flex justify-center gap-2" dir="ltr">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              maxLength={1}
              className="size-12 rounded-xl border border-border bg-background-secondary text-center text-lg font-bold outline-none focus:border-gold"
            />
          ))}
        </div>
        <Button type="submit" className="w-full" size="lg">
          تایید کد
        </Button>
        <p className="text-center text-sm text-foreground-muted">
          {seconds > 0 ? (
            `ارسال مجدد کد تا ${faDigits(seconds)} ثانیه دیگر`
          ) : (
            <button type="button" onClick={() => setSeconds(60)} className="font-medium text-gold hover:underline">
              ارسال مجدد کد
            </button>
          )}
        </p>
      </form>
    </AuthShell>
  );
}
