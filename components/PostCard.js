import React from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { BsFillCalendarFill, BsClock } from "react-icons/bs";

import { getReadingTime } from "../services/getReadingTime";

const PostCard = ({ post, isRelated = false, key = Math.random() }) => {
  return (
    <Link key={key} href={`/content/${post.slug}`}>
      <a
        className="flex justify-between rounded-lg shadow-lg transform duration-200 ease-out bg-white hover:shadow-xl hover:bg-gray-200  hover:font-bold hover:text-teal cursor-pointer overflow-hidden mb-1"
        style={{ minHeight: "8rem" }}
      >
        {isRelated && (
          <div className="hidden sm:inline w-48">
            <div className="w-48 h-full relative">
              {post.content?.markdown ? (
                <Image
                  src={post.heroImage.url}
                  alt={post.heroImage.alternate}
                  quality="30"
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <Image
                  src={post.heroImage}
                  alt={post.title}
                  quality="5"
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
          </div>
        )}
        <div className="mx-4 py-5 flex-grow">
          <div className="flex">
            <p className="text-gray-500 text-xs mr-2 flex items-center">
              <BsFillCalendarFill className="mr-2" />
              {isRelated && `${moment(post.createdAt).format("MMM DD, YYYY")}`}
              {!isRelated &&
                `${moment(post.publishedAt).format("MMM DD, YYYY")}`}
            </p>
            {isRelated && (
              <p className="text-gray-500 text-xs flex items-center">
                <BsClock className="md:mx-2 mr-2" />
                {post.content?.markdown
                  ? getReadingTime(post.content.markdown)
                  : getReadingTime(post.content)}
                min. read
              </p>
            )}
          </div>
          <p key={post.title} className="text-md pl-2 whitespace-pre-wrap">
            {post.title}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default PostCard;
