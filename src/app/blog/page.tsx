import Link from "next/link";
import { Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductRender } from "@/components/product/ProductRender";
import { blogPosts } from "@/lib/mock/blog";
import { faDigits } from "@/lib/utils";

export const metadata = { title: "بلاگ" };

export default function BlogPage() {
  return (
    <Container className="py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold md:text-3xl">بلاگ موبایل پیشرو</h1>
        <p className="mt-2 text-sm text-foreground-muted">راهنمای خرید، آموزش و اخبار دنیای دیجیتال</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group rounded-2xl border border-border bg-surface p-3 transition-shadow hover:shadow-lg">
            <ProductRender icon={post.cover.icon} gradient={post.cover.gradient} className="aspect-[16/10] w-full mb-4" iconClassName="size-14" />
            <span className="text-xs font-medium text-gold">{post.category}</span>
            <h2 className="mt-2 line-clamp-2 text-base font-bold leading-7 transition-colors group-hover:text-gold">{post.title}</h2>
            <p className="mt-2 line-clamp-2 text-sm text-foreground-muted">{post.excerpt}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-foreground-muted">
              <span>{post.author}</span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {faDigits(post.readTime)} دقیقه
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
