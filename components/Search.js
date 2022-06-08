import React, { useState, useCallback, useEffect } from "react";

import debounce from "lodash.debounce";

import InputField from "./InputField";
import PostCard from "./PostCard";

const Search = ({ className }) => {
  const [hits, setHits] = useState([]);

  const search = useCallback(
    debounce(async (event) => {
      const q = event.target.value;

      if (q.length > 2) {
        const params = new URLSearchParams({ q });

        const res = await fetch("/api/search?" + params);
        const result = await res.json();
        setHits(result["posts"]);
      }
    }, 500),
    []
  );

  return (
    <div
      className="flex-grow px-2 pb-5 hidden md:flex relative"
      style={{ zIndex: 100 }}
    >
      <div className="flex-col w-full">
        <InputField
          type="text"
          label="SEARCH"
          placeholder="Browse the site..."
          btnLabel="search"
          isEmail={false}
          id="navbarSearch"
          onChange={search}
          className={className}
        />
        <ul
          className={`absolute top-24 -left-48 px-2 bg-white rounded-md z-100 border-4 border-indigo-500 ${
            hits.length == 0 && "hidden"
          }`}
          style={{ width: "67vw" }}
        >
          {hits.map((hit) => (
            <PostCard post={hit} key={hit.entityId} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
