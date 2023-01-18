import React from "react";

const TableOfContents = ({ headings }) => {
  const options = {
    rootMargin: "10px",
    threshold: 0,
  };

  const onExitWindow = (entries, observer) => {
    console.log("called");
  };
  if (typeof window !== "undefined") {
    let observer = new IntersectionObserver(onExitWindow, options);

    const target = document.querySelector(".toc");
    // observer.observe(target);
  }

  return (
    <nav className="toc sticky my-4" aria-label="Table of contents" id="toc">
      <h3 className="uppercase mb-3 pl-3 text-gray-400 text-sm">
        table of contents
      </h3>
      <div
        className="border-l-2 pt-3 pl-2 text-xs toc-container"
        dangerouslySetInnerHTML={{ __html: headings }}
      />
    </nav>
  );
};

export default TableOfContents;
