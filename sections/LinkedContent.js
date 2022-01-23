import React from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import moment from "moment";
import { MDXRemote } from "next-mdx-remote";

import {
  BsFillCalendarFill,
  BsClock,
  BsFillCheckSquareFill,
} from "react-icons/bs";
// import { BiDownArrow, BiUpArrow } from "react-icons/bi"

import { getReadingTime } from "../services/getReadingTime";
import GradientGenerator from "../components/GradientGenerator";

const LinkedContent = ({
  name,
  picture,
  posts,
  isCategory,
  description = null,
}) => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
          integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="z-0">
        <div className="h-72">
          {picture ? (
            <div className="relative w-full h-full">
              <Image
                src={picture.url}
                alt={
                  picture.alternate ? picture.alternate : "category hero-image"
                }
                layout="fill"
                priority={true}
                objectFit="cover"
              />
            </div>
          ) : (
            <GradientGenerator />
          )}
        </div>

        <main className="z-50 m-3 sm:m-2 md:m-10">
          <header className="flex text-center items-center text-white">
            <h1 className="font-display text-3xl underline--magical font-bold">
              {isCategory ? `${name.toUpperCase()}` : `#${name.toLowerCase()}`}
            </h1>
            <h3 className=" ml-2 font-display text-xl italic text-gray-200 ">
              {isCategory
                ? `   -   ${posts.length} relevant post${
                    posts.length != 1 ? "s" : ""
                  }`
                : `   -   ${posts.length} tagged reference${
                    posts.length != 1 ? "s" : ""
                  }`}
            </h3>
          </header>
          <section className="mt-6">
            {/* <div className="flex items-center">
            <h4 className="font-display font-bold mr-2">Sort by:</h4>
            <button
              className="flex items-center bg-blue-400 text-white rounded-md p-1 mr-2 transition duration-200 hover:border-2 hover:border-off-black"
              // onClick={() => dateSortToggle(isDateDesc)}
            >
              {isDateDesc ? <BiDownArrow /> : <BiUpArrow />}{" "}
              <p className="ml-2">Date Published</p>
            </button>
            <button
              className="flex items-center bg-blue-400 text-white rounded-md p-1 mr-2 transition duration-200 hover:border-2 hover:border-off-black"
              // onClick={() => lengthSortToggle(isLengthDesc)}
            >
              {!isLengthDesc ? <BiUpArrow /> : <BiDownArrow />}{" "}
              <p className="ml-2">Post Duration</p>
            </button>
          </div> */}
            {description && (
              <blockquote className="px-2 my-4 py-2 font-display pl-4 border-l-4 border-white italic bg-teal rounded-sm text-md">
                {description}
              </blockquote>
            )}

            <div className="flex flex-col mt-4">
              {posts.map((post, idx) => {
                const { featuredPost, title, updatedAt, content, excerpt } =
                  post;

                return (
                  <Link href={`/content/${post.slug}`} key={idx}>
                    <a className="font-display border-b-2 border-gray-200  text-xl p-3 transition duration-200 hover:bg-gray-200  cursor-pointer bg-white">
                      <section>
                        <header>
                          <h3>{title}</h3>
                        </header>
                        <div className="flex text-sm text-gray-600 mt-2 align-items justify-between">
                          <div className="flex">
                            <p className="flex mx-2 items-center">
                              <BsFillCalendarFill className="mr-2" />{" "}
                              {moment(updatedAt).format("MMM DD, YYYY")}
                            </p>
                            <p className="flex mx-2 items-center">
                              <BsClock className="mr-2" />
                              {`${getReadingTime(content.markdown)} min. read`}
                            </p>
                            {featuredPost && (
                              <p className="flex mx-2 items-center">
                                <BsFillCheckSquareFill className="mr-2 text-green-500" />
                                Featured
                              </p>
                            )}
                          </div>
                        </div>
                        <p className="font-body text-sm post-preview l4 my-2 mx-5">
                          {excerpt}
                        </p>
                      </section>
                    </a>
                  </Link>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default LinkedContent;
