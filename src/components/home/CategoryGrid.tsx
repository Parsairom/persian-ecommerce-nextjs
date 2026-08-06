"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/lib/mock/categories";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CategoryGrid() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading title="دسته‌بندی محصولات" subtitle="هر آنچه برای دنیای دیجیتال نیاز دارید" href="/products" />
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
          {categories.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 7) * 0.04 }}
            >
              <Link
                href={`/products?category=${c.id}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-4 text-center transition-all hover:-translate-y-1 hover:border-gold hover:shadow-lg"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-background-secondary text-navy transition-colors group-hover:bg-gold/15 group-hover:text-gold dark:text-white">
                  <Icon name={c.icon} className="size-6" strokeWidth={1.5} />
                </span>
                <span className="text-xs font-medium leading-tight">{c.title}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
