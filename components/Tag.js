import React from "react";
import Link from "next/link";

const Tag = (tag) => {
  return (
    <Link href={`/tags/${tag.tag.slug}`} key={tag.idx}>
      <a className="h-10 px-2 py-3 mr-1 my-auto flex items-center rounded-md border-2 border-teal transition transform duration-500 hover:text-white hover:bg-teal font-bold lowercase mb-2">{`#${tag.tag.name}`}</a>
    </Link>
  );
};

export default Tag;
