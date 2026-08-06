import type { Category } from "@/lib/types";

export const categories: Category[] = [
  { id: "mobile", slug: "mobile", title: "موبایل", icon: "Smartphone", description: "انواع گوشی‌های هوشمند اندروید و آیفون" },
  { id: "tablet", slug: "tablet", title: "تبلت", icon: "Tablet", description: "تبلت‌های اداری، طراحی و بازی" },
  { id: "laptop", slug: "laptop", title: "لپ‌تاپ", icon: "Laptop", description: "لپ‌تاپ‌های اداری، گیمینگ و طراحی" },
  { id: "smartwatch", slug: "smartwatch", title: "ساعت هوشمند", icon: "Watch", description: "ساعت‌های هوشمند و مچ‌بند سلامتی" },
  { id: "handsfree", slug: "handsfree", title: "هندزفری", icon: "Ear", description: "هندزفری سیمی و بی‌سیم" },
  { id: "headphone", slug: "headphone", title: "هدفون", icon: "Headphones", description: "هدفون‌های روگوشی و بی‌سیم" },
  { id: "speaker", slug: "speaker", title: "اسپیکر", icon: "Speaker", description: "اسپیکرهای قابل حمل و خانگی" },
  { id: "powerbank", slug: "powerbank", title: "پاوربانک", icon: "BatteryCharging", description: "شارژرهای همراه با ظرفیت‌های مختلف" },
  { id: "charger", slug: "charger", title: "شارژر", icon: "Plug", description: "شارژرهای دیواری و فست شارژ" },
  { id: "cable", slug: "cable", title: "کابل", icon: "Cable", description: "کابل‌های شارژ و انتقال داده" },
  { id: "dongle", slug: "dongle", title: "دانگل", icon: "Usb", description: "مبدل‌ها و دانگل‌های تصویری و صوتی" },
  { id: "modem", slug: "modem", title: "مودم", icon: "Router", description: "مودم‌های همراه و ثابت" },
  { id: "network", slug: "network", title: "تجهیزات شبکه", icon: "Wifi", description: "روتر، اکسس‌پوینت و تجهیزات شبکه" },
  { id: "accessory", slug: "accessory", title: "لوازم جانبی موبایل", icon: "ShoppingBag", description: "قاب، محافظ صفحه و لوازم جانبی" },
  { id: "ssd", slug: "ssd", title: "حافظه SSD", icon: "MemoryStick", description: "حافظه‌های SSD با سرعت بالا" },
  { id: "hdd", slug: "hdd", title: "هارد", icon: "Disc3", description: "هارددیسک‌های داخلی و اکسترنال" },
  { id: "flash", slug: "flash", title: "فلش", icon: "Usb", description: "فلش مموری با ظرفیت‌های متنوع" },
  { id: "memory-card", slug: "memory-card", title: "کارت حافظه", icon: "CreditCard", description: "کارت‌های حافظه microSD" },
  { id: "gaming", slug: "gaming", title: "گیمینگ", icon: "Gamepad2", description: "لوازم و تجهیزات گیمینگ" },
  { id: "console", slug: "console", title: "کنسول", icon: "Joystick", description: "کنسول‌های بازی و لوازم جانبی" },
  { id: "computer-parts", slug: "computer-parts", title: "تجهیزات کامپیوتر", icon: "Cpu", description: "قطعات و تجهیزات کامپیوتر" },
];

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id);
}
