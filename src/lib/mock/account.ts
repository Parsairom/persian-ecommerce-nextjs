import type { Address, Order } from "@/lib/types";
import { products } from "@/lib/mock/products";
import { gradientFor } from "@/lib/mock/gradients";

export const mockAddresses: Address[] = [
  { id: "a1", title: "منزل", receiver: "ایلیا اکبری", phone: "0913-000-1234", province: "کرمان", city: "کرمان", full: "خیابان جهاد، کوچه ۱۲، پلاک ۲۴، واحد ۳", postalCode: "7613744444", isDefault: true },
  { id: "a2", title: "محل کار", receiver: "ایلیا اکبری", phone: "0913-000-1234", province: "کرمان", city: "کرمان", full: "بلوار جمهوری اسلامی، مجتمع تجاری آفتاب، طبقه دوم", postalCode: "7615633333" },
];

function orderItemsFrom(indices: number[]) {
  return indices.map((i) => {
    const p = products[i % products.length];
    return { productId: p.id, title: p.title, qty: 1 + (i % 2), price: p.price, gradient: gradientFor(i), icon: p.gallery[0]?.icon ?? "Smartphone" };
  });
}

export const mockOrders: Order[] = [
  { id: "o1", number: "MP-140312-0231", date: "۱۴۰۳/۰۴/۱۰", status: "delivered", total: 68_500_000, items: orderItemsFrom([0]), trackingCode: "TP-9928374651" },
  { id: "o2", number: "MP-140310-0198", date: "۱۴۰۳/۰۳/۲۲", status: "shipped", total: 20_150_000, items: orderItemsFrom([17, 24]), trackingCode: "TP-8827364512" },
  { id: "o3", number: "MP-140302-0054", date: "۱۴۰۳/۰۲/۰۵", status: "processing", total: 4_100_000, items: orderItemsFrom([20]) },
  { id: "o4", number: "MP-140218-0902", date: "۱۴۰۳/۰۱/۱۸", status: "cancelled", total: 2_300_000, items: orderItemsFrom([23]) },
];
