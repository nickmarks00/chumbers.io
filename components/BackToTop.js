import React from "react";

import { BsFillArrowUpSquareFill } from "react-icons/bs";

const SHOW_OFFSET = 100;

const BackToTop = () => {
  let scrollButton;
  if (typeof window !== "undefined") {
    scrollButton = document.getElementById("scrollToTop");
    window.onscroll = function () {
      scrollFunction();
    };
  }

  const scrollFunction = () => {
    if (
      document.body.scrollTop > SHOW_OFFSET ||
      (document.documentElement.scrollTop > SHOW_OFFSET && scrollButton)
    ) {
      scrollButton.style.display = "inline";
    } else {
      scrollButton.style.display = "none";
    }
  };

  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <div
      className="fixed bottom-10 w-full text-center"
      style={{ zIndex: 1000 }}
    >
      <button onClick={scrollToTop} id="scrollToTop">
        <BsFillArrowUpSquareFill className="mx-auto w-12 h-12 transition duration-200 hover:bg-teal" />
      </button>
    </div>
  );
};

export default BackToTop;
