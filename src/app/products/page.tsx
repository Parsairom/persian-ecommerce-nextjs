import { Suspense } from "react";
import { ProductsView } from "@/components/product/ProductsView";

export const metadata = {
  title: "محصولات",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsView />
    </Suspense>
  );
}
