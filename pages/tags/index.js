import React from "react";
import { getTagsFull } from "../../services/getTags";

import LinkedMeta from "../../sections/LinkedMeta";

const index = ({ tags }) => {
  return <LinkedMeta seo="All tags" title="Tags" nodes={tags} />;
};

export default index;

export async function getStaticProps() {
  const tags = await getTagsFull();

  return {
    props: {
      tags: tags,
    },
  };
}
