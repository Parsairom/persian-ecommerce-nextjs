"use client";

import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { faDigits, formatToman } from "@/lib/utils";

const TRANSACTIONS = [
  { id: "tx1", type: "in", title: "بازگشت وجه سفارش لغو شده", amount: 2_300_000, date: "۱۴۰۳/۰۱/۱۹" },
  { id: "tx2", type: "out", title: "استفاده در تسویه سفارش MP-140302-0054", amount: 500_000, date: "۱۴۰۳/۰۲/۰۵" },
  { id: "tx3", type: "in", title: "شارژ کیف پول", amount: 5_000_000, date: "۱۴۰۳/۰۳/۱۰" },
];

export default function WalletPage() {
  const balance = TRANSACTIONS.reduce((sum, t) => sum + (t.type === "in" ? t.amount : -t.amount), 0);

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-bold">کیف پول</h1>

      <div className="rounded-2xl bg-navy p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/60">موجودی کیف پول</p>
            <p className="mt-2 text-2xl font-bold">{faDigits(formatToman(balance))} تومان</p>
          </div>
          <span className="flex size-12 items-center justify-center rounded-full bg-gold/20 text-gold">
            <Wallet className="size-6" />
          </span>
        </div>
        <Button variant="gold" size="sm" className="mt-4" onClick={() => toast.success("درخواست شارژ کیف پول ثبت شد")}>
          شارژ کیف پول
        </Button>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-bold">تاریخچه تراکنش‌ها</h2>
        <div className="space-y-2">
          {TRANSACTIONS.map((t) => (
            <div key={t.id} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
              <span className={`flex size-9 items-center justify-center rounded-full ${t.type === "in" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                {t.type === "in" ? <ArrowDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}
              </span>
              <div className="flex-1">
                <p className="text-sm">{t.title}</p>
                <p className="text-xs text-foreground-muted">{t.date}</p>
              </div>
              <span className={`text-sm font-bold ${t.type === "in" ? "text-emerald-500" : "text-red-500"}`}>
                {t.type === "in" ? "+" : "-"}
                {faDigits(formatToman(t.amount))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
