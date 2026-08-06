import Link from "next/link";
import { Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductRender } from "@/components/product/ProductRender";
import { blogPosts } from "@/lib/mock/blog";
import { faDigits } from "@/lib/utils";

export function BlogPreview() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading title="بلاگ موبایل پیشرو" subtitle="آخرین مطالب و راهنماهای خرید" href="/blog" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group rounded-2xl border border-border bg-surface p-3 transition-shadow hover:shadow-lg">
              <ProductRender icon={post.cover.icon} gradient={post.cover.gradient} className="aspect-[4/3] w-full mb-4" iconClassName="size-12" />
              <span className="text-xs font-medium text-gold">{post.category}</span>
              <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-6 transition-colors group-hover:text-gold">{post.title}</h3>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-foreground-muted">
                <Clock className="size-3.5" />
                {faDigits(post.readTime)} دقیقه مطالعه
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
