import React, { useEffect, useState } from "react";
import moment from "moment";

import { getRelatedPosts } from "../services/getTypePosts";
import { getReadingTime } from "../services/getReadingTime";

import PostCard from "../components/PostCard";

const Related = ({ slug, tags }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getRelatedPosts(slug, tags).then((res) => setRelatedPosts(res));
    }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg mb-8 py-3">
      <h3 className="text-xl my-2 ml-6 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts &&
        relatedPosts.map((post) => (
          <PostCard post={post} isRelated={true} key={post.title} />
        ))}
    </div>
  );
};

export default Related;
