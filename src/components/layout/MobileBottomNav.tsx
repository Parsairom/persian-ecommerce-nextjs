"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, ShoppingBag, Store, User } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useUiStore } from "@/store/ui";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();
  const lines = useCartStore((s) => s.lines);
  const setCartOpen = useUiStore((s) => s.setCartOpen);
  const count = lines.reduce((sum, l) => sum + l.qty, 0);

  const items = [
    { href: "/", label: "خانه", icon: Home },
    { href: "/products", label: "محصولات", icon: Store },
    { href: "#cart", label: "سبد خرید", icon: ShoppingBag, isCart: true },
    { href: "/account/wishlist", label: "علاقه‌مندی", icon: Heart },
    { href: "/account", label: "حساب من", icon: User },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-5">
        {items.map((item) => {
          const active = pathname === item.href;
          if (item.isCart) {
            return (
              <button
                key={item.label}
                onClick={() => setCartOpen(true)}
                className="relative flex flex-col items-center gap-1 py-2.5 text-foreground-muted"
              >
                <item.icon className="size-5" />
                {count > 0 && (
                  <span className="absolute right-1/3 top-1 flex size-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-navy">
                    {count}
                  </span>
                )}
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn("flex flex-col items-center gap-1 py-2.5", active ? "text-gold" : "text-foreground-muted")}
            >
              <item.icon className="size-5" />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
