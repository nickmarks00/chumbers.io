import React, { useState, useCallback } from "react";

import Image from "next/image";

import debounce from "lodash.debounce";
import { IoMdClose } from "react-icons/io";

import Button from "./Button";
import Loader from "./Loader";
import PostCard from "./PostCard";

const Search = ({ className = "", inputClasses = "" }) => {
  const [hits, setHits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const search = useCallback(
    debounce(async (event) => {
      setLoading(true);
      const q = event.target.value;

      setQuery(q);

      if (q.length > 2) {
        const params = new URLSearchParams({ q });

        const res = await fetch("/api/search?" + params);
        const result = await res.json();
        setHits(result["posts"]);
      }

      setLoading(false);
    }, 500),
    []
  );

  const handleBlur = () => {
    setShowModal(!showModal);
    setHits([]);
    setQuery("");
  };

  const handleInputKeyEvent = (event) => {
    // Number 27 is the "Esc" key on the keyboard
    if (event.keyCode === 27) {
      setHits([]);
      setShowModal(false);
      setQuery("");
    }
  };

  const NUM_RESULTS = 3;

  return (
    <div className={`px-2 pb-5 ${className}`} style={{ zIndex: 100 }}>
      {showModal && (
        <section
          style={{ zIndex: 1000 }}
          className=" w-screen h-screen fixed inset-0 bg-black/10 backdrop-blur-sm dark:bg-slate-600/80 overflow-clip"
          onClick={handleBlur}
        >
          <div
            className="fixed justify-items-center px-3 py-2 text-sm flex-col"
            style={{
              left: "12.5%",
              right: "12.5%",
              top: "20%",
              bottom: "20%",
              width: "75%",
            }}
          >
            <div className="flex items-center">
              <input
                type="text"
                className="w-full mb-1 px-3 py-4 w-full font-bold text-sm focus:outline-none focus:ring focus:ring-primary rounded-md"
                placeholder="Search"
                autoFocus={showModal}
                onChange={search}
                onKeyUp={handleInputKeyEvent}
              />
              <div className="flex absolute right-8 items-center">
                {loading && <Loader className="mr-6" />}
                <IoMdClose
                  className="text-gray-600 w-6 h-6  cursor-pointer hover:text-gray-300 transition duration-200"
                  onClick={handleBlur}
                />
              </div>
            </div>
            <div>
              <ul className={`w-full ${hits.length == 0 && "hidden"}`}>
                {hits.slice(0, NUM_RESULTS).map((hit) => (
                  <PostCard post={hit} key={hit.entityId} isRelated={true} />
                ))}
              </ul>
              <section className="w-full font-bold bg-white text-md p-4 rounded-md flex-col">
                <article className="my-2 flex justify-between items-center">
                  <p>
                    Showing{" "}
                    {hits.length > NUM_RESULTS ? NUM_RESULTS : hits.length}{" "}
                    results of {hits.length}
                  </p>
                  {hits.length > 0 && (
                    <Button
                      buttonText="Go to all results"
                      href={`/content/?search=${query}`}
                      className="w-auto"
                      disabled={hits.length == 0 ? true : false}
                    />
                  )}
                </article>
                <hr className="w-full" />
                <div className="flex justify-end w-full">
                  <article
                    className="my-2 flex items-center"
                    style={{ minHeight: "4rem" }}
                  >
                    Search by{" "}
                    <a
                      className="cursor-pointer ml-2 h-full"
                      style={{ minWidth: "6rem" }}
                      href="https://redis.com/redis-enterprise-cloud/overview/"
                      target="_blank"
                    >
                      <div className="w-full h-full relative">
                        <Image
                          layout="fill"
                          src="/images/redis.png"
                          alt="redis-search"
                        />
                      </div>
                    </a>
                  </article>
                </div>
              </section>
            </div>
          </div>
        </section>
      )}
      <input
        type="text"
        className={`rounded-md justify-items-center px-3 py-2 ${inputClasses} w-full font-bold text-sm`}
        placeholder="Search"
        onFocus={handleBlur}
      />
    </div>
  );
};

export default Search;
