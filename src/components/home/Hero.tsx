"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { ProductRender } from "@/components/product/ProductRender";
import { Container } from "@/components/ui/Container";
import { gradientFor } from "@/lib/mock/gradients";

const SLIDES = [
  {
    eyebrow: "کالکشن ویژه ۱۴۰۳",
    title: "آینده در دستان شما",
    subtitle: "جدیدترین گوشی‌های هوشمند با گارانتی اصلی و تحویل سریع در سراسر کشور",
    cta: "مشاهده گوشی‌ها",
    href: "/products?category=mobile",
    icon: "Smartphone",
  },
  {
    eyebrow: "پیشنهاد شگفت‌انگیز",
    title: "تا ۳۰٪ تخفیف لوازم جانبی",
    subtitle: "هدفون، هندزفری و اسپیکرهای برتر با بهترین قیمت بازار",
    cta: "مشاهده تخفیف‌ها",
    href: "/products?deal=true",
    icon: "Headphones",
  },
  {
    eyebrow: "قدرت بدون محدودیت",
    title: "لپ‌تاپ‌های نسل جدید",
    subtitle: "برای کار، طراحی و گیمینگ؛ با پردازنده‌های نسل آخر",
    cta: "مشاهده لپ‌تاپ‌ها",
    href: "/products?category=laptop",
    icon: "Laptop",
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[index];

  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{ background: gradientFor(index) }} />
      <div className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-gold/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -bottom-24 right-0 size-80 rounded-full bg-white/10 blur-3xl animate-float" />

      <Container className="relative z-10 grid min-h-[520px] grid-cols-1 items-center gap-8 py-16 md:min-h-[600px] md:grid-cols-2 md:py-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-white"
          >
            <span className="gold-text text-sm font-semibold">{slide.eyebrow}</span>
            <h1 className="mt-3 text-3xl font-black leading-tight md:text-5xl">{slide.title}</h1>
            <p className="mt-4 max-w-md text-sm text-white/70 md:text-base">{slide.subtitle}</p>
            <div className="mt-8 flex items-center gap-3">
              <LinkButton href={slide.href} variant="gold" size="lg">
                {slide.cta}
                <ArrowLeft className="size-4" />
              </LinkButton>
              <LinkButton href="/products" variant="glass" size="lg" className="text-white">
                همه محصولات
              </LinkButton>
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.85, rotate: 6 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto hidden aspect-square w-full max-w-sm md:block"
          >
            <ProductRender icon={slide.icon} gradient="linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))" className="size-full glass" iconClassName="size-40" />
          </motion.div>
        </AnimatePresence>
      </Container>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`اسلاید ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-gold" : "w-1.5 bg-white/40"}`}
          />
        ))}
      </div>

      <button
        onClick={() => setIndex((i) => (i + 1) % SLIDES.length)}
        className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/20 p-2 text-white hover:bg-white/10 md:flex"
        aria-label="اسلاید بعدی"
      >
        <ChevronRight className="size-5" />
      </button>
      <button
        onClick={() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)}
        className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/20 p-2 text-white hover:bg-white/10 md:flex"
        aria-label="اسلاید قبلی"
      >
        <ChevronLeft className="size-5" />
      </button>
    </section>
  );
}
