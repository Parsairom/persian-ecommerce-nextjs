import { Container } from "@/components/ui/Container";
import { brands } from "@/lib/mock/brands";
import Link from "next/link";

export function BrandsStrip() {
  return (
    <section className="border-y border-border bg-background-secondary/50 py-10">
      <Container>
        <p className="mb-6 text-center text-sm text-foreground-muted">برندهای معتبر همکار با موبایل پیشرو</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {brands.map((b) => (
            <Link
              key={b.id}
              href={`/products?brand=${b.id}`}
              className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:border-gold hover:text-gold"
            >
              {b.name}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
