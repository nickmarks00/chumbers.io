import React from "react";

import LinkedContent from "../../sections/LinkedContent";
import { getAllPosts } from "../../services/getPosts";
import { mdxSerializer } from "../../services/mdxSerializer";

const AllPosts = ({ posts, img, mdx }) => {
  return (
    <LinkedContent
      name="all posts"
      picture={img}
      posts={posts}
      mdx={mdx}
      isCategory={true}
    />
  );
};

export default AllPosts;

export async function getStaticProps() {
  const data = await getAllPosts();

  const mdx = await Promise.all(
    data.posts.map(async (post) => {
      const serializedMdx = await mdxSerializer(post.content.markdown);
      return serializedMdx;
    })
  );

  return {
    props: {
      posts: data.posts,
      img: data.asset,
      mdx,
    },
  };
}
