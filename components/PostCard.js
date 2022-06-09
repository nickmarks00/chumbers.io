import React from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { BsFillCalendarFill, BsClock } from "react-icons/bs";

import { getReadingTime } from "../services/getReadingTime";

const PostCard = ({ post, isRelated = false, key }) => {
  return (
    <Link key={key} href={`/content/${post.slug}`}>
      <a className="flex items-center w-full mb-4 px-8  transition duration-200 hover:bg-gray-200 hover:font-bold hover:text-teal">
        {isRelated && (
          <div className="relative w-full h-full">
            <Image
              src={post.heroImage.url}
              alt={post.title}
              quality="30"
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <div className="flex-grow ml-4 py-5">
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
                {getReadingTime(post.content.markdown)} min. read
              </p>
            )}
          </div>
          <p key={post.title} className="text-md">
            {post.title}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default PostCard;
