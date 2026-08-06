import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductRender } from "@/components/product/ProductRender";
import { blogPosts, getBlogPostBySlug } from "@/lib/mock/blog";
import { faDigits } from "@/lib/utils";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  return { title: getBlogPostBySlug(slug)?.title ?? "بلاگ" };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <Container className="py-8 md:py-12">
      <div className="mx-auto max-w-2xl">
        <span className="text-xs font-medium text-gold">{post.category}</span>
        <h1 className="mt-2 text-2xl font-bold leading-tight md:text-3xl">{post.title}</h1>
        <div className="mt-3 flex items-center gap-3 text-xs text-foreground-muted">
          <span>{post.author}</span>
          <span>{post.date}</span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {faDigits(post.readTime)} دقیقه مطالعه
          </span>
        </div>
        <ProductRender icon={post.cover.icon} gradient={post.cover.gradient} className="mt-6 aspect-[16/9] w-full" iconClassName="size-20" />
        <p className="mt-6 text-base leading-9 text-foreground-muted">{post.content}</p>
      </div>
    </Container>
  );
}
