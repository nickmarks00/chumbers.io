import { serialize } from "next-mdx-remote/serialize";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";

export async function mdxSerializer(mdx) {
  const cleanedMdx = mdx.replace(/(\\\\\\\\)/g, "\\").replace(/(\\\\)/g, "\\");

  const serializer = await serialize(cleanedMdx, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkParse, remarkMath],
      rehypePlugins: [rehypeKatex, rehypeSlug],
    },
  });

  return serializer;
}
