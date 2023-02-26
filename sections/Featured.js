import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  BsArrowRightCircleFill,
  BsFillCalendarFill,
  BsClock,
} from "react-icons/bs";
import moment from "moment";

const Featured = ({ featured }) => {
  return (
    <section className="text-center mt-8">
      <div className="flex text-right">
        <h2 className="text-3xl text-white underline--magical font-display font-bold z-10">
          <Link href="/featured">
            <a>Featured</a>
          </Link>
        </h2>
      </div>
      <div className="w-full gap-8 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-10">
        {featured.map((post, idx) => {
          const slicedTags =
            post.tags.length > 2 ? post.tags.slice(0, 2) : post.tags;
          return (
            <Link href={`/content/${post.slug}`} key={idx}>
              <a
                className="featured-card rounded-lg shadow-lg transform duration-500 ease-out hover:-translate-y-2 hover:shadow-xl cursor-pointer overflow-hidden bg-white"
                style={{ minHeight: "34rem" }}
              >
                <div className="h-3/5">
                  <span className="overlay-block bg-teal opacity-60 hidden h-3/5 w-full absolute z-10 text-left  overflow-hidden"></span>
                  <span
                    className="rounded-md font-bold absolute mt-2 ml-2 px-2 py-1 top-0 left-0 z-10 text-sm"
                    style={{
                      backgroundColor: `${post.category.categoryTheme.hex}`,
                    }}
                  >
                    {post.category.name}
                  </span>
                  <div className="w-full h-full relative">
                    <Image
                      src={post.heroImage.url}
                      alt={post.heroImage.alternate}
                      layout="fill"
                      quality="40"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <header className="text-left mx-2 flex flex-col justify-between min-h-2/5 py-1">
                  <div>
                    <h5 className="font-display text-md font-bold my-1 border-b border-gray-300 post-preview l2">
                      {post.title}
                    </h5>
                    <div className="flex mt-3 md:items-center items-start mb-1">
                      <div className="flex flex-row md:mb-0 mb-2 mr-2">
                        <BsFillCalendarFill className="mr-2" />
                        <p className="text-xs">
                          {moment(post.createdAt).format("MMM DD, YYYY")}
                        </p>
                      </div>
                      <div className="flex flex-row">
                        <BsClock className="md:mx-2 mr-2" />
                        <p className="text-xs">{post.readingTime} min. read</p>
                      </div>
                    </div>
                    <p className="text-xs post-preview l4">{post.excerpt}</p>
                  </div>
                  <div className="flex flex-wrap my-2 text-xs ">
                    {slicedTags.map((tag, idx) => {
                      return (
                        <Link href={`/tags/${tag.slug}`} key={idx}>
                          <a className="h-10 px-2 py-3 mr-1 my-auto flex items-center rounded-md border-2 border-teal transition transform duration-500 hover:text-white hover:bg-teal font-bold lowercase mb-2">{`#${tag.name}`}</a>
                        </Link>
                      );
                    })}
                  </div>
                </header>
              </a>
            </Link>
          );
        })}
        <Link href={`/content/`} key="all posts" style={{ height: "30rem" }}>
          <a className="featured-card rounded-lg shadow-lg transform duration-500 ease-out hover:-translate-y-2 hover:shadow-xl cursor-pointer overflow-hidden bg-teal">
            <div className="absolute ml-24 inset-y-1/2 -translate-x-1/2 flex">
              <h2
                className="font-display text-black text-2xl font-bold lowercase my-auto underline--magical"
                style={{
                  backgroundImage: `linear-gradient(120deg, #fff 0%, #fff 100%)`,
                }}
              >
                all posts
              </h2>
              <BsArrowRightCircleFill
                style={{ height: 20, width: 20, margin: "10 0 0 5" }}
              />
            </div>
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Featured;
