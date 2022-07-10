import React from "react";

const ScrollProgressBar = () => {
  let scrollProgress;
  let height;
  if (typeof window !== "undefined") {
    scrollProgress = document.getElementById("scroll-progress");
    height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    window.addEventListener("scroll", () => {
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
    });
  }

  return (
    <div
      style={{ zIndex: 10000 }}
      id="scroll-progress"
      className="fixed w-0 h-2 top-0 bg-teal"
    />
  );
};

export default ScrollProgressBar;
