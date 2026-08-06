import Link from "next/link";
import { ProductRender } from "@/components/product/ProductRender";
import { siteConfig } from "@/lib/site-config";

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="grid min-h-[calc(100vh-64px)] grid-cols-1 md:grid-cols-2">
      <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-navy p-10 text-white md:flex">
        <div className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-gold/20 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -bottom-24 right-0 size-72 rounded-full bg-white/10 blur-3xl animate-float" />
        <Link href="/" className="relative z-10 mb-8 flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-xl bg-gold/20 text-lg font-bold text-gold">MP</span>
          <span className="text-xl font-bold">{siteConfig.name}</span>
        </Link>
        <ProductRender
          icon="Smartphone"
          gradient="linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))"
          className="relative z-10 size-64 glass"
          iconClassName="size-28"
        />
        <p className="relative z-10 mt-8 max-w-xs text-center text-sm text-white/60">{siteConfig.tagline}</p>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-foreground-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
