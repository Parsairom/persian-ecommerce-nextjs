"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Phone } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/otp?phone=${encodeURIComponent(phone)}&mode=reset`);
  };

  return (
    <AuthShell title="بازیابی رمز عبور" subtitle="شماره موبایل خود را وارد کنید تا کد بازیابی برای شما ارسال شود">
      <form onSubmit={submit} className="space-y-4">
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
          ارسال کد بازیابی
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-foreground-muted">
        <Link href="/login" className="font-medium text-gold hover:underline">
          بازگشت به صفحه ورود
        </Link>
      </p>
    </AuthShell>
  );
}
