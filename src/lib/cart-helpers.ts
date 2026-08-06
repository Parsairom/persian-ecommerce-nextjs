import { products } from "@/lib/mock/products";
import { siteConfig } from "@/lib/site-config";
import type { CartLine } from "@/store/cart";

const COUPONS: Record<string, number> = {
  "WELCOME10": 0.1,
  "PISHRO20": 0.2,
};

export function getCartDetails(lines: CartLine[], couponCode: string | null) {
  const items = lines
    .map((line) => {
      const product = products.find((p) => p.id === line.productId);
      if (!product) return null;
      return { line, product, lineTotal: product.price * line.qty };
    })
    .filter((x): x is { line: CartLine; product: (typeof products)[number]; lineTotal: number } => x !== null);

  const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);
  const discountRate = couponCode && COUPONS[couponCode] ? COUPONS[couponCode] : 0;
  const discount = Math.round(subtotal * discountRate);
  const afterDiscount = subtotal - discount;
  const shipping = subtotal === 0 || subtotal >= siteConfig.freeShippingThreshold ? 0 : siteConfig.shippingCost;
  const tax = Math.round(afterDiscount * siteConfig.taxRate);
  const total = afterDiscount + shipping + tax;

  return { items, subtotal, discount, discountRate, shipping, tax, total };
}

export function isValidCoupon(code: string) {
  return code in COUPONS;
}
