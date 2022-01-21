import React, { useEffect } from "react";

import { FiRefreshCcw } from "react-icons/fi";

const GradientGenerator = ({ isList = false }) => {
  const hexString = "0123456789abcdef";
  const randomColor = () => {
    let hexCode = "#";
    for (let i = 0; i < 6; i++) {
      hexCode += hexString[Math.floor(Math.random() * hexString.length)];
    }
    return hexCode;
  };

  const generateGrad = () => {
    let colorOne = randomColor();
    let colorTwo = randomColor();
    let angle = Math.floor(Math.random() * 360);
    const wrapper = document.getElementById("wrapper");
    wrapper.style.background = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
  };
  useEffect(() => {
    generateGrad();
  }, []);

  return (
    <div id="wrapper" className="h-full relative">
      {!isList && (
        <button
          className="absolute bottom-3 right-3 bg-blue-600 rounded-md p-2 md:p-1 text-white flex text-sm items-center transition duration-200 hover:bg-blue-400"
          onClick={() => generateGrad()}
        >
          <FiRefreshCcw />
          <p className="ml-2 hidden md:inline-flex">Regenerate</p>
        </button>
      )}
    </div>
  );
};

export default GradientGenerator;
