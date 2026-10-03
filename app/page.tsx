import { posts } from "@/content/posts";
import { Feed } from "./_components/Feed";
import { PostArticle } from "./_components/PostArticle";

export default function Home() {
  return (
    <main className="page feed">
      <Feed
        items={posts.map((post, index) => (
          <PostArticle
            key={post.slug}
            post={post}
            number={posts.length - index}
            preloadHero={index === 0}
          />
        ))}
      />
    </main>
  );
}
