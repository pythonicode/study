import type { StaticImageData } from "next/image";
import type { ComponentType } from "react";

export type PostImage = {
  src: StaticImageData;
  alt: string;
  caption?: string;
};

export type Post = {
  slug: string;
  kicker: string;
  title: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  summary: string;
  byline?: string[];
  hero: PostImage;
  Body: ComponentType;
};
