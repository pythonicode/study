import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/content/posts";
import { PostArticle } from "@/app/_components/PostArticle";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function PostPage({ params }: PageProps<"/posts/[slug]">) {
  const { slug } = await params;
  const index = posts.findIndex((post) => post.slug === slug);
  const post = posts[index];
  if (!post) notFound();

  const newer = posts[index - 1];
  const older = posts[index + 1];

  return (
    <main className="page">
      <PostArticle
        post={post}
        number={posts.length - index}
        preloadHero
        linkTitle={false}
      />
      <nav className="post-nav" aria-label="More posts">
        <div>
          {older ? (
            <Link href={`/posts/${older.slug}`}>
              <span>Previous</span>
              {older.title}
            </Link>
          ) : null}
        </div>
        <div>
          {newer ? (
            <Link href={`/posts/${newer.slug}`}>
              <span>Next</span>
              {newer.title}
            </Link>
          ) : null}
        </div>
      </nav>
    </main>
  );
}
