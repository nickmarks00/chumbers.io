import React from "react";
import Link from "next/link";
import Image from "next/image";
import Seo from "../components/SEO";
import moment from "moment";
import { BsFillCalendarFill } from "react-icons/bs";

import GradientGenerator from "../components/GradientGenerator";

const LinkedMeta = ({ seo, title, nodes }) => {
  return (
    <>
      <Seo title={seo} description={seo} />

      <main className="z-50">
        <div className="h-72">
          <GradientGenerator />
        </div>
        <div className="mx-10 my-10">
          <header className="flex text-center items-center text-white">
            <h1 className="font-display text-3xl underline--magical font-bold">
              {title}
            </h1>
            <h3 className=" ml-2 font-display text-xl italic text-gray-200 ">
              {`${nodes.length} relevant fields`}
            </h3>
          </header>
          <section className="mt-6">
            <div className="flex flex-col mt-4">
              {nodes.map((node, idx) => {
                const { name, slug, updatedAt } = node;

                return (
                  <Link
                    href={
                      title === "Categories"
                        ? `/categories/${slug}`
                        : `/tags/${slug}`
                    }
                    key={idx}
                  >
                    <a className="font-display border-b-2 border-gray-200  text-xl transition duration-200 hover:bg-gray-200  cursor-pointer bg-white flex justify-between h-24 overflow-hidden">
                      <section className="p-3">
                        <header>
                          <h3>{name}</h3>
                        </header>
                        <div className="flex text-sm text-gray-600 mt-2 align-items justify-between">
                          <div className="flex">
                            <p className="flex mx-2 items-center">
                              <BsFillCalendarFill className="mr-2" />{" "}
                              {`Last updated: ${moment(updatedAt).format(
                                "MMM DD, YYYY"
                              )}`}
                            </p>
                            {node.categoryTheme && (
                              <p className="flex mx-2 items-center">
                                {`${node.categoryTheme.hex}`}
                              </p>
                            )}
                            {title === "Categories" ? (
                              <p className="mx-2">{`${node.posts.length} post${
                                node.posts.length != 1 ? "s" : ""
                              }`}</p>
                            ) : (
                              <p className="mx-2">{`${node.post.length} post${
                                node.post.length != 1 ? "s" : ""
                              }`}</p>
                            )}
                          </div>
                        </div>
                      </section>
                      <div className="w-1/3">
                        {node.categoryPicture && (
                          <div className="w-full h-full relative">
                            <Image
                              src={node.categoryPicture.url}
                              alt={node.categoryPicture.alternate}
                              layout="fill"
                              className="h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default LinkedMeta;
