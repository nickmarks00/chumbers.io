import React from "react";

import LinkedContent from "../../sections/LinkedContent";
import { getAllPosts } from "../../services/getPosts";

const AllPosts = ({ posts, img }) => {
  return (
    <LinkedContent
      name="all posts"
      picture={null}
      posts={posts}
      isCategory={true}
    />
  );
};

export default AllPosts;

export async function getStaticProps() {
  const data = await getAllPosts();

  return {
    props: {
      posts: data.posts,
    },
    revalidate: 300,
  };
}
