import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductSection } from "@/components/home/ProductSection";
import { DealOfDay } from "@/components/home/DealOfDay";
import { BrandsStrip } from "@/components/home/BrandsStrip";
import { Testimonials } from "@/components/home/Testimonials";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { Newsletter } from "@/components/home/Newsletter";
import { featuredProducts, bestSellerProducts, newProducts, dealProducts } from "@/lib/mock/products";
import { faqItems } from "@/lib/mock/faq";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <ProductSection title="محصولات ویژه" subtitle="انتخاب تیم موبایل پیشرو برای شما" href="/products?featured=true" products={featuredProducts} />
      <DealOfDay products={dealProducts} />
      <ProductSection title="پرفروش‌ترین‌ها" subtitle="محصولاتی که مشتریان بیشتر انتخاب کرده‌اند" href="/products?sort=bestseller" products={bestSellerProducts} />
      <ProductSection title="جدیدترین محصولات" subtitle="تازه‌ترین ورودی‌های فروشگاه" href="/products?sort=new" products={newProducts} />
      <BrandsStrip />
      <Testimonials />
      <BlogPreview />
      <FaqAccordion items={faqItems} />
      <Newsletter />
    </>
  );
}
