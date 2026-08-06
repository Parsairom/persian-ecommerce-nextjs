// Single source of truth for store-wide settings.
// In later phases this will be read from the database / admin panel instead of a static file.
export const siteConfig = {
  name: "موبایل پیشرو",
  nameEn: "Mobile Pishro",
  tagline: "مقصد تخصصی محصولات دیجیتال و الکترونیک",
  description:
    "فروشگاه اینترنتی موبایل پیشرو، ارائه‌دهنده انواع موبایل، تبلت، لپ‌تاپ، لوازم جانبی و محصولات دیجیتال با گارانتی اصلی و ارسال سریع در سراسر کشور.",
  city: "کرمان",
  address: "کرمان، خیابان جهاد، نبش کوچه ۱۲، مجتمع تجاری پیشرو، پلاک ۲۴",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Kerman,Iran&hl=fa&z=15&output=embed",
  mapLink: "https://maps.google.com/?q=Kerman,Iran",
  phone: "034-3223-4455",
  supportPhone: "0913-000-1234",
  whatsapp: "https://wa.me/989130001234",
  telegram: "https://t.me/mobilepishro",
  instagram: "https://instagram.com/mobilepishro",
  email: "info@mobilepishro.ir",
  workingHours: [
    { day: "شنبه تا چهارشنبه", hours: "۹:۰۰ الی ۲۱:۰۰" },
    { day: "پنجشنبه", hours: "۹:۰۰ الی ۱۹:۰۰" },
    { day: "جمعه", hours: "۱۶:۰۰ الی ۲۱:۰۰" },
  ],
  socials: {
    instagram: "https://instagram.com/mobilepishro",
    telegram: "https://t.me/mobilepishro",
    whatsapp: "https://wa.me/989130001234",
  },
  paymentGateways: [
    { id: "zarinpal", name: "زرین‌پال", enabled: true },
    { id: "zibal", name: "زیبال", enabled: true },
    { id: "nextpay", name: "نکست پی", enabled: false },
    { id: "idpay", name: "آیدی پی", enabled: false },
  ],
  currency: "تومان",
  freeShippingThreshold: 2_000_000,
  shippingCost: 350_000,
  taxRate: 0.09,
};

export type SiteConfig = typeof siteConfig;
