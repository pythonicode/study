import { forestPreliminary } from "./forest-preliminary";
import { progressUpdate } from "./progress-update";
import { studyBegins } from "./study-begins";
import { studyProposal } from "./study-proposal";
import type { Post } from "./types";

export type { Post } from "./types";

/** Newest first. */
export const posts: Post[] = [
  studyProposal,
  studyBegins,
  progressUpdate,
  forestPreliminary,
].sort(
  (a, b) => b.date.localeCompare(a.date),
);

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
