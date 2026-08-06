import { Container } from "@/components/ui/Container";
import { Skeleton, ProductCardSkeleton } from "@/components/ui/Skeleton";

export default function ProductsLoading() {
  return (
    <Container className="py-8 md:py-10">
      <Skeleton className="mb-2 h-6 w-40" />
      <Skeleton className="mb-6 h-4 w-24" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        <div className="hidden space-y-3 lg:block">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </Container>
  );
}
