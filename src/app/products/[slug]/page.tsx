import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/mock/products";
import { Container } from "@/components/ui/Container";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductSection } from "@/components/home/ProductSection";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  return { title: product?.title ?? "محصول" };
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="py-8 md:py-10">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <ProductGallery gallery={product.gallery} />
          <ProductInfo product={product} />
        </div>
        <ProductTabs product={product} />
      </Container>
      <ProductSection title="محصولات مرتبط" products={related} />
    </div>
  );
}
