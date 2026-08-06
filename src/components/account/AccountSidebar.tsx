"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  CreditCard,
  Heart,
  LogOut,
  MapPin,
  Package,
  Ticket,
  User,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/account", label: "پروفایل من", icon: User },
  { href: "/account/orders", label: "سفارش‌های من", icon: Package },
  { href: "/account/wishlist", label: "علاقه‌مندی‌ها", icon: Heart },
  { href: "/account/addresses", label: "آدرس‌ها", icon: MapPin },
  { href: "/account/wallet", label: "کیف پول", icon: CreditCard },
  { href: "/account/notifications", label: "اعلان‌ها", icon: Bell },
  { href: "/account/tickets", label: "تیکت‌های پشتیبانی", icon: Ticket },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const router = useRouter();

  return (
    <aside className="space-y-4">
      <div className="rounded-2xl border border-border bg-surface p-4">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-full bg-navy text-gold">
            <User className="size-5" />
          </span>
          <div>
            <p className="text-sm font-bold">{user?.name ?? "کاربر مهمان"}</p>
            <p className="text-xs text-foreground-muted">{user?.phone ?? "وارد نشده‌اید"}</p>
          </div>
        </div>
        {!user && (
          <Link href="/login" className="mt-3 block rounded-full bg-navy py-2 text-center text-xs font-medium text-white">
            ورود / ثبت‌نام
          </Link>
        )}
      </div>

      <nav className="space-y-1 rounded-2xl border border-border bg-surface p-2">
        {LINKS.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors",
                active ? "bg-navy text-white" : "text-foreground-muted hover:bg-background-secondary"
              )}
            >
              <l.icon className="size-4.5" />
              {l.label}
            </Link>
          );
        })}
        {user && (
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-red-500 hover:bg-red-500/10"
          >
            <LogOut className="size-4.5" />
            خروج از حساب
          </button>
        )}
      </nav>
    </aside>
  );
}
