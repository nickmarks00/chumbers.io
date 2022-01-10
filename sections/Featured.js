import React from "react";
import Link from "next/link";
import Image from "next/image";

import { BsArrowRightCircleFill } from "react-icons/bs";

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
          return (
            <Link href={`/content/${post.slug}`} key={idx}>
              <a
                className="featured-card rounded-lg shadow-lg transform duration-500 ease-out hover:-translate-y-2 hover:shadow-xl cursor-pointer overflow-hidden bg-white"
                style={{ height: "30rem" }}
              >
                <div className="h-3/5">
                  <span className="overlay-block bg-teal opacity-60 hidden h-3/5 w-full absolute z-10 text-left  overflow-hidden"></span>
                  <span
                    className="rounded-md absolute mt-2 ml-2 px-2 py-1 top-0 left-0 z-10 text-sm"
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
                <header className="text-left mx-1">
                  <h5 className="font-display text-md font-bold my-1 border-b border-gray-300">
                    {post.title}
                  </h5>
                  <p className="text-xs">{post.excerpt}</p>
                  <div className="flex flex-wrap my-2 text-xs ">
                    {post.tags.map((tag, idx) => {
                      return (
                        <Link href={`/tags/${tag.slug}`} key={idx}>
                          <a className="p-1 mr-1 mt-1 rounded-md bg-teal transition transform duration-500 hover:text-white hover:border hover:border-off-black lowercase">{`#${tag.name}`}</a>
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
