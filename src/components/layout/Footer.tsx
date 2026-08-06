"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import toast from "react-hot-toast";
import { Container } from "@/components/ui/Container";
import { InstagramIcon, TelegramIcon, WhatsappIcon } from "@/components/ui/BrandIcons";
import { siteConfig } from "@/lib/site-config";
import { categories } from "@/lib/mock/categories";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-secondary/60">
      <Container className="grid grid-cols-1 gap-10 py-12 md:grid-cols-4 md:py-16">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-navy text-sm font-bold text-gold">MP</span>
            <span className="text-lg font-bold">{siteConfig.name}</span>
          </div>
          <p className="text-sm leading-6 text-foreground-muted">{siteConfig.description}</p>
          <div className="mt-4 flex items-center gap-3">
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="flex size-9 items-center justify-center rounded-full border border-border hover:border-gold hover:text-gold">
              <InstagramIcon className="size-4" />
            </a>
            <a href={siteConfig.telegram} target="_blank" rel="noreferrer" className="flex size-9 items-center justify-center rounded-full border border-border hover:border-gold hover:text-gold">
              <TelegramIcon className="size-4" />
            </a>
            <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer" className="flex size-9 items-center justify-center rounded-full border border-border hover:border-gold hover:text-gold">
              <WhatsappIcon className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold">دسته‌بندی‌ها</h4>
          <ul className="grid grid-cols-2 gap-2 text-sm text-foreground-muted">
            {categories.slice(0, 10).map((c) => (
              <li key={c.id}>
                <Link href={`/products?category=${c.id}`} className="hover:text-gold">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold">دسترسی سریع</h4>
          <ul className="space-y-2 text-sm text-foreground-muted">
            <li><Link href="/products" className="hover:text-gold">همه محصولات</Link></li>
            <li><Link href="/blog" className="hover:text-gold">بلاگ</Link></li>
            <li><Link href="/contact" className="hover:text-gold">تماس با ما</Link></li>
            <li><Link href="/account/orders" className="hover:text-gold">پیگیری سفارش</Link></li>
            <li><Link href="/faq" className="hover:text-gold">سوالات متداول</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold">تماس با ما</h4>
          <ul className="space-y-3 text-sm text-foreground-muted">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              {siteConfig.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" />
              {siteConfig.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" />
              {siteConfig.email}
            </li>
          </ul>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("عضویت شما در خبرنامه با موفقیت ثبت شد");
              (e.target as HTMLFormElement).reset();
            }}
            className="mt-4 flex gap-2"
          >
            <input
              required
              type="email"
              placeholder="ایمیل شما برای خبرنامه"
              className="h-10 flex-1 rounded-full border border-border bg-background px-4 text-xs outline-none focus:border-gold"
            />
            <button type="submit" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy text-gold">
              <Send className="size-4" />
            </button>
          </form>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-foreground-muted md:flex-row">
          <span>© تمامی حقوق برای {siteConfig.name} محفوظ است.</span>
          <div className="flex items-center gap-2">
            {siteConfig.paymentGateways.filter((g) => g.enabled).map((g) => (
              <span key={g.id} className="rounded-md border border-border px-2 py-1">
                {g.name}
              </span>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
