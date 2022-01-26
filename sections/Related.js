import React, { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";

import { BsFillCalendarFill, BsClock } from "react-icons/bs";

import { getRelatedPosts } from "../services/getTypePosts";
import { getReadingTime } from "../services/getReadingTime";

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
          <Link key={post.title} href={`/content/${post.slug}`}>
            <a className="flex items-center w-full mb-4 px-8  transition duration-200 hover:bg-gray-200 hover:text-teal">
              <div className="w-24 h-full md:w-1/5">
                <img
                  src={post.heroImage.url}
                  alt={post.title}
                  className="align-middle h-full object-cover"
                />
              </div>
              <div className="flex-grow ml-4 py-5">
                <div className="flex">
                  <p className="text-gray-500 text-xs mr-2 flex items-center">
                    <BsFillCalendarFill className="mr-2" />
                    {moment(post.createdAt).format("MMM DD, YYYY")}
                  </p>
                  <p className="text-gray-500 text-xs flex items-center">
                    <BsClock className="md:mx-2 mr-2" />
                    {getReadingTime(post.content.markdown)} min. read
                  </p>
                </div>
                <p key={post.title} className="text-md">
                  {post.title}
                </p>
              </div>
            </a>
          </Link>
        ))}
    </div>
  );
};

export default Related;
