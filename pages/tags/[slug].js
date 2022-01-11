import React from "react";
import { useRouter } from "next/router";
import LinkedContent from "../../sections/LinkedContent";
import { mdxSerializer } from "../../services/mdxSerializer";
import Loader from "../../components/Loader";
import Seo from "../../components/SEO";

import { getSingleTag, getTagPaths } from "../../services/getTags";

const Tag = ({ tag, mdx }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <Seo
        title={`#${tag.name}`}
        description={`Content relating to tag ${tag.name}`}
      />
      <LinkedContent
        name={tag.name}
        picture={tag.tagPicture}
        posts={tag.post}
        isCategory={true}
        mdx={mdx}
      />
    </>
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
