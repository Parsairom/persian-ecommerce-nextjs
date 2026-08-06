"use client";

import toast from "react-hot-toast";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("پیام شما با موفقیت ارسال شد");
        (e.target as HTMLFormElement).reset();
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input required placeholder="نام و نام خانوادگی" className="h-11 rounded-xl border border-border bg-background-secondary px-4 text-sm outline-none focus:border-gold" />
        <input required placeholder="شماره موبایل" dir="ltr" className="h-11 rounded-xl border border-border bg-background-secondary px-4 text-sm outline-none focus:border-gold" />
      </div>
      <input type="email" placeholder="ایمیل (اختیاری)" dir="ltr" className="h-11 w-full rounded-xl border border-border bg-background-secondary px-4 text-sm outline-none focus:border-gold" />
      <input required placeholder="موضوع پیام" className="h-11 w-full rounded-xl border border-border bg-background-secondary px-4 text-sm outline-none focus:border-gold" />
      <textarea required placeholder="متن پیام شما" className="h-32 w-full rounded-xl border border-border bg-background-secondary px-4 py-3 text-sm outline-none focus:border-gold" />
      <Button type="submit" className="w-full" size="lg">
        <Send className="size-4" />
        ارسال پیام
      </Button>
    </form>
  );
}
