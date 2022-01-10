import React from "react";

import LinkedContent from "../../sections/LinkedContent";
import { mdxSerializer } from "../../services/mdxSerializer";

import { getSingleTag, getTagPaths } from "../../services/getTags";

const Tag = ({ tag, mdx }) => {
  const { name, tagPicture, post } = tag;

  return (
    <LinkedContent
      name={name}
      picture={tagPicture}
      posts={post}
      isCategory={true}
      mdx={mdx}
    />
  );
};

export default Tag;

export async function getStaticProps({ params }) {
  const tag = await getSingleTag(params.slug);

  const mdx = await Promise.all(
    tag.post.map(async (post) => {
      const serializedMdx = await mdxSerializer(post.content.markdown);
      return serializedMdx;
    })
  );

  return {
    props: {
      tag: tag,
      mdx,
    },
  };
}

export async function getStaticPaths() {
  const tags = await getTagPaths();

  const paths = tags.map((tag) => ({
    params: { slug: tag.node.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}
