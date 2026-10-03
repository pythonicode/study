import Link from "next/link";
import { formatDate, type Post } from "@/content/posts";
import { Figure } from "./Figure";

type PostArticleProps = {
  post: Post;
  number: number;
  preloadHero?: boolean;
  linkTitle?: boolean;
};

export function PostArticle({
  post,
  number,
  preloadHero = false,
  linkTitle = true,
}: PostArticleProps) {
  const { Body } = post;

  return (
    <article className="post" id={post.slug}>
      <header className="post-header">
        <div className="post-meta">
          <span className="post-number">
            {String(number).padStart(2, "0")}
          </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <div className="post-heading">
          <p className="kicker">{post.kicker}</p>
          <h1>
            {linkTitle ? (
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            ) : (
              post.title
            )}
          </h1>
          {post.byline ? (
            <p className="byline">
              {post.byline.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          ) : null}
        </div>
      </header>
      <Figure {...post.hero} className="hero" preload={preloadHero} />
      <div className="prose">
        <Body />
      </div>
    </article>
  );
}
