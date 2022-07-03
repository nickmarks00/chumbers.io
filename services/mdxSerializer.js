import { serialize } from "next-mdx-remote/serialize";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkToc from "remark-toc";
import remarkSlug from "remark-slug";
import rehypeAutolinkHeadings from "remark-autolink-headings";

export async function mdxSerializer(mdx) {
  const parsedMdx = remarkHighlighter(mdx);
  const serializer = await serialize(parsedMdx, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkParse,
        remarkMath,
        remarkToc,
        remarkSlug,
        rehypeAutolinkHeadings,
      ],
      rehypePlugins: [rehypeKatex],
    },
  });

  return serializer;
}

const remarkHighlighter = (mdx) => {
  const highlight = /\^\^(.*)\^\^/gim;

  return mdx.replace(highlight, `mdx("hl",{parentName:"p"},"$1"),`);
};
