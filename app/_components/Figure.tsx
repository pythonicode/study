import Image from "next/image";
import type { PostImage } from "@/content/posts/types";

type FigureProps = PostImage & {
  className?: string;
  preload?: boolean;
};

export function Figure({ src, alt, caption, className, preload }: FigureProps) {
  return (
    <figure className={className ? `figure ${className}` : "figure"}>
      <Image
        src={src}
        alt={alt}
        preload={preload}
        sizes="(min-width: 72rem) 68rem, 100vw"
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
