"use client";

import { useState } from "react";
import { CheckCircle2, MessageCircle, ThumbsUp } from "lucide-react";
import type { Product } from "@/lib/types";
import { Rating } from "@/components/ui/Rating";
import { cn, faDigits } from "@/lib/utils";

const TABS = [
  { key: "description", label: "توضیحات" },
  { key: "specs", label: "مشخصات فنی" },
  { key: "reviews", label: "نظرات" },
  { key: "qa", label: "پرسش و پاسخ" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<TabKey>("description");

  return (
    <div className="mt-10">
      <div className="flex gap-1 overflow-x-auto border-b border-border no-scrollbar">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
              tab === t.key ? "border-gold text-gold" : "border-transparent text-foreground-muted hover:text-foreground"
            )}
          >
            {t.label}
            {t.key === "reviews" && ` (${faDigits(product.reviews.length)})`}
            {t.key === "qa" && ` (${faDigits(product.questions.length)})`}
          </button>
        ))}
      </div>

      <div className="py-6">
        {tab === "description" && (
          <div className="space-y-4">
            <p className="text-sm leading-8 text-foreground-muted">{product.description}</p>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "specs" && (
          <div className="overflow-hidden rounded-2xl border border-border">
            {product.specs.map((s, i) => (
              <div key={s.label} className={cn("flex justify-between px-4 py-3 text-sm", i % 2 === 0 && "bg-background-secondary/50")}>
                <span className="text-foreground-muted">{s.label}</span>
                <span className="font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "reviews" && (
          <div className="space-y-5">
            {product.reviews.map((r) => (
              <div key={r.id} className="border-b border-border pb-5 last:border-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{r.author}</span>
                    {r.verified && (
                      <span className="flex items-center gap-1 text-xs text-emerald-600">
                        <CheckCircle2 className="size-3.5" />
                        خرید تایید شده
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-foreground-muted">{r.date}</span>
                </div>
                <Rating value={r.rating} />
                <p className="mt-2 text-sm font-medium">{r.title}</p>
                <p className="mt-1 text-sm leading-7 text-foreground-muted">{r.body}</p>
                <button className="mt-2 flex items-center gap-1.5 text-xs text-foreground-muted hover:text-gold">
                  <ThumbsUp className="size-3.5" />
                  مفید بود ({faDigits(r.likes)})
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "qa" && (
          <div className="space-y-5">
            {product.questions.map((q) => (
              <div key={q.id} className="rounded-2xl border border-border p-4">
                <div className="flex items-start gap-2">
                  <MessageCircle className="mt-0.5 size-4 shrink-0 text-gold" />
                  <div>
                    <p className="text-sm font-medium">{q.question}</p>
                    <p className="mt-1 text-xs text-foreground-muted">{q.author} - {q.date}</p>
                  </div>
                </div>
                {q.answer && (
                  <div className="mr-6 mt-3 rounded-xl bg-background-secondary/60 p-3 text-sm text-foreground-muted">
                    <span className="mb-1 block text-xs font-bold text-gold">{q.answeredBy}</span>
                    {q.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
