import type { Product } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCarousel } from "@/components/product/ProductCarousel";

export function ProductSection({
  title,
  subtitle,
  href,
  products,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  products: Product[];
}) {
  if (products.length === 0) return null;
  return (
    <section className="py-8 md:py-12">
      <Container>
        <SectionHeading title={title} subtitle={subtitle} href={href} />
        <ProductCarousel products={products} />
      </Container>
    </section>
  );
}
