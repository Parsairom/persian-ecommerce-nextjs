"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Rating } from "@/components/ui/Rating";
import { testimonials } from "@/lib/mock/testimonials";

export function Testimonials() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading title="نظرات مشتریان" subtitle="تجربه واقعی خریداران موبایل پیشرو" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="relative rounded-2xl border border-border bg-surface p-5"
            >
              <Quote className="mb-3 size-6 text-gold/60" />
              <p className="mb-4 text-sm leading-7 text-foreground-muted">{t.body}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-foreground-muted">{t.role}</p>
                </div>
                <Rating value={t.rating} />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
