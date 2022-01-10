import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";

const TagsList = ({ tags }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tagsPerPage = 21;

  const indexOfLastTag = currentPage * tagsPerPage;
  const indexOfFirstTag = indexOfLastTag - tagsPerPage;
  const currentTags = tags.slice(indexOfFirstTag, indexOfLastTag);

  const totalPages = Math.ceil(tags.length / tagsPerPage);

  const paginate = (isLeft) => {
    const del = isLeft ? -1 : 1;
    setCurrentPage(currentPage + del);
  };

  return (
    <section className="bg-white rounded-md mt-4 md:mt-20 px-3 py-3 overflow-auto relative mb-3 h-96 sm:h-72 md:h-auto flex flex-col justify-items-start">
      <div className="flex">
        <h4 className="font-display text-xl text-off-black underline--magical text-left font-bold mr-4">
          Tags
        </h4>
        <Link href="/tags">
          <a className="flex bg-off-black rounded-md text-white items-center px-2 font-display font-bold transition duration-200 hover:bg-gray-600">
            <p className="mr-2">all tags</p>
            <BsArrowRightCircleFill style={{ height: 20, width: 20 }} />
          </a>
        </Link>
      </div>
      <article className="flex flex-wrap text-off-black my-3   h-64 md:h-80">
        {currentTags.map((tag, idx) => {
          return (
            <Link href={`/tags/${tag.slug}`} key={idx}>
              <a className="p-1 mr-1 mt-1 rounded-md bg-teal transition transform duration-300 hover:text-white text-sm lowercase flex items-center">
                {`#${tag.name}`}
              </a>
            </Link>
          );
        })}
      </article>
      <div className="absolute bottom-5 left-0 flex w-full justify-items-center text-teal flex-none mb-4 mt-12 px-10">
        <button
          className="mx-auto pagination"
          onClick={() => paginate(true)}
          disabled={currentPage === 1}
        >
          <BsChevronLeft className="h-8 w-8" />
        </button>
        <button
          className="mx-auto pagination"
          disabled={currentPage === totalPages}
          onClick={() => paginate(false)}
        >
          <BsChevronRight className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
};

export default TagsList;
