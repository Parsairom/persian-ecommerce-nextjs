"use client";

import { Mail } from "lucide-react";
import toast from "react-hot-toast";
import { Container } from "@/components/ui/Container";

export function Newsletter() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-12 text-center text-white md:py-16">
          <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-gold/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 size-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-lg">
            <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Mail className="size-6" />
            </span>
            <h2 className="text-2xl font-bold md:text-3xl">در خبرنامه موبایل پیشرو عضو شوید</h2>
            <p className="mt-3 text-sm text-white/70">از جدیدترین محصولات، تخفیف‌ها و پیشنهادهای ویژه باخبر شوید</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("عضویت شما در خبرنامه با موفقیت ثبت شد");
                (e.target as HTMLFormElement).reset();
              }}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <input
                required
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-sm text-white outline-none placeholder:text-white/50 focus:border-gold"
              />
              <button type="submit" className="h-12 shrink-0 rounded-full bg-gold px-6 text-sm font-bold text-navy transition-transform hover:scale-105">
                عضویت در خبرنامه
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
