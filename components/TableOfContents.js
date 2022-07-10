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
    <nav className="toc sticky" aria-label="Table of contents" id="toc">
      <h3 className="uppercase mb-3 pl-2 text-gray-400 text-sm">
        table of contents
      </h3>
      <ul className="border-l-2  text-sm">
        {headings.map((heading, idx) => {
          return (
            <li
              key={idx}
              className="transition duration-200 hover:border-l-2 hover:border-teal"
            >
              <a
                href={heading.link}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(heading.link).scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="pl-2 leading-8"
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContents;
