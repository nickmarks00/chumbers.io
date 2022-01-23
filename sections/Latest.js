import React from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { BsFillCalendarFill, BsClock } from "react-icons/bs";

import { getReadingTime } from "../services/getReadingTime";
import Tag from "../components/Tag";

const Latest = ({ latest }) => {
  return (
    <section className="mt-8 text-center col-span-2">
      <div className="flex text-right">
        <h2 className="text-3xl text-white underline--magical font-display font-bold z-10">
          <Link href="/categories">
            <a>Latest</a>
          </Link>
        </h2>
      </div>
      <div className="flex flex-col mt-3">
        {latest.map((post, idx) => {
          const slicedTags =
            post.tags.length > 3 ? post.tags.slice(0, 3) : post.tags;
          return (
            <Link key={idx} href={`/content/${post.slug}`}>
              <a
                className="flex justify-between rounded-lg shadow-lg transform duration-500 ease-out bg-white hover:shadow-xl hover:bg-gray-200 cursor-pointer overflow-hidden mb-3"
                style={{ minHeight: "14rem" }}
              >
                <aside className="flex flex-col w-full sm:w-3/5 text-left mt-3 pl-3 pr-2">
                  <h3 className="font-display text-xl font-bold overflow-hidden truncate">
                    {post.title}
                  </h3>
                  <div className="flex mt-3 md:items-center items-start">
                    <div className="flex flex-row md:mb-0 mb-2">
                      <BsFillCalendarFill className="mr-2" />
                      <p className="text-xs">
                        {moment(post.publishedAt).format("MMM DD, YYYY")}
                      </p>
                    </div>
                    <div className="flex flex-row">
                      <BsClock className="mx-2 mr-2" />
                      <p className="text-xs">
                        {getReadingTime(post.content.markdown)} min. read
                      </p>
                    </div>
                  </div>
                  <article className="text-xs mt-3 post-preview l3">
                    {post.excerpt}
                  </article>
                  <div className="flex flex-wrap text-xs mt-2">
                    {slicedTags.map((tag, idx) => {
                      return (
                        <Link href={`/tags/${tag.slug}`} key={idx}>
                          <a className="h-10 px-2 py-3 mr-1 my-auto flex items-center rounded-md border-2 border-teal transition transform duration-500 hover:text-white hover:bg-teal font-bold lowercase mb-2">{`#${tag.name}`}</a>
                        </Link>
                      );
                    })}
                  </div>
                </aside>
                <div className="hidden sm:inline w-48">
                  <div className="w-full h-full relative">
                    <Image
                      src={post.heroImage.url}
                      alt={post.heroImage.alternate}
                      quality="30"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Latest;
