import type { Product, ProductCategory, ProductReview, ProductQuestion } from "@/lib/types";
import { gradientFor } from "@/lib/mock/gradients";

// Deterministic pseudo-random generator so server/client renders match (no Math.random at module scope).
function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const REVIEW_AUTHORS = ["علی رضایی", "مریم احمدی", "حسین کریمی", "زهرا موسوی", "امیر حسینی", "نگار صادقی", "رضا قاسمی", "سارا نوری", "محمد طاهری", "فاطمه یزدانی"];
const REVIEW_TITLES = ["کیفیت عالی", "ارزش خرید بالا", "راضی‌ام از خرید", "بهتر از انتظارم", "کیفیت ساخت خوب", "پیشنهاد می‌کنم"];
const REVIEW_BODIES = [
  "بسته‌بندی سالم بود و ارسال هم سریع انجام شد، از خریدم راضی هستم.",
  "کیفیت ساخت محصول در حد قیمتش خیلی خوبه، پیشنهاد می‌کنم.",
  "دقیقاً همون چیزی بود که توی مشخصات نوشته شده بود، عالی بود.",
  "نسبت به مدل قبلی که داشتم پیشرفت قابل توجهی داره.",
  "پشتیبانی فروشگاه هم عالی بود و سریع جواب دادن.",
  "کمی دیرتر از موعد رسید ولی خود کالا کیفیتش خوب بود.",
];
const QUESTIONS = [
  { q: "گارانتی این محصول چند ماهه است؟", a: "این محصول ۱۸ ماه گارانتی اصلی دارد و در سراسر کشور قابل استفاده است." },
  { q: "امکان ارسال به شهرستان‌ها وجود دارد؟", a: "بله، ارسال به سراسر کشور از طریق پست و تیپاکس امکان‌پذیر است." },
  { q: "آیا رنگ‌بندی دیگری هم موجود است؟", a: "بله، سایر رنگ‌بندی‌ها در بخش انتخاب رنگ همین صفحه قابل مشاهده و انتخاب است." },
];

function buildReviews(seed: number, count: number): ProductReview[] {
  const rnd = seededRandom(seed + 1);
  return Array.from({ length: count }, (_, i) => ({
    id: `rev-${seed}-${i}`,
    author: REVIEW_AUTHORS[Math.floor(rnd() * REVIEW_AUTHORS.length)],
    rating: 3 + Math.floor(rnd() * 3),
    date: `140${3 + Math.floor(rnd() * 2)}/0${1 + Math.floor(rnd() * 9)}/${10 + Math.floor(rnd() * 18)}`,
    title: REVIEW_TITLES[Math.floor(rnd() * REVIEW_TITLES.length)],
    body: REVIEW_BODIES[Math.floor(rnd() * REVIEW_BODIES.length)],
    verified: rnd() > 0.25,
    likes: Math.floor(rnd() * 40),
  }));
}

function buildQuestions(seed: number, count: number): ProductQuestion[] {
  const rnd = seededRandom(seed + 2);
  return Array.from({ length: count }, (_, i) => {
    const item = QUESTIONS[Math.floor(rnd() * QUESTIONS.length)];
    return {
      id: `q-${seed}-${i}`,
      author: REVIEW_AUTHORS[Math.floor(rnd() * REVIEW_AUTHORS.length)],
      date: `140${3 + Math.floor(rnd() * 2)}/0${1 + Math.floor(rnd() * 9)}/${10 + Math.floor(rnd() * 18)}`,
      question: item.q,
      answer: item.a,
      answeredBy: "پشتیبانی موبایل پیشرو",
    };
  });
}

const COLOR_SETS: Record<string, { id: string; name: string; hex: string }[]> = {
  default: [
    { id: "black", name: "مشکی", hex: "#111214" },
    { id: "silver", name: "نقره‌ای", hex: "#c9cad0" },
    { id: "gold", name: "طلایی", hex: "#c9a668" },
    { id: "blue", name: "آبی", hex: "#274472" },
  ],
};

interface Seed {
  title: string;
  brandId: string;
  categoryId: ProductCategory;
  price: number;
  compareAtPrice?: number;
  icon: string;
  specs: { label: string; value: string }[];
  features: string[];
  hasColors?: boolean;
  warranty?: string;
}

const SEEDS: Seed[] = [
  // Mobile
  { title: "گوشی موبایل اپل مدل iPhone 15 Pro ظرفیت ۲۵۶ گیگابایت", brandId: "apple", categoryId: "mobile", price: 68_500_000, compareAtPrice: 74_900_000, icon: "Smartphone", hasColors: true,
    specs: [{ label: "صفحه‌نمایش", value: "۶.۱ اینچ Super Retina XDR" }, { label: "پردازنده", value: "Apple A17 Pro" }, { label: "حافظه", value: "256GB" }, { label: "دوربین", value: "۴۸ مگاپیکسل سه‌گانه" }, { label: "باتری", value: "۳۲۷۴ میلی‌آمپر ساعت" }],
    features: ["بدنه تیتانیومی مقاوم", "پشتیبانی از 5G", "دوربین اولترا واید پیشرفته", "تراشه A17 Pro با گرافیک قدرتمند"] },
  { title: "گوشی موبایل سامسونگ مدل Galaxy S24 Ultra ظرفیت ۵۱۲ گیگابایت", brandId: "samsung", categoryId: "mobile", price: 59_900_000, compareAtPrice: 65_000_000, icon: "Smartphone", hasColors: true,
    specs: [{ label: "صفحه‌نمایش", value: "۶.۸ اینچ Dynamic AMOLED 2X" }, { label: "پردازنده", value: "Snapdragon 8 Gen 3" }, { label: "حافظه", value: "512GB" }, { label: "دوربین", value: "۲۰۰ مگاپیکسل" }, { label: "باتری", value: "۵۰۰۰ میلی‌آمپر ساعت" }],
    features: ["قلم S Pen داخلی", "بدنه تیتانیومی", "زوم اپتیکال ۱۰ برابر", "هوش مصنوعی Galaxy AI"] },
  { title: "گوشی موبایل شیائومی مدل Redmi Note 13 Pro ظرفیت ۲۵۶ گیگابایت", brandId: "xiaomi", categoryId: "mobile", price: 14_200_000, compareAtPrice: 16_500_000, icon: "Smartphone", hasColors: true,
    specs: [{ label: "صفحه‌نمایش", value: "۶.۶۷ اینچ AMOLED" }, { label: "پردازنده", value: "Snapdragon 7s Gen 2" }, { label: "حافظه", value: "256GB" }, { label: "دوربین", value: "۲۰۰ مگاپیکسل" }, { label: "باتری", value: "۵۱۰۰ میلی‌آمپر ساعت" }],
    features: ["شارژ سریع ۶۷ واتی", "بدنه ضدآب IP54", "صفحه‌نمایش با نرخ به‌روزرسانی ۱۲۰ هرتز"] },
  { title: "گوشی موبایل اپل مدل iPhone 14 ظرفیت ۱۲۸ گیگابایت", brandId: "apple", categoryId: "mobile", price: 42_000_000, compareAtPrice: 47_000_000, icon: "Smartphone", hasColors: true,
    specs: [{ label: "صفحه‌نمایش", value: "۶.۱ اینچ Super Retina XDR" }, { label: "پردازنده", value: "Apple A15 Bionic" }, { label: "حافظه", value: "128GB" }, { label: "دوربین", value: "۱۲ مگاپیکسل دوگانه" }],
    features: ["حالت اضطراری ماهواره‌ای", "دوربین جلوی اتوفوکوس", "ضد آب و گرد و غبار"] },
  { title: "گوشی موبایل سامسونگ مدل Galaxy A55", brandId: "samsung", categoryId: "mobile", price: 18_900_000, icon: "Smartphone", hasColors: true,
    specs: [{ label: "صفحه‌نمایش", value: "۶.۶ اینچ Super AMOLED" }, { label: "پردازنده", value: "Exynos 1480" }, { label: "حافظه", value: "256GB" }],
    features: ["بدنه فلزی یکپارچه", "دوربین اصلی ۵۰ مگاپیکسل با OIS"] },
  // Tablet
  { title: "تبلت اپل مدل iPad Air نسل ۵ ظرفیت ۲۵۶ گیگابایت", brandId: "apple", categoryId: "tablet", price: 39_500_000, compareAtPrice: 43_000_000, icon: "Tablet",
    specs: [{ label: "صفحه‌نمایش", value: "۱۰.۹ اینچ Liquid Retina" }, { label: "پردازنده", value: "Apple M1" }, { label: "حافظه", value: "256GB" }],
    features: ["پشتیبانی از Apple Pencil نسل ۲", "دوربین جلو Center Stage", "طراحی فوق‌العاده نازک"] },
  { title: "تبلت سامسونگ مدل Galaxy Tab S9", brandId: "samsung", categoryId: "tablet", price: 34_900_000, icon: "Tablet",
    specs: [{ label: "صفحه‌نمایش", value: "۱۱ اینچ Dynamic AMOLED 2X" }, { label: "پردازنده", value: "Snapdragon 8 Gen 2" }, { label: "حافظه", value: "128GB" }],
    features: ["مقاومت در برابر آب IP68", "قلم S Pen همراه", "صدای استریو کوادروفونیک"] },
  { title: "تبلت شیائومی مدل Redmi Pad Pro", brandId: "xiaomi", categoryId: "tablet", price: 12_400_000, compareAtPrice: 14_000_000, icon: "Tablet",
    specs: [{ label: "صفحه‌نمایش", value: "۱۲.۱ اینچ IPS" }, { label: "پردازنده", value: "Snapdragon 7s Gen 2" }, { label: "حافظه", value: "256GB" }],
    features: ["باتری ۱۰۰۰۰ میلی‌آمپر ساعت", "شارژ سریع ۳۳ واتی"] },
  // Laptop
  { title: "لپ‌تاپ اپل مدل MacBook Air M3 ۱۳ اینچ", brandId: "apple", categoryId: "laptop", price: 74_900_000, compareAtPrice: 79_900_000, icon: "Laptop",
    specs: [{ label: "پردازنده", value: "Apple M3 8 هسته‌ای" }, { label: "حافظه رم", value: "16GB" }, { label: "حافظه داخلی", value: "512GB SSD" }, { label: "صفحه‌نمایش", value: "۱۳.۶ اینچ Liquid Retina" }],
    features: ["بدون فن، خنک‌کننده کاملاً بی‌صدا", "باتری تا ۱۸ ساعت", "طراحی فوق سبک و نازک"] },
  { title: "لپ‌تاپ ایسوس مدل ROG Zephyrus G14", brandId: "asus", categoryId: "laptop", price: 89_000_000, icon: "Laptop",
    specs: [{ label: "پردازنده", value: "AMD Ryzen 9 7940HS" }, { label: "کارت گرافیک", value: "RTX 4060 8GB" }, { label: "حافظه رم", value: "32GB" }, { label: "حافظه داخلی", value: "1TB SSD" }],
    features: ["صفحه‌نمایش ۱۶۵ هرتز QHD+", "خنک‌کنندگی پیشرفته دوگانه", "کیبورد بک‌لایت RGB"] },
  { title: "لپ‌تاپ لنوو مدل IdeaPad Slim 5", brandId: "lenovo", categoryId: "laptop", price: 38_500_000, compareAtPrice: 42_000_000, icon: "Laptop",
    specs: [{ label: "پردازنده", value: "Intel Core i7-1355U" }, { label: "حافظه رم", value: "16GB" }, { label: "حافظه داخلی", value: "512GB SSD" }],
    features: ["بدنه آلومینیومی باکیفیت", "باتری تا ۱۲ ساعت کارکرد"] },
  { title: "لپ‌تاپ ایسوس مدل Vivobook Pro 15 OLED", brandId: "asus", categoryId: "laptop", price: 52_000_000, icon: "Laptop",
    specs: [{ label: "پردازنده", value: "Intel Core i9-13900H" }, { label: "کارت گرافیک", value: "RTX 4050" }, { label: "صفحه‌نمایش", value: "۱۵.۶ اینچ OLED 2.8K" }],
    features: ["رنگ‌های دقیق برای طراحان", "پورت‌های کامل Thunderbolt 4"] },
  // Smartwatch
  { title: "ساعت هوشمند اپل مدل Apple Watch Series 9 45mm", brandId: "apple", categoryId: "smartwatch", price: 24_500_000, compareAtPrice: 27_000_000, icon: "Watch", hasColors: true,
    specs: [{ label: "صفحه‌نمایش", value: "Always-On Retina" }, { label: "مقاومت آب", value: "WR50" }, { label: "سنسورها", value: "ضربان قلب، اکسیژن خون" }],
    features: ["تشخیص افتادن و تصادف", "کنترل صوتی با Siri", "پشتیبانی از eSIM"] },
  { title: "ساعت هوشمند سامسونگ مدل Galaxy Watch6", brandId: "samsung", categoryId: "smartwatch", price: 15_900_000, icon: "Watch", hasColors: true,
    specs: [{ label: "صفحه‌نمایش", value: "۱.۵ اینچ AMOLED" }, { label: "باتری", value: "۴۲۵ میلی‌آمپر ساعت" }],
    features: ["اندازه‌گیری ترکیب بدن", "تحلیل خواب پیشرفته"] },
  { title: "ساعت هوشمند شیائومی مدل Watch S3", brandId: "xiaomi", categoryId: "smartwatch", price: 6_400_000, compareAtPrice: 7_500_000, icon: "Watch",
    specs: [{ label: "صفحه‌نمایش", value: "۱.۴۳ اینچ AMOLED" }, { label: "باتری", value: "تا ۱۵ روز" }],
    features: ["بیش از ۱۵۰ حالت ورزشی", "قاب‌های تعویضی"] },
  // Handsfree / earbuds
  { title: "هندزفری بی‌سیم اپل مدل AirPods Pro 2", brandId: "apple", categoryId: "handsfree", price: 12_900_000, compareAtPrice: 14_500_000, icon: "Ear",
    specs: [{ label: "نویز کنسلی", value: "فعال (ANC)" }, { label: "باتری", value: "تا ۶ ساعت پخش" }, { label: "اتصال", value: "Bluetooth 5.3" }],
    features: ["حالت شنوایی محیط تطبیقی", "مقاومت در برابر عرق و آب IPX4", "کیس شارژ با اسپیکر"] },
  { title: "هندزفری بی‌سیم سامسونگ مدل Galaxy Buds2 Pro", brandId: "samsung", categoryId: "handsfree", price: 8_200_000, icon: "Ear",
    specs: [{ label: "نویز کنسلی", value: "فعال (ANC)" }, { label: "باتری", value: "تا ۵ ساعت پخش" }],
    features: ["صدای ۲۴بیت هایرزولوشن", "اتصال ۳۶۰ درجه"] },
  { title: "هندزفری بی‌سیم شیائومی مدل Redmi Buds 5 Pro", brandId: "xiaomi", categoryId: "handsfree", price: 2_450_000, compareAtPrice: 2_900_000, icon: "Ear",
    specs: [{ label: "نویز کنسلی", value: "فعال تا ۴۹ دسی‌بل" }, { label: "باتری", value: "تا ۹ ساعت پخش" }],
    features: ["شارژ سریع", "درایور دوگانه"] },
  // Headphone
  { title: "هدفون بی‌سیم سونی مدل WH-1000XM5", brandId: "sony", categoryId: "headphone", price: 17_500_000, compareAtPrice: 19_900_000, icon: "Headphones",
    specs: [{ label: "نویز کنسلی", value: "فعال پیشرفته" }, { label: "باتری", value: "تا ۳۰ ساعت" }, { label: "اتصال", value: "Bluetooth 5.2 و NFC" }],
    features: ["بهترین حذف نویز در کلاس خود", "تشخیص لمسی برای کنترل", "میکروفون‌های چندگانه برای تماس شفاف"] },
  { title: "هدفون بی‌سیم جی‌بی‌ال مدل Tune 760NC", brandId: "jbl", categoryId: "headphone", price: 4_100_000, icon: "Headphones",
    specs: [{ label: "باتری", value: "تا ۳۵ ساعت" }, { label: "نویز کنسلی", value: "فعال" }],
    features: ["صدای JBL Pure Bass", "تاشو و قابل حمل"] },
  // Speaker
  { title: "اسپیکر بلوتوثی جی‌بی‌ال مدل Flip 6", brandId: "jbl", categoryId: "speaker", price: 5_900_000, compareAtPrice: 6_800_000, icon: "Speaker", hasColors: true,
    specs: [{ label: "توان خروجی", value: "۳۰ وات" }, { label: "مقاومت آب", value: "IP67" }, { label: "باتری", value: "تا ۱۲ ساعت" }],
    features: ["صدای استریو با پیرینگ دوگانه", "ضدآب و ضدگردوغبار کامل"] },
  { title: "اسپیکر خانگی سونی مدل SRS-XG300", brandId: "sony", categoryId: "speaker", price: 11_200_000, icon: "Speaker",
    specs: [{ label: "توان خروجی", value: "۵۰ وات" }, { label: "باتری", value: "تا ۲۵ ساعت" }],
    features: ["افکت‌های نور رقصان", "مقاومت در برابر ضربه و آب"] },
  // Powerbank
  { title: "پاوربانک انکر مدل PowerCore 20000mAh", brandId: "anker", categoryId: "powerbank", price: 2_300_000, compareAtPrice: 2_700_000, icon: "BatteryCharging",
    specs: [{ label: "ظرفیت", value: "۲۰۰۰۰ میلی‌آمپر ساعت" }, { label: "خروجی", value: "۲۲.۵ وات فست شارژ" }],
    features: ["دو پورت خروجی USB-A و یک Type-C", "نمایشگر دیجیتال درصد باتری"] },
  { title: "پاوربانک شیائومی مدل Mi Power Bank 3 10000mAh", brandId: "xiaomi", categoryId: "powerbank", price: 1_150_000, icon: "BatteryCharging",
    specs: [{ label: "ظرفیت", value: "۱۰۰۰۰ میلی‌آمپر ساعت" }],
    features: ["بدنه فوق نازک", "شارژ دوطرفه"] },
  // Charger
  { title: "شارژر دیواری انکر مدل 735 GaNPrime 65W", brandId: "anker", categoryId: "charger", price: 1_950_000, icon: "Plug",
    specs: [{ label: "توان", value: "۶۵ وات" }, { label: "پورت‌ها", value: "دو Type-C و یک USB-A" }],
    features: ["فناوری GaN فوق کم‌حجم", "شارژ همزمان سه دستگاه"] },
  { title: "شارژر دیواری اپل مدل 20W USB-C Power Adapter", brandId: "apple", categoryId: "charger", price: 980_000, icon: "Plug",
    specs: [{ label: "توان", value: "۲۰ وات" }],
    features: ["فست شارژ برای آیفون و آیپد", "طراحی فوق‌العاده کوچک"] },
  // Cable
  { title: "کابل شارژ انکر مدل USB-C to Lightning طول ۱.۸ متر", brandId: "anker", categoryId: "cable", price: 650_000, icon: "Cable",
    specs: [{ label: "طول", value: "۱.۸ متر" }, { label: "پوشش", value: "بافت نایلونی ضدپارگی" }],
    features: ["دوام بالا تا ۲۵۰۰۰ بار خم شدن", "پشتیبانی از شارژ سریع"] },
  { title: "کابل تبدیل Type-C به Type-C شیائومی طول ۱ متر", brandId: "xiaomi", categoryId: "cable", price: 320_000, icon: "Cable",
    specs: [{ label: "طول", value: "۱ متر" }, { label: "توان انتقال", value: "۶۰ وات" }],
    features: ["انتقال داده تا ۴۸۰ مگابیت بر ثانیه"] },
  // Dongle
  { title: "دانگل تبدیل Type-C به HDMI 4K", brandId: "anker", categoryId: "dongle", price: 890_000, icon: "Usb",
    specs: [{ label: "رزولوشن خروجی", value: "4K@60Hz" }],
    features: ["پلاگ اند پلی بدون نیاز به درایور"] },
  { title: "دانگل صوتی بلوتوث Type-C به جک 3.5mm", brandId: "samsung", categoryId: "dongle", price: 210_000, icon: "Usb",
    specs: [{ label: "خروجی", value: "جک ۳.۵ میلی‌متری" }],
    features: ["کیفیت صدای بدون افت"] },
  // Modem
  { title: "مودم همراه 4G تی‌پی‌لینک مدل M7350", brandId: "tplink", categoryId: "modem", price: 3_400_000, icon: "Router",
    specs: [{ label: "سرعت", value: "تا ۱۵۰ مگابیت بر ثانیه" }, { label: "باتری", value: "۲۰۰۰ میلی‌آمپر ساعت" }],
    features: ["اتصال همزمان ۱۰ دستگاه", "پشتیبانی از کارت سیم داخلی"] },
  { title: "مودم ADSL2+ تی‌پی‌لینک مدل TD-W9970", brandId: "tplink", categoryId: "modem", price: 1_890_000, icon: "Router",
    specs: [{ label: "استاندارد", value: "ADSL2+ / VDSL2" }],
    features: ["پورت USB برای اشتراک فایل", "چهار پورت LAN گیگابیتی"] },
  // Network
  { title: "روتر بی‌سیم تی‌پی‌لینک مدل Archer AX55", brandId: "tplink", categoryId: "network", price: 4_600_000, icon: "Wifi",
    specs: [{ label: "استاندارد", value: "WiFi 6 دوبانده" }, { label: "سرعت", value: "تا ۳۰۰۰ مگابیت بر ثانیه" }],
    features: ["پوشش وسیع با چهار آنتن", "مدیریت آسان از اپلیکیشن Tether"] },
  { title: "اکسس پوینت تی‌پی‌لینک مدل EAP225", brandId: "tplink", categoryId: "network", price: 2_950_000, icon: "Wifi",
    specs: [{ label: "استاندارد", value: "AC1350 دوبانده" }],
    features: ["مدیریت متمرکز شبکه", "قابلیت نصب سقفی"] },
  // Accessory
  { title: "قاب محافظ اسپیگن برای آیفون 15 Pro", brandId: "apple", categoryId: "accessory", price: 780_000, icon: "ShoppingBag", hasColors: true,
    specs: [{ label: "مواد", value: "پلی‌کربنات و TPU" }],
    features: ["محافظت در برابر ضربه از ارتفاع ۳ متری", "دوربین برجسته و محافظت‌شده"] },
  { title: "محافظ صفحه شیشه‌ای نانو سرامیک سامسونگ Galaxy S24", brandId: "samsung", categoryId: "accessory", price: 420_000, icon: "ShoppingBag",
    specs: [{ label: "سختی", value: "۹H" }],
    features: ["نصب آسان بدون حباب", "شفافیت بالای ۹۹٪"] },
  // SSD
  { title: "حافظه SSD اینترنال کینگستون مدل NV2 1TB", brandId: "kingston", categoryId: "ssd", price: 2_650_000, compareAtPrice: 3_100_000, icon: "MemoryStick",
    specs: [{ label: "ظرفیت", value: "۱ ترابایت" }, { label: "رابط", value: "NVMe PCIe 4.0" }, { label: "سرعت خواندن", value: "تا ۳۵۰۰ مگابایت بر ثانیه" }],
    features: ["مناسب برای سیستم و لپ‌تاپ", "مصرف انرژی پایین"] },
  { title: "حافظه SSD اکسترنال کینگستون مدل XS1000 512GB", brandId: "kingston", categoryId: "ssd", price: 2_100_000, icon: "MemoryStick",
    specs: [{ label: "ظرفیت", value: "۵۱۲ گیگابایت" }, { label: "رابط", value: "USB 3.2 Gen2" }],
    features: ["طراحی فوق کوچک و قابل حمل", "سرعت انتقال تا ۱۰۵۰ مگابایت بر ثانیه"] },
  // HDD
  { title: "هارد اکسترنال ۲ ترابایت مدل My Passport", brandId: "kingston", categoryId: "hdd", price: 3_200_000, icon: "Disc3",
    specs: [{ label: "ظرفیت", value: "۲ ترابایت" }, { label: "رابط", value: "USB 3.0" }],
    features: ["رمزنگاری سخت‌افزاری AES", "طراحی ضدضربه"] },
  { title: "هارد اینترنال ۱ ترابایت 7200RPM", brandId: "kingston", categoryId: "hdd", price: 1_750_000, icon: "Disc3",
    specs: [{ label: "ظرفیت", value: "۱ ترابایت" }, { label: "سرعت چرخش", value: "۷۲۰۰ دور بر دقیقه" }],
    features: ["مناسب برای ذخیره‌سازی حجیم", "کش ۶۴ مگابایتی"] },
  // Flash
  { title: "فلش مموری کینگستون مدل DataTraveler 128GB", brandId: "kingston", categoryId: "flash", price: 680_000, icon: "Usb",
    specs: [{ label: "ظرفیت", value: "۱۲۸ گیگابایت" }, { label: "رابط", value: "USB 3.2" }],
    features: ["بدنه فلزی مقاوم", "سرعت انتقال بالا"] },
  { title: "فلش مموری OTG سامسونگ 64GB Type-C", brandId: "samsung", categoryId: "flash", price: 540_000, icon: "Usb",
    specs: [{ label: "ظرفیت", value: "۶۴ گیگابایت" }, { label: "رابط", value: "USB-C و USB-A" }],
    features: ["مناسب موبایل و تبلت", "طراحی دوکاره"] },
  // Memory card
  { title: "کارت حافظه microSD کینگستون مدل Canvas Go! 256GB", brandId: "kingston", categoryId: "memory-card", price: 1_450_000, icon: "CreditCard",
    specs: [{ label: "ظرفیت", value: "۲۵۶ گیگابایت" }, { label: "کلاس سرعت", value: "UHS-I U3 / V30" }],
    features: ["مناسب فیلمبرداری 4K", "همراه با آداپتور SD"] },
  { title: "کارت حافظه microSD سامسونگ مدل EVO Plus 128GB", brandId: "samsung", categoryId: "memory-card", price: 780_000, icon: "CreditCard",
    specs: [{ label: "ظرفیت", value: "۱۲۸ گیگابایت" }],
    features: ["مقاوم در برابر آب، دما و اشعه ایکس"] },
  // Gaming
  { title: "دسته بازی لاجیتک مدل G Pro Wireless", brandId: "logitech", categoryId: "gaming", price: 5_400_000, icon: "Gamepad2",
    specs: [{ label: "اتصال", value: "بی‌سیم LIGHTSPEED" }, { label: "باتری", value: "تا ۵۰ ساعت" }],
    features: ["طراحی سبک برای گیمرهای حرفه‌ای", "سنسور HERO 25K"] },
  { title: "هدست گیمینگ ایسوس مدل ROG Delta S", brandId: "asus", categoryId: "gaming", price: 6_900_000, icon: "Gamepad2",
    specs: [{ label: "اتصال", value: "USB-C و 3.5mm" }, { label: "صدا", value: "۷.۱ مجازی" }],
    features: ["میکروفون قابل جداسازی با حذف نویز هوش مصنوعی", "نورپردازی Aura Sync"] },
  // Console
  { title: "کنسول بازی سونی مدل PlayStation 5 Slim", brandId: "sony", categoryId: "console", price: 42_000_000, compareAtPrice: 46_000_000, icon: "Joystick",
    specs: [{ label: "حافظه", value: "۱ ترابایت SSD" }, { label: "رزولوشن", value: "تا 4K@120Hz" }],
    features: ["پردازش ری‌تریسینگ پیشرفته", "دسته DualSense با فیدبک لمسی"] },
  { title: "دسته اضافه کنسول سونی PlayStation 5 DualSense", brandId: "sony", categoryId: "console", price: 4_200_000, icon: "Joystick", hasColors: true,
    specs: [{ label: "اتصال", value: "بی‌سیم و USB-C" }],
    features: ["فیدبک لمسی هپتیک", "ماشه‌های تطبیقی"] },
  // Computer parts
  { title: "کارت گرافیک ایسوس مدل RTX 4070 Super TUF", brandId: "asus", categoryId: "computer-parts", price: 48_500_000, icon: "Cpu",
    specs: [{ label: "حافظه", value: "۱۲ گیگابایت GDDR6X" }, { label: "خنک‌کننده", value: "سه فن" }],
    features: ["مناسب گیمینگ در رزولوشن 4K", "پشتیبانی از DLSS 3.5"] },
  { title: "کیبورد مکانیکی لاجیتک مدل G913", brandId: "logitech", categoryId: "computer-parts", price: 7_200_000, icon: "Cpu",
    specs: [{ label: "سوییچ", value: "مکانیکی نور-مکانیکال" }, { label: "اتصال", value: "بی‌سیم LIGHTSPEED" }],
    features: ["نورپردازی RGB LIGHTSYNC", "بدنه آلومینیومی فوق نازک"] },
];

function buildProduct(seed: Seed, index: number): Product {
  const gseed = index + 1;
  const colors = seed.hasColors ? COLOR_SETS.default : undefined;
  const rnd = seededRandom(gseed + 100);
  const soldCount = 20 + Math.floor(rnd() * 480);
  const reviewCount = 3 + Math.floor(rnd() * 9);
  const stock = Math.floor(rnd() * 40);
  const latinWords = seed.title
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 5);
  const slugBase = (latinWords.length > 0 ? latinWords.join("-") : `${seed.categoryId}-${seed.brandId}`).toLowerCase();

  return {
    id: `p-${gseed}`,
    slug: `${slugBase}-${gseed}`,
    title: seed.title,
    brandId: seed.brandId,
    categoryId: seed.categoryId,
    price: seed.price,
    compareAtPrice: seed.compareAtPrice,
    stock,
    rating: Math.round((3.6 + rnd() * 1.3) * 10) / 10,
    reviewCount,
    soldCount,
    isNew: index % 7 === 0,
    isFeatured: index % 5 === 0,
    isBestSeller: soldCount > 300,
    isDeal: !!seed.compareAtPrice && index % 3 === 0,
    dealEndsAt: seed.compareAtPrice ? new Date(Date.now() + 1000 * 60 * 60 * (24 + gseed)).toISOString() : undefined,
    colors,
    warranty: seed.warranty ?? "۱۸ ماه گارانتی اصلی شرکتی",
    shortDescription: `${seed.title} با کیفیت ساخت ممتاز و گارانتی اصلی، همراه با ارسال سریع از فروشگاه موبایل پیشرو.`,
    description: `${seed.title} یکی از محصولات منتخب موبایل پیشرو است که با توجه به نیاز مشتریان ایرانی و با در نظر گرفتن کیفیت، قیمت و گارانتی انتخاب شده است. این محصول دارای گارانتی اصلی و امکان بازگشت کالا تا ۷ روز پس از خرید می‌باشد. تیم فنی موبایل پیشرو پیش از ارسال، سلامت فیزیکی و عملکردی هر محصول را بررسی می‌کند.`,
    specs: seed.specs,
    features: seed.features,
    gallery: Array.from({ length: 4 }, (_, i) => ({ icon: seed.icon, gradient: gradientFor(gseed + i) })),
    reviews: buildReviews(gseed, reviewCount > 6 ? 6 : reviewCount),
    questions: buildQuestions(gseed, 2),
    tags: [seed.categoryId, seed.brandId],
  };
}

export const products: Product[] = SEEDS.map(buildProduct);

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: string) {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getRelatedProducts(product: Product, limit = 8) {
  return products
    .filter((p) => p.id !== product.id && (p.categoryId === product.categoryId || p.brandId === product.brandId))
    .slice(0, limit);
}

export const featuredProducts = products.filter((p) => p.isFeatured);
export const bestSellerProducts = [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 10);
export const newProducts = products.filter((p) => p.isNew);
export const dealProducts = products.filter((p) => p.isDeal);
