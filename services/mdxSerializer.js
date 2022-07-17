import { serialize } from "next-mdx-remote/serialize";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkSlug from "remark-slug";
import rehypeAutolinkHeadings from "remark-autolink-headings";

export async function mdxSerializer(mdx) {
  const serializer = await serialize(mdx, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkParse,
        remarkMath,
        remarkSlug,
        rehypeAutolinkHeadings,
      ],
      rehypePlugins: [rehypeKatex],
    },
  });

  return serializer;
}
