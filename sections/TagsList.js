import React, { useEffect, useState } from "react";
import Link from "next/link";

import Tag from "../components/Tag";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";

const NUM_TAGS_SM = 10;
const NUM_TAGS_MD = 13;
const NUM_TAGS_LG = 24;

const TagsList = ({ tags }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [tagsPerPage, setTagsPerPage] = useState(0);

  const indexOfLastTag = currentPage * tagsPerPage;
  const indexOfFirstTag = indexOfLastTag - tagsPerPage;
  const currentTags = tags.slice(indexOfFirstTag, indexOfLastTag);

  const totalPages = Math.ceil(tags.length / tagsPerPage);

  const paginate = (isLeft) => {
    const del = isLeft ? -1 : 1;
    setCurrentPage(currentPage + del);
  };

  const updateTags = () => {
    window.addEventListener("resize", function () {
      setTagsPerPage(
        window.innerWidth < 900
          ? window.innerWidth < 450
            ? NUM_TAGS_SM
            : NUM_TAGS_MD
          : NUM_TAGS_LG
      );
    });
  };

  useEffect(() => {
    if (tagsPerPage === 0) {
      setTagsPerPage(
        window.innerWidth < 768
          ? window.innerWidth < 410
            ? NUM_TAGS_SM
            : NUM_TAGS_MD
          : NUM_TAGS_LG
      );
    } else {
      updateTags();
    }

    return () => {
      window.removeEventListener("resize", updateTags);
    };
  });

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
      <article className="flex flex-wrap content-start text-off-black mt-4 mb-3 h-64 md:h-80 text-sm">
        {currentTags.map((tag, idx) => {
          return (
            <Link href={`/tags/${tag.slug}`} key={idx}>
              <a className="h-10 px-2 py-3 mr-1 my-auto flex items-center rounded-md border-2 border-teal transition transform duration-500 hover:text-white hover:bg-teal font-bold lowercase mb-2">{`#${tag.name}`}</a>
            </Link>
          );
        })}
      </article>
      <div className="absolute bottom-2 left-0 flex w-full justify-items-center text-teal flex-none mb-4 mt-12 px-10">
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
