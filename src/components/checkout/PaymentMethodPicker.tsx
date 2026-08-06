"use client";

import { CreditCard } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function PaymentMethodPicker({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  const gateways = siteConfig.paymentGateways.filter((g) => g.enabled);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {gateways.map((g) => (
        <button
          key={g.id}
          onClick={() => onSelect(g.id)}
          className={cn(
            "flex flex-col items-center gap-2 rounded-2xl border p-4 transition-colors",
            selected === g.id ? "border-gold bg-gold/5" : "border-border hover:border-gold/40"
          )}
        >
          <CreditCard className={cn("size-6", selected === g.id ? "text-gold" : "text-foreground-muted")} />
          <span className="text-xs font-medium">{g.name}</span>
        </button>
      ))}
    </div>
  );
}
