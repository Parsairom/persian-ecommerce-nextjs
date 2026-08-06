"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FaqItem } from "@/lib/types";

export function FaqAccordion({ items, plain = false }: { items: FaqItem[]; plain?: boolean }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const content = (
    <div className="mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border bg-surface">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpenId(open ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 p-4 text-right md:p-5"
            >
              <span className="text-sm font-medium md:text-base">{item.question}</span>
              <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 text-gold">
                <Plus className="size-5" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 text-sm leading-7 text-foreground-muted md:px-5">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );

  if (plain) return content;

  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading title="سوالات متداول" subtitle="پاسخ به پرتکرارترین سوالات مشتریان" />
        {content}
      </Container>
    </section>
  );
}
