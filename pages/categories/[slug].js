import React from "react";
import { useRouter } from "next/router";
import LinkedContent from "../../sections/LinkedContent";
import { mdxSerializer } from "../../services/mdxSerializer";
import Loader from "../../components/Loader";

import {
  getSingleCategory,
  getCategoryPaths,
} from "../../services/getCategories";

const Category = ({ category, mdx }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <LinkedContent
      name={category.name}
      picture={category.categoryPicture}
      posts={category.posts}
      isCategory={true}
      mdx={mdx}
    />
  );
};

export default Category;

export async function getStaticProps({ params }) {
  const category = await getSingleCategory(params.slug);

  const mdx = await Promise.all(
    category.posts.map(async (post) => {
      const serializedMdx = await mdxSerializer(post.content.markdown);
      return serializedMdx;
    })
  );

  return {
    props: {
      category: category,
      mdx,
    },
  };
}

export async function getStaticPaths() {
  const categories = await getCategoryPaths();

  const paths = categories.map((category) => ({
    params: { slug: category.node.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}
