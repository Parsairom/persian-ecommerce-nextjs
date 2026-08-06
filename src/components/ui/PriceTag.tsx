import { discountPercent, formatToman, faDigits } from "@/lib/utils";

export function PriceTag({
  price,
  compareAtPrice,
  size = "md",
}: {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg";
}) {
  const discount = discountPercent(price, compareAtPrice);
  const priceCls = size === "lg" ? "text-2xl md:text-3xl" : size === "md" ? "text-lg" : "text-base";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className={`font-bold ${priceCls}`}>{faDigits(formatToman(price))} تومان</span>
      {discount > 0 && (
        <>
          <span className="text-sm text-foreground-muted line-through">{faDigits(formatToman(compareAtPrice!))}</span>
          <span className="rounded-md bg-red-500/10 text-red-500 text-xs font-bold px-1.5 py-0.5">
            {faDigits(discount)}٪
          </span>
        </>
      )}
    </div>
  );
}
