import React from "react";
import { useRouter } from "next/router";
import LinkedContent from "../../sections/LinkedContent";
import Loader from "../../components/Loader";

import {
  getSingleCategory,
  getCategoryPaths,
} from "../../services/getCategories";

const Category = ({ category }) => {
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
    />
  );
};

export default Category;

export async function getStaticProps({ params }) {
  const category = await getSingleCategory(params.slug);

  return {
    props: {
      category: category,
    },
    revalidate: 300,
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
