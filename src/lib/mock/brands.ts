import type { Brand } from "@/lib/types";

export const brands: Brand[] = [
  { id: "apple", slug: "apple", name: "اپل" },
  { id: "samsung", slug: "samsung", name: "سامسونگ" },
  { id: "xiaomi", slug: "xiaomi", name: "شیائومی" },
  { id: "asus", slug: "asus", name: "ایسوس" },
  { id: "sony", slug: "sony", name: "سونی" },
  { id: "jbl", slug: "jbl", name: "جی‌بی‌ال" },
  { id: "anker", slug: "anker", name: "انکر" },
  { id: "huawei", slug: "huawei", name: "هوآوی" },
  { id: "lenovo", slug: "lenovo", name: "لنوو" },
  { id: "tplink", slug: "tplink", name: "تی‌پی‌لینک" },
  { id: "logitech", slug: "logitech", name: "لاجیتک" },
  { id: "kingston", slug: "kingston", name: "کینگستون" },
];

export function getBrandById(id: string) {
  return brands.find((b) => b.id === id);
}
