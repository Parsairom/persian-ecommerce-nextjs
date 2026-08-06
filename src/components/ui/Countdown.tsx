"use client";

import { useEffect, useState } from "react";
import { faDigits } from "@/lib/utils";

function getParts(target: number) {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function Countdown({ target }: { target: string }) {
  const targetMs = new Date(target).getTime();
  const [parts, setParts] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    // Date.now() is only available client-side; the initial sync setState avoids a flash of the placeholder on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParts(getParts(targetMs));
    const id = setInterval(() => setParts(getParts(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  if (!parts) return <div className="h-11" />;

  const cells = [
    { label: "روز", value: parts.days },
    { label: "ساعت", value: parts.hours },
    { label: "دقیقه", value: parts.minutes },
    { label: "ثانیه", value: parts.seconds },
  ];

  return (
    <div className="flex items-center gap-2">
      {cells.map((c, i) => (
        <div key={c.label} className="flex items-center gap-2">
          <div className="flex min-w-11 flex-col items-center rounded-lg bg-navy px-2 py-1.5 text-white">
            <span className="text-sm font-bold tabular-nums">{faDigits(String(c.value).padStart(2, "0"))}</span>
            <span className="text-[10px] text-white/60">{c.label}</span>
          </div>
          {i < cells.length - 1 && <span className="text-foreground-muted">:</span>}
        </div>
      ))}
    </div>
  );
}
