import React from "react";
import { useRouter } from "next/router";
import LinkedContent from "../../sections/LinkedContent";
import Loader from "../../components/Loader";
import Seo from "../../components/SEO";

import { getSingleTag, getTagPaths } from "../../services/getTags";

const Tag = ({ tag }) => {
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
        picture={null}
        posts={tag.post}
        isCategory={false}
      />
    </>
  );
};

export default Tag;

export async function getStaticProps({ params }) {
  const tag = await getSingleTag(params.slug);

  return {
    props: {
      tag: tag,
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
