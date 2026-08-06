import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

const variants = {
  primary: "bg-navy text-white hover:bg-navy-light shadow-[0_8px_24px_-8px_var(--navy)]",
  gold: "bg-gold text-navy hover:brightness-105 shadow-[0_8px_24px_-8px_var(--gold)]",
  outline: "border border-border text-foreground hover:bg-background-secondary",
  ghost: "text-foreground hover:bg-background-secondary",
  glass: "glass text-foreground hover:bg-background-secondary/40",
};

const sizes = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-8 text-base",
};

interface BaseProps {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
}

type ButtonProps = BaseProps & ComponentPropsWithoutRef<"button">;
type LinkButtonProps = BaseProps & ComponentPropsWithoutRef<typeof Link>;

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}

export function LinkButton({ variant = "primary", size = "md", className, ...props }: LinkButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 active:scale-[0.97]",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
