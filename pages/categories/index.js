import React from "react";
import { getCategoriesFull } from "../../services/getCategories";

import LinkedMeta from "../../sections/LinkedMeta";

const AllCategories = ({ categories }) => {
  return (
    <LinkedMeta seo="All categories" title="Categories" nodes={categories} />
  );
};

export default AllCategories;

export async function getStaticProps() {
  const categories = await getCategoriesFull();

  return {
    props: {
      categories: categories,
    },
    revalidate: 300,
  };
}
