"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Menu, Moon, Phone, Sun, User, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SearchBar } from "@/components/layout/SearchBar";
import { CartButton } from "@/components/layout/CartButton";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useWishlistStore } from "@/store/wishlist";
import { siteConfig } from "@/lib/site-config";
import { categories } from "@/lib/mock/categories";

const NAV_LINKS = [
  { href: "/products", label: "همه محصولات" },
  { href: "/products?category=mobile", label: "موبایل" },
  { href: "/products?category=laptop", label: "لپ‌تاپ" },
  { href: "/products?category=accessory", label: "لوازم جانبی" },
  { href: "/blog", label: "بلاگ" },
  { href: "/contact", label: "تماس با ما" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const wishlistCount = useWishlistStore((s) => s.productIds.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      <div className="hidden bg-navy text-white/80 md:block">
        <Container className="flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="size-3.5" />
              {siteConfig.phone}
            </span>
            <span>ارسال به سراسر کشور از {siteConfig.city}</span>
          </div>
          <span className="gold-text font-medium">خرید بالای {new Intl.NumberFormat("fa-IR").format(siteConfig.freeShippingThreshold)} تومان، ارسال رایگان</span>
        </Container>
      </div>

      <div className={`border-b border-border bg-background/80 backdrop-blur-xl transition-shadow ${scrolled ? "shadow-sm" : ""}`}>
        <Container className="flex h-16 items-center gap-4 md:h-20">
          <button className="md:hidden" onClick={() => setMobileOpen(true)} aria-label="منو">
            <Menu className="size-6" />
          </button>

          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="flex size-9 items-center justify-center rounded-xl bg-navy text-sm font-bold text-gold md:size-10">MP</span>
            <span className="hidden text-lg font-bold sm:inline">{siteConfig.name}</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-foreground-muted transition-colors hover:text-gold">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden max-w-md flex-1 md:block">
            <SearchBar />
          </div>

          <div className="mr-auto flex items-center gap-1 md:mr-0 md:gap-2">
            <button onClick={toggle} className="hidden size-10 items-center justify-center rounded-full hover:bg-background-secondary md:flex" aria-label="تغییر پوسته">
              {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
            <Link href="/account/wishlist" className="relative hidden size-10 items-center justify-center rounded-full hover:bg-background-secondary md:flex" aria-label="علاقه‌مندی‌ها">
              <Heart className="size-5" />
              {wishlistCount > 0 && (
                <span className="absolute -left-0.5 -top-0.5 flex size-4.5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-navy">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/account" className="hidden size-10 items-center justify-center rounded-full hover:bg-background-secondary md:flex" aria-label="حساب کاربری">
              <User className="size-5" />
            </Link>
            <CartButton />
          </div>
        </Container>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="relative flex h-full w-[82%] max-w-sm flex-col gap-6 overflow-y-auto bg-background p-5">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">{siteConfig.name}</span>
              <button onClick={() => setMobileOpen(false)} aria-label="بستن">
                <X className="size-6" />
              </button>
            </div>
            <SearchBar onNavigate={() => setMobileOpen(false)} />
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium hover:bg-background-secondary"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-border pt-4">
              <p className="mb-2 px-1 text-xs font-medium text-foreground-muted">دسته‌بندی‌ها</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 8).map((c) => (
                  <Link
                    key={c.id}
                    href={`/products?category=${c.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl border border-border px-3 py-2 text-xs hover:bg-background-secondary"
                  >
                    {c.title}
                  </Link>
                ))}
              </div>
            </div>
            <button
              onClick={toggle}
              className="mt-auto flex items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-medium"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              تغییر پوسته {theme === "dark" ? "روشن" : "تیره"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
