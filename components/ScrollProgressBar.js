import React, { useEffect } from "react";

const ScrollProgressBar = () => {
  let scrollProgress;
  let scrollTop;
  let height;

  const updateScroll = () => {
    window.addEventListener("scroll", () => {
      height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollProgress) {
        scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
      }
    });
  };

  useEffect(() => {
    scrollProgress = document.getElementById("scroll-progress");
    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  });

  return (
    <div
      style={{ zIndex: 10000 }}
      id="scroll-progress"
      className="fixed w-0 h-2 top-0 bg-teal"
    />
  );
};

export default ScrollProgressBar;
