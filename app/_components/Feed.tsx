"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const BATCH_SIZE = 2;

export function Feed({ items }: { items: ReactNode[] }) {
  const [count, setCount] = useState(BATCH_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const done = count >= items.length;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (done || !sentinel) return;

    // Re-created on every count change so a sentinel that is still in view
    // after a batch renders triggers the next batch.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setCount((current) => current + BATCH_SIZE);
        }
      },
      { rootMargin: "0px 0px 1200px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [count, done]);

  return (
    <>
      {items.slice(0, count)}
      {done ? (
        <p className="feed-end">
          <span>End of feed</span>
          <span>You have reached the first post.</span>
        </p>
      ) : (
        <div ref={sentinelRef} className="feed-loading" aria-hidden="true">
          Loading earlier posts…
        </div>
      )}
    </>
  );
}
