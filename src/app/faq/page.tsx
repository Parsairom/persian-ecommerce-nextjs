import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { faqItems } from "@/lib/mock/faq";

export const metadata = { title: "سوالات متداول" };

export default function FaqPage() {
  return (
    <Container className="py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold md:text-3xl">سوالات متداول</h1>
        <p className="mt-2 text-sm text-foreground-muted">پاسخ به پرتکرارترین سوالات مشتریان موبایل پیشرو</p>
      </div>
      <FaqAccordion items={faqItems} plain />
    </Container>
  );
}
